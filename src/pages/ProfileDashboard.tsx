
import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Upload, Camera, Save, Check, User, FileText } from 'lucide-react';
import { 
  getProfileImage, 
  saveProfileImage, 
  getUserProfileData, 
  saveSocialLinks,
  uploadImageToDatabase
} from '@/utils/imageLoader';
import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

interface ProfileFormValues {
  name: string;
  title: string;
  bio: string;
  linkedInUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  spotifyUrl: string;
  anandCircleUrl: string;
  resumeUrl: string;
}

const ProfileDashboard = () => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const profileForm = useForm<ProfileFormValues>({
    defaultValues: {
      name: 'Hardeep Anand',
      title: 'Water Expert & Thought Leader',
      bio: 'Using technology and community-focused approaches to tackle water resource challenges on a global scale.',
      linkedInUrl: 'https://linkedin.com/in/hardeepanand',
      twitterUrl: 'https://twitter.com/hardeepanand',
      youtubeUrl: 'https://youtube.com/@hardeepanand',
      spotifyUrl: 'https://open.spotify.com/user/hardeepanand',
      anandCircleUrl: '#anand-circle',
      resumeUrl: ''
    }
  });
  
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        
        // Load profile image
        const savedImage = await getProfileImage();
        if (savedImage) {
          setPreviewUrl(savedImage);
        }
        
        // Load resume URL and bio from localStorage
        const savedResumeUrl = localStorage.getItem('resumeUrl');
        const savedBio = localStorage.getItem('userBio');
        const savedName = localStorage.getItem('userName');
        const savedTitle = localStorage.getItem('userTitle');
        
        // Load profile data and social links
        const userData = await getUserProfileData();
        
        profileForm.reset({
          name: savedName || 'Hardeep Anand',
          title: savedTitle || 'Water Expert & Thought Leader',
          bio: savedBio || 'Using technology and community-focused approaches to tackle water resource challenges on a global scale.',
          linkedInUrl: userData.socialLinks.linkedIn,
          twitterUrl: userData.socialLinks.twitter,
          youtubeUrl: userData.socialLinks.youtube,
          spotifyUrl: userData.socialLinks.spotify,
          anandCircleUrl: userData.socialLinks.anandCircle,
          resumeUrl: savedResumeUrl || ''
        });
      } catch (error) {
        console.error("Error loading user data:", error);
        toast.error("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);
  
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

  const onProfileSubmit = async (data: ProfileFormValues) => {
    try {
      // Save social links
      await saveSocialLinks({
        linkedIn: data.linkedInUrl,
        twitter: data.twitterUrl,
        youtube: data.youtubeUrl,
        spotify: data.spotifyUrl,
        anandCircle: data.anandCircleUrl
      });
      
      // Save resume URL
      localStorage.setItem('resumeUrl', data.resumeUrl);
      
      // Save bio, name, and title
      localStorage.setItem('userBio', data.bio);
      localStorage.setItem('userName', data.name);
      localStorage.setItem('userTitle', data.title);
      
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Personal Profile</h1>
            <p className="text-muted-foreground">Manage your personal information and social profiles</p>
          </div>
        </div>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="info" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Profile Information
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center">
              <Camera className="mr-2 h-4 w-4" />
              Profile Image
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Hardeep Anand" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Water Expert & Thought Leader" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={profileForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Biography</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Using technology and community-focused approaches to tackle water resource challenges on a global scale." 
                              className="min-h-32" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Write a short bio that describes your work and mission
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="resumeUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resume URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://gamma.app/your-resume-link" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter the URL where your resume is published
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-medium mb-4">Social Media Links</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={profileForm.control}
                          name="linkedInUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>LinkedIn URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="twitterUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Twitter URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://twitter.com/yourhandle" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="youtubeUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>YouTube URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://youtube.com/@youraccount" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="spotifyUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Spotify URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://open.spotify.com/user/youraccount" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="anandCircleUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ANAND Circle URL</FormLabel>
                              <FormControl>
                                <Input placeholder="#anand-circle" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Save Profile Information
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
          
          <TabsContent value="image">
            <Card>
              <CardHeader>
                <CardTitle>Profile Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center justify-center mb-6 space-y-4">
                  <Avatar className="w-32 h-32 border-2 border-primary/20">
                    <AvatarImage src={previewUrl} alt="Profile preview" />
                    <AvatarFallback className="text-lg">HA</AvatarFallback>
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
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleSaveImage}
                  className="w-full sm:w-auto"
                  disabled={!profileImageUrl}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Image URL
                </Button>
                <Button 
                  onClick={handleResetToDefault}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Reset to Default
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ProfileDashboard;
