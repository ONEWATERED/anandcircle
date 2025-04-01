
import React from 'react';
import { SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Upload, X } from 'lucide-react';
import { FamilyMember } from '@/data/familyData';
import SocialLinkSection from './SocialLinkSection';

interface MemberFormSheetProps {
  member: FamilyMember | null;
  imageUrl: string | null;
  onInputChange: (field: keyof FamilyMember, value: any) => void;
  onUploadImage: (memberId: string) => void;
  onSave: () => void;
  onCancel: () => void;
  newSocialLink: { platform: string; url: string };
  setNewSocialLink: React.Dispatch<React.SetStateAction<{ platform: string; url: string }>>;
  onAddSocialLink: () => void;
  onRemoveSocialLink: (platform: string) => void;
}

const MemberFormSheet: React.FC<MemberFormSheetProps> = ({
  member,
  imageUrl,
  onInputChange,
  onUploadImage,
  onSave,
  onCancel,
  newSocialLink,
  setNewSocialLink,
  onAddSocialLink,
  onRemoveSocialLink
}) => {
  if (!member) return null;

  return (
    <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Edit Family Member Profile</SheetTitle>
      </SheetHeader>
      
      <div className="py-6 space-y-6">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="h-24 w-24 border-2" style={{ borderColor: member.color }}>
              <AvatarImage 
                src={imageUrl || undefined} 
                alt={member.name} 
              />
              <AvatarFallback style={{ backgroundColor: member.color }}>
                {member.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="icon"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white shadow-md"
              onClick={() => onUploadImage(member.id)}
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Upload a new profile picture</p>
          </div>
        </div>
        
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Basic Information</h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name"
                value={member.name} 
                onChange={(e) => onInputChange('name', e.target.value)}
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="role">Role</Label>
              <Input 
                id="role"
                value={member.role} 
                onChange={(e) => onInputChange('role', e.target.value)}
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio"
                value={member.bio} 
                onChange={(e) => onInputChange('bio', e.target.value)}
                rows={4}
              />
            </div>
          </div>
        </div>
        
        <SocialLinkSection
          member={member}
          newSocialLink={newSocialLink}
          setNewSocialLink={setNewSocialLink}
          onAddSocialLink={onAddSocialLink}
          onRemoveSocialLink={onRemoveSocialLink}
        />
      </div>
      
      <SheetFooter className="pt-4 border-t mt-6">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onSave}>Save Changes</Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default MemberFormSheet;
