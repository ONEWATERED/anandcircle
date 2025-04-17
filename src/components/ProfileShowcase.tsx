
import React, { useEffect, useState } from 'react';
import { getUserProfileData } from '@/utils/profile';
import { ensureHttpProtocol } from '@/utils/database';
import ProfileBackground from './profile/ProfileBackground';
import ProfileHeader from './profile/ProfileHeader';
import SocialFooter from './profile/SocialFooter';
import ScrollPrompt from './profile/ScrollPrompt';

const ProfileShowcase = () => {
  const profileImage = '/lovable-uploads/1f2c23f2-c00c-42dd-9f76-d8562ba0550c.png';
  
  const [profileData, setProfileData] = useState({
    profileImageUrl: profileImage,
    socialLinks: {
      linkedIn: 'https://linkedin.com/in/hardeepanand',
      twitter: 'https://x.com/HardeepAnandd',
      youtube: 'https://youtube.com/@hardeepanand',
      anandCircle: '#anand-circle'
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  console.log("ProfileShowcase: Using profile image:", profileImage);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        console.log("ProfileShowcase: Loading user profile data");
        
        const data = await getUserProfileData();
        console.log("Raw profile data received:", data);
        
        if (data.socialLinks) {
          setProfileData(prev => ({
            ...prev,
            socialLinks: {
              linkedIn: ensureHttpProtocol(data.socialLinks?.linkedIn || prev.socialLinks.linkedIn),
              twitter: ensureHttpProtocol(data.socialLinks?.twitter || prev.socialLinks.twitter),
              youtube: ensureHttpProtocol(data.socialLinks?.youtube || prev.socialLinks.youtube),
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
      className="relative w-full min-h-screen overflow-hidden bg-black" 
    >
      <ProfileBackground profileImageUrl={profileImage} />
      
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-7xl mx-auto flex flex-row items-center justify-center gap-8 py-20 md:py-24">
          <div className="flex flex-col items-start">
            <ProfileHeader />
            <SocialFooter 
              socialLinks={profileData.socialLinks} 
              isLoading={isLoading} 
            />
          </div>
        </div>
      </div>
      
      <ScrollPrompt />
    </section>
  );
};

export default ProfileShowcase;
