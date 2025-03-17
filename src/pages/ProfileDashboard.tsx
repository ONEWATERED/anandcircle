
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, RefreshCw } from 'lucide-react';
import { useSyncPersonalProfile } from '@/hooks/useSyncPersonalProfile';
import { useProfileDashboard } from '@/hooks/useProfileDashboard';
import ProfileImageTab from '@/components/profile-dashboard/ProfileImageTab';
import SocialLinksTab from '@/components/profile-dashboard/SocialLinksTab';
import FrontendImageAlert from '@/components/profile-dashboard/FrontendImageAlert';

const ProfileDashboard = () => {
  const { syncPersonalProfileToFrontend, isLoading: isSyncing, lastSynced } = useSyncPersonalProfile();
  const {
    profile,
    setProfile,
    isLoading,
    isSaving,
    frontendImageUrl,
    updateSocialLink,
    saveProfile,
    setIsSaving
  } = useProfileDashboard();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const success = await saveProfile();
    
    if (success) {
      // Update frontend image URL after successful sync
      await syncPersonalProfileToFrontend();
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
        
        <FrontendImageAlert frontendImageUrl={frontendImageUrl} />
        
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
              
              <TabsContent value="general">
                <ProfileImageTab 
                  profile={profile} 
                  setProfile={setProfile} 
                  isSaving={isSaving}
                  setIsSaving={setIsSaving}
                  syncPersonalProfileToFrontend={syncPersonalProfileToFrontend}
                />
              </TabsContent>
              
              <TabsContent value="social">
                <SocialLinksTab 
                  profile={profile} 
                  updateSocialLink={updateSocialLink} 
                />
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
