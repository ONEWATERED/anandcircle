import React, { useState, useEffect, useRef } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Upload, Camera, Save, Check, Users, FileText, ExternalLink, Download, Image as ImageIcon, Linkedin, Twitter, Youtube, Music } from 'lucide-react';
import { 
  getProfileImage, 
  saveProfileImage, 
  isValidImageUrl, 
  getUserProfileData, 
  saveSocialLinks, 
  uploadImageToDatabase,
  checkDatabaseConnection
} from '@/utils/imageLoader';
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";

interface SocialLinksFormValues {
  linkedInUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  spotifyUrl: string;
  anandCircleUrl: string;
}

const Dashboard = () => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
  const [resumeUrl, setResumeUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDatabaseConnected, setIsDatabaseConnected] = useState<boolean>(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState<boolean>(true);

  const socialLinksForm = useForm<SocialLinksFormValues>({
    defaultValues: {
      linkedInUrl: 'https://linkedin.com/in/hardeepanand',
      twitterUrl: 'https://twitter.com/hardeepanand',
      youtubeUrl: 'https://youtube.com/@hardeepanand',
      spotifyUrl: 'https://open.spotify.com/user/hardeepanand',
      anandCircleUrl: '#anand-circle',
    }
  });
  
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsCheckingConnection(true);
        
        // Check database connection
        const isConnected = await checkDatabaseConnection();
        setIsDatabaseConnected(isConnected);
        
        // Load profile image
        const savedImage = await getProfileImage();
        if (savedImage) {
          setPreviewUrl(savedImage);
        }
        
        // Load resume URL
        const savedResumeUrl = localStorage.getItem('resumeUrl');
        if (savedResumeUrl) {
          setResumeUrl(savedResumeUrl);
        }

        // Load profile data and social links
        const userData = await getUserProfileData();
        if (userData && userData.socialLinks) {
          socialLinksForm.reset({
            linkedInUrl: userData.socialLinks.linkedIn,
            twitterUrl: userData.socialLinks.twitter,
            youtubeUrl: userData.socialLinks.youtube,
            spotifyUrl: userData.socialLinks.spotify,
            anandCircleUrl: userData.socialLinks.anandCircle,
          });
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        toast.error("Failed to load user data");
      } finally {
        setIsCheckingConnection(false);
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

  const handleSaveResumeUrl = () => {
    if (resumeUrl) {
      localStorage.setItem('resumeUrl', resumeUrl);
      toast.success('Resume URL saved successfully!');
    } else {
      toast.error('Please enter a valid resume URL');
    }
  };

  const openResume = () => {
    if (resumeUrl) {
      window.open(resumeUrl, '_blank');
    } else {
      toast.error('Please save a resume URL first');
    }
  };

  const onSocialLinksSubmit = async (data: SocialLinksFormValues) => {
    try {
      await saveSocialLinks({
        linkedIn: data.linkedInUrl,
        twitter: data.twitterUrl,
        youtube: data.youtubeUrl,
        spotify: data.spotifyUrl,
        anandCircle: data.anandCircleUrl
      });
      
      toast.success('Social links updated successfully!');
    } catch (error) {
      toast.error('Failed to update social links');
    }
  };

  const handleSocialLinkChange = async () => {
    const data = socialLinksForm.getValues();
    await saveSocialLinks({
      linkedIn: data.linkedInUrl,
      twitter: data.twitterUrl,
      youtube: data.youtubeUrl,
      spotify: data.spotifyUrl,
      anandCircle: data.anandCircleUrl
    });
  };

  const testDatabaseConnection = async () => {
    try {
      setIsCheckingConnection(true);
      const isConnected = await checkDatabaseConnection();
      setIsDatabaseConnected(isConnected);
      if (isConnected) {
        toast.success("Successfully connected to database!");
      } else {
        toast.error("Failed to connect to database.");
      }
    } catch (error) {
      console.error("Error testing database connection:", error);
      toast.error("Error testing connection");
    } finally {
      setIsCheckingConnection(false);
    }
  };

  return (
    <MainLayout>
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Dashboard</h1>
              <p className="text-muted-foreground">Manage your profile content</p>
              {!isDatabaseConnected && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                  <p className="text-yellow-700 text-sm">
                    <strong>Note:</strong> You are currently using local storage for saving data. 
                    Database connection is not active. Try logging in or check your Supabase configuration.
                  </p>
                </div>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-6 rounded-xl">
                <h2 className="text-xl font-display font-semibold mb-4 flex items-center">
                  <Camera className="mr-2" size={20} />
                  Profile Image
                </h2>
                
                <div className="space-y-4">
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
              
              <div className="glass-card p-6 rounded-xl">
                <h2 className="text-xl font-display font-semibold mb-4 flex items-center">
                  <Users className="mr-2" size={20} />
                  Social Links
                </h2>
                
                <Form {...socialLinksForm}>
                  <form onChange={handleSocialLinkChange} onSubmit={socialLinksForm.handleSubmit(onSocialLinksSubmit)} className="space-y-4">
                    <FormField
                      control={socialLinksForm.control}
                      name="linkedInUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Linkedin className="mr-2" size={16} />
                            LinkedIn URL
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://linkedin.com/in/yourprofile"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={socialLinksForm.control}
                      name="twitterUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Twitter className="mr-2" size={16} />
                            Twitter URL
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://twitter.com/yourhandle"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={socialLinksForm.control}
                      name="youtubeUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Youtube className="mr-2" size={16} />
                            YouTube URL
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://youtube.com/@youraccount"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={socialLinksForm.control}
                      name="spotifyUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Music className="mr-2" size={16} />
                            Spotify URL
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://open.spotify.com/user/youraccount"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={socialLinksForm.control}
                      name="anandCircleUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Users className="mr-2" size={16} />
                            ANAND Circle URL
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="#anand-circle"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="mt-4">
                      <Save className="mr-2 h-4 w-4" />
                      Save All Social Links
                    </Button>
                    
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <Check className="text-green-500 mr-2" size={16} />
                      <span>Changes are automatically saved</span>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
            
            <Card className="my-8 border-0 bg-gradient-to-br from-primary/10 to-accent/10 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Resume / CV
                </CardTitle>
                <CardDescription>
                  Connect your Gamma-created resume to make it accessible from your site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="resumeUrl" className="text-sm font-medium">
                    Resume URL
                  </label>
                  <Input
                    id="resumeUrl"
                    placeholder="https://gamma.app/your-resume-link"
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the URL where your Gamma resume is published
                  </p>
                </div>
                
                <Button onClick={handleSaveResumeUrl} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Resume URL
                </Button>
              </CardContent>
              
              {resumeUrl && (
                <CardFooter className="flex flex-col sm:flex-row gap-3 bg-black/5 rounded-b-lg p-4">
                  <Button onClick={openResume} variant="outline" className="w-full sm:w-auto">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Resume
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto" onClick={() => window.open(`${resumeUrl}/pdf`, '_blank')}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto" onClick={() => window.open(`${resumeUrl}/png`, '_blank')}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PNG
                  </Button>
                </CardFooter>
              )}
            </Card>
            
            <Card className="mb-8 bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                  </svg>
                  Database Integration
                </CardTitle>
                <CardDescription>
                  Manage your database connection for storing profile data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full mr-3 ${isDatabaseConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="font-medium">Database Status:</span>
                  </div>
                  <span className={isDatabaseConnected ? 'text-green-600' : 'text-red-600'}>
                    {isCheckingConnection ? 'Checking...' : (isDatabaseConnected ? 'Connected' : 'Not Connected')}
                  </span>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {isDatabaseConnected ? (
                    <p>Your profile data is being saved to the Supabase database.</p>
                  ) : (
                    <p>Not connected to Supabase. Data is currently stored in localStorage as a temporary solution.</p>
                  )}
                </div>
                
                <Button 
                  className="w-full" 
                  variant="outline" 
                  onClick={testDatabaseConnection}
                  disabled={isCheckingConnection}
                >
                  {isCheckingConnection ? 'Testing Connection...' : (isDatabaseConnected ? 'Test Connection' : 'Connect Database')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Dashboard;
