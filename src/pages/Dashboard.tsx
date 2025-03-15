
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Upload, Camera, Save, Check, Users, FileText, ExternalLink, Download } from 'lucide-react';
import { getProfileImage, saveProfileImage, isValidImageUrl } from '@/utils/imageLoader';
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';

const Dashboard = () => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
  const [resumeUrl, setResumeUrl] = useState<string>('');
  
  // Load current profile image on component mount
  useEffect(() => {
    const savedImage = getProfileImage();
    if (savedImage) {
      setPreviewUrl(savedImage);
    }
    
    // Load resume URL from localStorage if available
    const savedResumeUrl = localStorage.getItem('resumeUrl');
    if (savedResumeUrl) {
      setResumeUrl(savedResumeUrl);
    }
  }, []);
  
  // Save to localStorage for demo purposes
  const handleSaveImage = () => {
    if (profileImageUrl) {
      saveProfileImage(profileImageUrl);
      setPreviewUrl(profileImageUrl);
      toast.success('Profile image updated successfully!');
    } else {
      toast.error('Please enter a valid image URL');
    }
  };
  
  const handleResetToDefault = () => {
    const defaultImage = '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
    saveProfileImage(defaultImage);
    setPreviewUrl(defaultImage);
    setProfileImageUrl('');
    toast.success('Profile image reset to default');
  };
  
  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileImageUrl(e.target.value);
    if (e.target.value) {
      setPreviewUrl(e.target.value);
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

  return (
    <MainLayout>
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Dashboard</h1>
              <p className="text-muted-foreground">Manage your profile content</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image Management Section */}
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
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Image
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
              
              {/* Content Management Section */}
              <div className="glass-card p-6 rounded-xl">
                <h2 className="text-xl font-display font-semibold mb-4">Social Links</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="linkedinUrl" className="text-sm font-medium">
                      LinkedIn URL
                    </label>
                    <Input
                      id="linkedinUrl"
                      placeholder="https://linkedin.com/in/yourprofile"
                      defaultValue="https://linkedin.com/in/hardeepanand"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="twitterUrl" className="text-sm font-medium">
                      Twitter URL
                    </label>
                    <Input
                      id="twitterUrl"
                      placeholder="https://twitter.com/yourhandle"
                      defaultValue="https://twitter.com/hardeepanand"
                    />
                  </div>
                  
                  <div className="flex items-center mt-6 text-sm text-muted-foreground">
                    <Check className="text-green-500 mr-2" size={16} />
                    <span>Changes are automatically saved</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Resume Section */}
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
            
            {/* ANAND Circle Management */}
            <div className="glass-card p-6 rounded-xl mt-8">
              <h2 className="text-xl font-display font-semibold mb-4 flex items-center">
                <Users className="mr-2" size={20} />
                HARDEEP ANAND Circle Settings
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="circleUrl" className="text-sm font-medium">
                    ANAND Circle URL
                  </label>
                  <Input
                    id="circleUrl"
                    placeholder="https://anandcircle.com"
                    defaultValue="#anand-circle"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the URL for your ANAND Circle community
                  </p>
                </div>
                
                <Button className="mt-4">
                  Save Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Dashboard;
