
import React, { useState, useEffect } from 'react';
import FamilyCircleGraphic from '@/components/family-circle/FamilyCircleGraphic';
import FamilyCircleHeader from '@/components/family-circle/FamilyCircleHeader';
import { FamilyMember, familyMembers } from '@/data/familyData';
import { Users, Heart, Dog, Image as ImageIcon, Upload } from 'lucide-react';
import { getConnectionImage, saveConnectionImage } from '@/utils/connectionImages';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { uploadImageToStorage } from '@/utils/fileUtils';
import { useToast } from '@/components/ui/use-toast';
import SelectedMemberActions from '@/components/family-circle/SelectedMemberActions';

const FamilyCircleSection = () => {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [memberImages, setMemberImages] = useState<Record<string, string | null>>({});
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { toast } = useToast();

  // Load member images from database on component mount
  useEffect(() => {
    const loadMemberImages = async () => {
      const images: Record<string, string | null> = {};
      
      for (const member of familyMembers) {
        try {
          const imageUrl = await getConnectionImage(member.id);
          if (imageUrl) {
            images[member.id] = imageUrl;
            console.log(`Loaded image for ${member.name}:`, imageUrl);
          }
        } catch (error) {
          console.error(`Error loading image for ${member.name}:`, error);
        }
      }
      
      setMemberImages(images);
    };
    
    loadMemberImages();
  }, []);

  // Handler to display member details when selected
  const handleSelectMember = (member: FamilyMember | null) => {
    console.log("Selected member:", member?.name);
    setSelectedMember(member);
  };

  const getAvatarIcon = (role: string) => {
    if (role.toLowerCase().includes('pet')) return <Dog size={24} />;
    if (role.toLowerCase().includes('spouse')) return <Heart size={24} />;
    return <Users size={24} />;
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedMember) return;
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setIsUploading(true);
    
    try {
      // Upload file to storage
      const uploadedUrl = await uploadImageToStorage(file, selectedMember.id);
      
      if (uploadedUrl) {
        // Save to connection images
        await saveConnectionImage(selectedMember.id, uploadedUrl);
        
        // Update local state
        setMemberImages(prev => ({
          ...prev,
          [selectedMember.id]: uploadedUrl
        }));
        
        toast({
          title: "Image uploaded successfully",
          description: `Image for ${selectedMember.name} has been updated.`,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading the image.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUrlSubmit = async () => {
    if (!selectedMember || !imageUrl) return;
    
    try {
      // Save image URL to connection images
      await saveConnectionImage(selectedMember.id, imageUrl);
      
      // Update local state
      setMemberImages(prev => ({
        ...prev,
        [selectedMember.id]: imageUrl
      }));
      
      // Reset form
      setImageUrl('');
      
      toast({
        title: "Image URL saved",
        description: `Image for ${selectedMember.name} has been updated.`,
        duration: 3000,
      });
    } catch (error) {
      console.error('Error saving image URL:', error);
      toast({
        title: "Failed to save image URL",
        description: "There was an error saving the image URL.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <section className="py-16 relative bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <FamilyCircleHeader />

        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="w-full">
            <FamilyCircleGraphic 
              onSelectMember={handleSelectMember} 
              memberImages={memberImages}
            />
          </div>
        </div>

        {selectedMember && (
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="mt-6 mx-auto flex items-center gap-2" 
                variant="outline"
              >
                <ImageIcon size={16} />
                Update {selectedMember.name}'s Photo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Update Member Photo</DialogTitle>
              </DialogHeader>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-20 w-20 border-2" style={{ borderColor: selectedMember.color }}>
                  <AvatarImage 
                    src={memberImages[selectedMember.id] || selectedMember.photoUrl} 
                    alt={selectedMember.name} 
                  />
                  <AvatarFallback style={{ backgroundColor: selectedMember.color }}>
                    {selectedMember.icon && React.createElement(selectedMember.icon, { size: 24, className: "text-white" })}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedMember.name}</h3>
                  <p className="text-sm text-gray-500">{selectedMember.role}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="imageUrl" 
                      value={imageUrl} 
                      onChange={handleImageUrlChange} 
                      placeholder="https://example.com/image.jpg" 
                    />
                    <Button 
                      onClick={handleImageUrlSubmit} 
                      disabled={!imageUrl}
                    >
                      Save
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imageFile">Or upload image</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                    {isUploading && (
                      <Upload className="h-4 w-4 animate-spin" />
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};

export default FamilyCircleSection;
