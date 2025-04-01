
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload } from 'lucide-react';
import { FamilyMember } from '@/data/familyData';

interface ImageUploadDialogProps {
  member: FamilyMember | null;
  imageUrl: string | null;
  isUploading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploadDialog: React.FC<ImageUploadDialogProps> = ({ 
  member, 
  imageUrl, 
  isUploading, 
  onFileChange 
}) => {
  if (!member) return null;
  
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Update Member Photo</DialogTitle>
      </DialogHeader>
      <div className="flex items-center space-x-4 mb-4">
        <Avatar className="h-20 w-20 border-2" style={{ borderColor: member.color || '#ccc' }}>
          <AvatarImage 
            src={imageUrl || undefined} 
            alt={member.name || 'Member'} 
          />
          <AvatarFallback style={{ backgroundColor: member.color || '#ccc' }}>
            {member.name?.substring(0, 2) || '??'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{member.name || 'Member'}</h3>
          <p className="text-sm text-gray-500">{member.role || 'Role'}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="imageFile">Upload image</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="imageFile"
              type="file"
              accept="image/*"
              onChange={onFileChange}
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

export default ImageUploadDialog;
