
import React, { useEffect, useState } from 'react';
import { getUserProfileData } from '@/utils/profile';
import { ensureHttpProtocol } from '@/utils/database';
import ProfileBackground from './profile/ProfileBackground';
import ProfileHeader from './profile/ProfileHeader';
import SocialFooter from './profile/SocialFooter';
import ScrollPrompt from './profile/ScrollPrompt';
import { toast } from 'sonner';
import { isValidImageUrl } from '@/utils/fileUtils';
import { updatePersonalProfilePhoto } from '@/utils/profile';
import { supabase } from '@/integrations/supabase/client';

const ProfileShowcase = () => {
  // Use a different image that we know exists in the public folder
  const newProfileImage = '/placeholder.svg';
  
  const [profileData, setProfileData] = useState({
    profileImageUrl: newProfileImage,
    socialLinks: {
      linkedIn: 'https://linkedin.com/in/hardeepanand',
      twitter: 'https://twitter.com/hardeepanand',
      youtube: 'https://youtube.com/@hardeepanand',
      spotify: 'https://open.spotify.com/user/hardeepanand',
      anandCircle: '#anand-circle'
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        console.log("ProfileShowcase: Loading user profile data");
        
        // Save the new image to the database
        await updatePersonalProfilePhoto(newProfileImage);
        
        // Always use the provided image by default
        setProfileData(prev => ({
          ...prev,
          profileImageUrl: newProfileImage
        }));
        
        // Get user profile data for social links only
        const data = await getUserProfileData();
        console.log("Raw profile data received:", data);
        
        // Update social links if available
        if (data.socialLinks) {
          setProfileData(prev => ({
            ...prev,
            socialLinks: {
              linkedIn: ensureHttpProtocol(data.socialLinks?.linkedIn || prev.socialLinks.linkedIn),
              twitter: ensureHttpProtocol(data.socialLinks?.twitter || prev.socialLinks.twitter),
              youtube: ensureHttpProtocol(data.socialLinks?.youtube || prev.socialLinks.youtube),
              spotify: ensureHttpProtocol(data.socialLinks?.spotify || prev.socialLinks.spotify),
              anandCircle: data.socialLinks?.anandCircle || prev.socialLinks.anandCircle
            }
          }));
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
        toast.error("There was an issue loading your profile data");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, []);

  console.log("ProfileShowcase rendering with image:", profileData.profileImageUrl);

  return (
    <section 
      id="home" 
      className="relative w-full min-h-screen overflow-hidden bg-slate-700" // Medium-dark background for better contrast
    >
      <ProfileBackground profileImageUrl={profileData.profileImageUrl} />
      
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center py-20 md:py-24">
          <ProfileHeader />
          <SocialFooter 
            socialLinks={profileData.socialLinks} 
            isLoading={isLoading} 
          />
        </div>
      </div>
      
      <ScrollPrompt />
    </section>
  );
};

export default ProfileShowcase;
