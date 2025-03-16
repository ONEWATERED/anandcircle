import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Loader2, User } from 'lucide-react';
import { uploadImageToStorage } from '@/utils/fileUtils';
import { saveProfileImage, getUserProfileData } from '@/utils/profileImages';
import { saveSocialLinks } from '@/utils/databaseUtils';
import AdminLayout from '@/layouts/AdminLayout';

const ProfileDashboard = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState({
    linkedIn: '',
    twitter: '',
    youtube: '',
    spotify: '',
    anandCircle: ''
  });

  useEffect(() => {
    const loadProfileData = async () => {
      setIsLoading(true);
      try {
        const userData = await getUserProfileData();
        console.log('Loaded user data:', userData);
        
        if (userData) {
          if (userData.bio) {
            setBio(userData.bio);
          }
          
          if (userData.imageUrl) {
            setProfileImage(userData.imageUrl);
          }
          
          if (userData.socialLinks) {
            setSocialLinks({
              linkedIn: userData.socialLinks.linkedIn || '',
              twitter: userData.socialLinks.twitter || '',
              youtube: userData.socialLinks.youtube || '',
              spotify: userData.socialLinks.spotify || '',
              anandCircle: userData.socialLinks.anandCircle || ''
            });
          }
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load profile data.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProfileData();
  }, [toast]);

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
        await saveProfileImage(imageUrl);
        setProfileImage(imageUrl);
        
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      setIsSaving(true);
      
      await saveSocialLinks({
        linkedIn: socialLinks.linkedIn,
        twitter: socialLinks.twitter,
        youtube: socialLinks.youtube,
        spotify: socialLinks.spotify,
        anandCircle: socialLinks.anandCircle
      });
      
      localStorage.setItem('userBio', bio);
      
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

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Profile Dashboard</h1>
            <p className="text-muted-foreground">
              Update your profile information that appears on your website
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <Tabs defaultValue="general">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="general">General Information</TabsTrigger>
                <TabsTrigger value="social">Social Media</TabsTrigger>
              </TabsList>
              
              <form onSubmit={handleSubmit}>
                <TabsContent value="general" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Image</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-6">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={profileImage || '/placeholder.svg'} />
                          <AvatarFallback>
                            <User className="h-12 w-12 text-muted-foreground" />
                          </AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <Label htmlFor="profileImage" className="cursor-pointer">
                            <div className="flex items-center space-x-2">
                              <Button type="button" variant="outline">
                                <Camera className="mr-2 h-4 w-4" />
                                Change Image
                              </Button>
                            </div>
                          </Label>
                          <Input
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
                      <CardTitle>Biography</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Enter your biography here..."
                          rows={6}
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
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
                          value={socialLinks.linkedIn}
                          onChange={(e) => setSocialLinks({...socialLinks, linkedIn: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter URL</Label>
                        <Input
                          id="twitter"
                          placeholder="https://twitter.com/..."
                          value={socialLinks.twitter}
                          onChange={(e) => setSocialLinks({...socialLinks, twitter: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="youtube">YouTube URL</Label>
                        <Input
                          id="youtube"
                          placeholder="https://youtube.com/..."
                          value={socialLinks.youtube}
                          onChange={(e) => setSocialLinks({...socialLinks, youtube: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="spotify">Spotify URL</Label>
                        <Input
                          id="spotify"
                          placeholder="https://open.spotify.com/user/..."
                          value={socialLinks.spotify}
                          onChange={(e) => setSocialLinks({...socialLinks, spotify: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="anandCircle">Anand Circle URL</Label>
                        <Input
                          id="anandCircle"
                          placeholder="#anand-circle"
                          value={socialLinks.anandCircle}
                          onChange={(e) => setSocialLinks({...socialLinks, anandCircle: e.target.value})}
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
              </form>
            </Tabs>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProfileDashboard;
