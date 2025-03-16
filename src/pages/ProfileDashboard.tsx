import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Loader2, User, RefreshCw, Upload, FileText, Info } from 'lucide-react';
import { uploadImageToStorage } from '@/utils/fileUtils';
import { PersonalProfile } from '@/types/thought-leaders';
import { supabase } from '@/integrations/supabase/client';
import { useSyncPersonalProfile } from '@/hooks/useSyncPersonalProfile';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ProfileDashboard = () => {
  const { toast } = useToast();
  const { syncPersonalProfileToFrontend, isLoading: isSyncing, lastSynced } = useSyncPersonalProfile();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [frontendImageUrl, setFrontendImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<PersonalProfile>({
    id: 'hardeep',
    name: 'Hardeep Anand',
    bio: '',
    photo_url: null,
    resume_url: null,
    socialLinks: {
      linkedin: '',
      twitter: '',
      youtube: '',
      spotify: '',
      anandcircle: ''
    }
  });

  useEffect(() => {
    loadProfileData();
    
    // Get the current frontend image from localStorage
    try {
      const storedProfile = localStorage.getItem('personalProfile');
      if (storedProfile) {
        const profileData = JSON.parse(storedProfile);
        if (profileData.photo_url) {
          setFrontendImageUrl(profileData.photo_url);
        }
      }
    } catch (error) {
      console.error('Error loading frontend image:', error);
    }
  }, []);

  const loadProfileData = async () => {
    setIsLoading(true);
    try {
      // Get personal profile from Supabase
      const { data: profileData, error: profileError } = await supabase
        .from('personal_profile')
        .select('*')
        .eq('id', 'hardeep')
        .single();

      if (profileError) throw profileError;

      // Get social links
      const { data: socialLinksData, error: socialLinksError } = await supabase
        .from('personal_social_links')
        .select('*')
        .eq('profile_id', 'hardeep');

      if (socialLinksError) throw socialLinksError;

      // Create socialLinks object from array
      const socialLinks = {};
      
      socialLinksData.forEach(link => {
        socialLinks[link.platform] = link.url;
      });

      setProfile({
        id: profileData.id,
        name: profileData.name,
        bio: profileData.bio || '',
        photo_url: profileData.photo_url,
        resume_url: profileData.resume_url,
        socialLinks
      });
    } catch (error) {
      console.error('Error loading profile data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile data',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        // Update profile with new image URL
        const { error } = await supabase
          .from('personal_profile')
          .update({ photo_url: imageUrl })
          .eq('id', 'hardeep');

        if (error) throw error;
        
        setProfile(prev => ({
          ...prev,
          photo_url: imageUrl
        }));
        
        // Update the frontend image URL after successful sync
        await syncPersonalProfileToFrontend();
        setFrontendImageUrl(imageUrl);
        
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
        // Update profile with new resume URL
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      setIsSaving(true);
      
      // Update profile data
      const { error: profileError } = await supabase
        .from('personal_profile')
        .update({
          name: profile.name,
          bio: profile.bio
        })
        .eq('id', 'hardeep');

      if (profileError) throw profileError;

      // Update social links
      if (profile.socialLinks) {
        // Delete existing links
        const { error: deleteError } = await supabase
          .from('personal_social_links')
          .delete()
          .eq('profile_id', 'hardeep');

        if (deleteError) throw deleteError;

        // Insert new links
        const linksToInsert = Object.entries(profile.socialLinks).map(([platform, url]) => ({
          profile_id: 'hardeep',
          platform,
          url: url || ''
        })).filter(link => link.url.trim() !== '');

        if (linksToInsert.length > 0) {
          const { error: insertError } = await supabase
            .from('personal_social_links')
            .insert(linksToInsert);

          if (insertError) throw insertError;
        }
      }
      
      // Update frontend image URL after successful sync
      await syncPersonalProfileToFrontend();
      
      try {
        const storedProfile = localStorage.getItem('personalProfile');
        if (storedProfile) {
          const profileData = JSON.parse(storedProfile);
          if (profileData.photo_url) {
            setFrontendImageUrl(profileData.photo_url);
          }
        }
      } catch (error) {
        console.error('Error loading frontend image after sync:', error);
      }
      
      toast({
        title: 'Success',
        description: 'Profile updated successfully.'
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateSocialLink = (platform: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
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
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">
              Update your personal profile information that appears on your website
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={syncPersonalProfileToFrontend} 
              variant="outline"
              disabled={isSyncing}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
              Sync to Frontend
            </Button>
            {lastSynced && (
              <span className="text-xs text-muted-foreground">
                Last synced: {lastSynced.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
        
        {frontendImageUrl && (
          <Alert className="bg-muted">
            <Info className="h-4 w-4" />
            <AlertTitle>Current Frontend Image</AlertTitle>
            <AlertDescription className="flex items-center mt-2">
              <div className="mr-4">
                <p className="text-sm text-muted-foreground mb-1">
                  This is the image currently displayed on your public site:
                </p>
                <img 
                  src={frontendImageUrl} 
                  alt="Current frontend profile" 
                  className="w-24 h-24 object-cover rounded-md border" 
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>To update this image, upload a new one below and click "Sync to Frontend".</p>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="general">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="general">General Information</TabsTrigger>
                <TabsTrigger value="social">Social Media</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-6">
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
              </TabsContent>
              
              <TabsContent value="social" className="space-y-6">
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
              </TabsContent>
              
              <div className="flex justify-end mt-6">
                <Button type="submit" disabled={isSaving}>
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </Tabs>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileDashboard;
