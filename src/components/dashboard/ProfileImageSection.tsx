import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Upload, Camera, Save, User } from 'lucide-react';
import { saveProfileImage, uploadImageToDatabase } from '@/utils/imageLoader';

interface ProfileImageSectionProps {
  initialPreviewUrl: string;
}

const ProfileImageSection: React.FC<ProfileImageSectionProps> = ({ initialPreviewUrl }) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  
  const handleSaveImage = async () => {
    if (profileImageUrl) {
      try {
        await saveProfileImage(profileImageUrl);
        setPreviewUrl(profileImageUrl);
        toast.success('Profile image updated successfully!');
      } catch (error) {
        toast.error('Failed to save profile image');
      }
    } else {
      toast.error('Please enter a valid image URL');
    }
  };
  
  const handleResetToDefault = async () => {
    const defaultImage = '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
    try {
      await saveProfileImage(defaultImage);
      setPreviewUrl(defaultImage);
      setProfileImageUrl('');
      toast.success('Profile image reset to default');
    } catch (error) {
      toast.error('Failed to reset profile image');
    }
  };
  
  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileImageUrl(e.target.value);
    if (e.target.value) {
      setPreviewUrl(e.target.value);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    try {
      setIsUploading(true);
      
      const imageUrl = await uploadImageToDatabase(file);
      if (imageUrl) {
        setPreviewUrl(imageUrl);
        setProfileImageUrl('');
        toast.success('Profile image uploaded successfully!');
      } else {
        throw new Error('Failed to get image URL');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <h2 className="text-xl font-display font-semibold mb-4 flex items-center">
        <Camera className="mr-2" size={20} />
        Profile Image
      </h2>
      
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center mb-6 space-y-4">
          <Avatar className="w-32 h-32 border-2 border-primary/20">
            <AvatarFallback className="text-lg">
              <User className="h-12 w-12 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">Image Preview</span>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileUpload}
        />
        
        <Button 
          onClick={triggerFileUpload}
          className="w-full"
          disabled={isUploading}
          variant="outline"
        >
          <Upload className="mr-2 h-4 w-4" />
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-muted-foreground">Or enter URL</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="imageUrl" className="text-sm font-medium">
            Image URL
          </label>
          <Input
            id="imageUrl"
            placeholder="https://example.com/your-image.jpg"
            value={profileImageUrl}
            onChange={handleImagePreview}
          />
          <p className="text-xs text-muted-foreground">
            Enter the URL of your profile image
          </p>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={handleSaveImage}
            className="flex-1"
            disabled={!profileImageUrl}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Image URL
          </Button>
          <Button 
            onClick={handleResetToDefault}
            variant="outline"
            className="flex-1"
          >
            Reset to Default
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageSection;
