
import React, { useEffect, useState } from 'react';
import { getUserProfileData } from '@/utils/profileImages';
import { ensureHttpProtocol } from '@/utils/databaseConnection';
import ProfileBackground from './profile/ProfileBackground';
import ProfileHeader from './profile/ProfileHeader';
import SocialFooter from './profile/SocialFooter';
import ScrollPrompt from './profile/ScrollPrompt';

const ProfileShowcase = () => {
  const [profileData, setProfileData] = useState({
    profileImageUrl: null,
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
        const data = await getUserProfileData();
        if (data) {
          setProfileData({
            profileImageUrl: data.photoUrl || '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png',
            socialLinks: {
              linkedIn: ensureHttpProtocol(data.socialLinks?.linkedIn || profileData.socialLinks.linkedIn),
              twitter: ensureHttpProtocol(data.socialLinks?.twitter || profileData.socialLinks.twitter),
              youtube: ensureHttpProtocol(data.socialLinks?.youtube || profileData.socialLinks.youtube),
              spotify: ensureHttpProtocol(data.socialLinks?.spotify || profileData.socialLinks.spotify),
              anandCircle: data.socialLinks?.anandCircle || profileData.socialLinks.anandCircle
            }
          });
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
        // Use default image if there's an error
        setProfileData(prev => ({
          ...prev,
          profileImageUrl: '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png'
        }));
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, []);

  return (
    <section 
      id="home" 
      className="relative w-full min-h-screen overflow-hidden bg-tech-dark"
    >
      <ProfileBackground profileImageUrl={profileData.profileImageUrl} />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
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
