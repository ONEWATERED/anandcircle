
import React from 'react';
import { FamilyMember } from '@/data/familyData';
import { Image as ImageIcon, Upload } from 'lucide-react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { saveConnectionImage } from '@/utils/connectionImages';
import { uploadImageToStorage } from '@/utils/fileUtils';

interface MemberPhotoUpdateDialogProps {
  selectedMember: FamilyMember;
  memberImages: Record<string, string | null>;
  setMemberImages: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
}

const MemberPhotoUpdateDialog: React.FC<MemberPhotoUpdateDialogProps> = ({
  selectedMember,
  memberImages,
  setMemberImages,
}) => {
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const { toast } = useToast();

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
  );
};

export default MemberPhotoUpdateDialog;
