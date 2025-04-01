
import React, { useEffect, useState } from 'react';
import { getUserProfileData } from '@/utils/profile';
import { ensureHttpProtocol } from '@/utils/database';
import ProfileBackground from './profile/ProfileBackground';
import ProfileHeader from './profile/ProfileHeader';
import SocialFooter from './profile/SocialFooter';
import ScrollPrompt from './profile/ScrollPrompt';
import { updatePersonalProfilePhoto } from '@/utils/profile';

const ProfileShowcase = () => {
  // Use a direct path to a public image that definitely exists
  const profileImage = '/placeholder.svg';
  
  const [profileData, setProfileData] = useState({
    profileImageUrl: profileImage,
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
        
        // Always use the hardcoded image path which we know works
        await updatePersonalProfilePhoto(profileImage);
        
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
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, []);

  return (
    <section 
      id="home" 
      className="relative w-full min-h-screen overflow-hidden bg-tech-dark" // Match site's dark theme
    >
      <ProfileBackground profileImageUrl={profileImage} />
      
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
