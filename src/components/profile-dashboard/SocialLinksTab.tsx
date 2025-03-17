
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PersonalProfile } from '@/types/thought-leaders';

interface SocialLinksTabProps {
  profile: PersonalProfile;
  updateSocialLink: (platform: string, value: string) => void;
}

const SocialLinksTab: React.FC<SocialLinksTabProps> = ({ profile, updateSocialLink }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Links</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input
            id="linkedin"
            placeholder="https://linkedin.com/in/..."
            value={profile.socialLinks?.linkedin || ''}
            onChange={(e) => updateSocialLink('linkedin', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="twitter">Twitter URL</Label>
          <Input
            id="twitter"
            placeholder="https://twitter.com/..."
            value={profile.socialLinks?.twitter || ''}
            onChange={(e) => updateSocialLink('twitter', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="youtube">YouTube URL</Label>
          <Input
            id="youtube"
            placeholder="https://youtube.com/..."
            value={profile.socialLinks?.youtube || ''}
            onChange={(e) => updateSocialLink('youtube', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="spotify">Spotify URL</Label>
          <Input
            id="spotify"
            placeholder="https://open.spotify.com/user/..."
            value={profile.socialLinks?.spotify || ''}
            onChange={(e) => updateSocialLink('spotify', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="anandCircle">Anand Circle URL</Label>
          <Input
            id="anandCircle"
            placeholder="#anand-circle"
            value={profile.socialLinks?.anandcircle || ''}
            onChange={(e) => updateSocialLink('anandcircle', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialLinksTab;
