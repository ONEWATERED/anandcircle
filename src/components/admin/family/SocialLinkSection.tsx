
import React from 'react';
import { FamilyMember } from '@/data/familyData';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

interface SocialLinkSectionProps {
  member: FamilyMember;
  newSocialLink: { platform: string; url: string };
  setNewSocialLink: React.Dispatch<React.SetStateAction<{ platform: string; url: string }>>;
  onAddSocialLink: () => void;
  onRemoveSocialLink: (platform: string) => void;
}

const SocialLinkSection: React.FC<SocialLinkSectionProps> = ({
  member,
  newSocialLink,
  setNewSocialLink,
  onAddSocialLink,
  onRemoveSocialLink
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Social Links</h3>
      
      {/* Current Social Links */}
      <div className="space-y-2">
        <Label>Current Links</Label>
        {member.socialLinks && Object.keys(member.socialLinks).length > 0 ? (
          <div className="space-y-2">
            {Object.entries(member.socialLinks).map(([platform, url]) => (
              <div key={platform} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <div className="flex items-center space-x-2">
                  <div className="capitalize font-medium">{platform}:</div>
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm truncate max-w-[200px]"
                  >
                    {url}
                  </a>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onRemoveSocialLink(platform)}
                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No social links added yet.</p>
        )}
      </div>
      
      {/* Add New Social Link */}
      <div className="space-y-2 border-t pt-4">
        <Label>Add New Social Link</Label>
        <div className="flex space-x-2">
          <select 
            className="flex h-10 w-1/3 rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={newSocialLink.platform} 
            onChange={(e) => setNewSocialLink({...newSocialLink, platform: e.target.value})}
          >
            <option value="twitter">Twitter</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="facebook">Facebook</option>
          </select>
          <Input 
            placeholder="https://..."
            value={newSocialLink.url}
            onChange={(e) => setNewSocialLink({...newSocialLink, url: e.target.value})}
            className="w-2/3"
          />
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2"
          onClick={onAddSocialLink}
        >
          <Plus className="h-4 w-4 mr-1" /> Add Link
        </Button>
      </div>
    </div>
  );
};

export default SocialLinkSection;
