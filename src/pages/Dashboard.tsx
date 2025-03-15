import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Upload, Camera, Save, Check, Users } from 'lucide-react';
import { getProfileImage, saveProfileImage, isValidImageUrl } from '@/utils/imageLoader';

const Dashboard = () => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  
  // Simulate saving to localStorage for demo purposes
  const handleSaveImage = () => {
    if (profileImageUrl) {
      localStorage.setItem('profileImageUrl', profileImageUrl);
      toast.success('Profile image updated successfully!');
    } else {
      toast.error('Please enter a valid image URL');
    }
  };
  
  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileImageUrl(e.target.value);
    setPreviewUrl(e.target.value);
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
                      className="w-full"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Image
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
