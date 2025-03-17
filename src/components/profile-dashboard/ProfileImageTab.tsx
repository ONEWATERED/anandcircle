import React, { useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Camera, User, Upload, FileText, Loader2 } from 'lucide-react';
import { uploadImageToStorage } from '@/utils/fileUtils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { PersonalProfile } from '@/types/thought-leaders';

interface ProfileImageTabProps {
  profile: PersonalProfile;
  setProfile: React.Dispatch<React.SetStateAction<PersonalProfile>>;
  isSaving: boolean;
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>;
  syncPersonalProfileToFrontend: () => Promise<void>;
}

const ProfileImageTab: React.FC<ProfileImageTabProps> = ({ 
  profile, 
  setProfile, 
  isSaving, 
  setIsSaving,
  syncPersonalProfileToFrontend
}) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      setIsSaving(true);
      toast({
        title: 'Uploading',
        description: 'Uploading profile image...'
      });
      
      const imageUrl = await uploadImageToStorage(file, 'profile');
      
      if (imageUrl) {
        const { error } = await supabase
          .from('personal_profile')
          .update({ photo_url: imageUrl })
          .eq('id', 'hardeep');

        if (error) throw error;
        
        setProfile(prev => ({
          ...prev,
          photo_url: imageUrl
        }));
        
        await syncPersonalProfileToFrontend();
        
        toast({
          title: 'Success',
          description: 'Profile image updated successfully.'
        });
      }
    } catch (error) {
      console.error('Error uploading profile image:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload profile image.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      setIsSaving(true);
      toast({
        title: 'Uploading',
        description: 'Uploading resume...'
      });
      
      const resumeUrl = await uploadImageToStorage(file, 'resume');
      
      if (resumeUrl) {
        const { error } = await supabase
          .from('personal_profile')
          .update({ resume_url: resumeUrl })
          .eq('id', 'hardeep');

        if (error) throw error;
        
        setProfile(prev => ({
          ...prev,
          resume_url: resumeUrl
        }));
        
        syncPersonalProfileToFrontend();
        
        toast({
          title: 'Success',
          description: 'Resume updated successfully.'
        });
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload resume.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const triggerResumeInput = () => {
    if (resumeInputRef.current) {
      resumeInputRef.current.click();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.photo_url || undefined} />
              <AvatarFallback>
                <User className="h-12 w-12 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            
            <div>
              <Button 
                type="button" 
                variant="outline" 
                onClick={triggerFileInput}
                disabled={isSaving}
              >
                <Camera className="mr-2 h-4 w-4" />
                {isSaving ? 'Uploading...' : 'Change Image'}
              </Button>
              <Input
                ref={fileInputRef}
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isSaving}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Resume/CV</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-6">
            <div className="h-20 w-16 border rounded-md flex items-center justify-center bg-muted">
              <FileText className="h-10 w-10 text-muted-foreground" />
            </div>
            
            <div className="space-y-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={triggerResumeInput}
                disabled={isSaving}
              >
                <Upload className="mr-2 h-4 w-4" />
                {isSaving ? 'Uploading...' : 'Upload Resume'}
              </Button>
              <Input
                ref={resumeInputRef}
                id="resumeUpload"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleResumeUpload}
                disabled={isSaving}
              />
              
              {profile.resume_url && (
                <div className="text-sm">
                  <a 
                    href={profile.resume_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View Current Resume
                  </a>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({...profile, name: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Enter your biography here..."
              rows={6}
              value={profile.bio || ''}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileImageTab;
