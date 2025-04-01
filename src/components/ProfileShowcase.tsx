
import React, { useEffect, useState } from 'react';
import { getUserProfileData } from '@/utils/profileImages';
import { ensureHttpProtocol } from '@/utils/databaseConnection';
import ProfileBackground from './profile/ProfileBackground';
import ProfileHeader from './profile/ProfileHeader';
import SocialFooter from './profile/SocialFooter';
import ScrollPrompt from './profile/ScrollPrompt';
import { toast } from 'sonner';
import { isValidImageUrl } from '@/utils/fileUtils';

const ProfileShowcase = () => {
  // Use the uploaded image as the default
  const defaultImage = '/lovable-uploads/af889e4e-763b-4091-8c89-3427066e5f65.png';
  
  const [profileData, setProfileData] = useState({
    profileImageUrl: defaultImage,
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
        
        // Always use the provided image by default
        setProfileData(prev => ({
          ...prev,
          profileImageUrl: defaultImage
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
      className="relative w-full min-h-screen overflow-hidden bg-tech-dark"
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
