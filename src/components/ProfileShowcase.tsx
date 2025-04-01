
import React, { useEffect, useState } from 'react';
import { getUserProfileData } from '@/utils/profileImages';
import { ensureHttpProtocol } from '@/utils/databaseConnection';
import ProfileBackground from './profile/ProfileBackground';
import ProfileHeader from './profile/ProfileHeader';
import SocialFooter from './profile/SocialFooter';
import ScrollPrompt from './profile/ScrollPrompt';
import { toast } from 'sonner';

const ProfileShowcase = () => {
  // Guaranteed default image that we know exists
  const defaultImage = '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
  
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
        // Verify the default image exists before proceeding
        try {
          const defaultImageResponse = await fetch(defaultImage, { method: 'HEAD' });
          if (!defaultImageResponse.ok) {
            console.error("Default image is not accessible:", defaultImage);
          } else {
            console.log("Default image is accessible and valid");
          }
        } catch (imgErr) {
          console.error("Error checking default image:", imgErr);
        }
        
        // Get user profile data
        const data = await getUserProfileData();
        console.log("Raw profile data received:", data);
        
        if (data) {
          // Always ensure we have a valid image URL
          let photoUrl = data.photoUrl || defaultImage;
          
          // Don't validate external URLs to prevent CORS issues
          if (photoUrl !== defaultImage && photoUrl.startsWith('/')) {
            try {
              // Quick validation of the image URL for local images
              const imageCheck = await fetch(photoUrl, { method: 'HEAD' });
              if (!imageCheck.ok) {
                console.warn("Retrieved photo URL is not accessible, using default:", photoUrl);
                photoUrl = defaultImage;
              }
            } catch (imgErr) {
              console.warn("Error validating photo URL, using default:", imgErr);
              photoUrl = defaultImage;
            }
          }
          
          console.log("Final photo URL to be used:", photoUrl);
          
          setProfileData({
            profileImageUrl: photoUrl,
            socialLinks: {
              linkedIn: ensureHttpProtocol(data.socialLinks?.linkedIn || profileData.socialLinks.linkedIn),
              twitter: ensureHttpProtocol(data.socialLinks?.twitter || profileData.socialLinks.twitter),
              youtube: ensureHttpProtocol(data.socialLinks?.youtube || profileData.socialLinks.youtube),
              spotify: ensureHttpProtocol(data.socialLinks?.spotify || profileData.socialLinks.spotify),
              anandCircle: data.socialLinks?.anandCircle || profileData.socialLinks.anandCircle
            }
          });
        } else {
          console.warn("No profile data retrieved, using defaults");
          // Make sure to set profileData explicitly with the default image if no data
          setProfileData(prevData => ({
            ...prevData,
            profileImageUrl: defaultImage
          }));
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
        toast.error("There was an issue loading your profile data");
        // Explicitly set default image on error
        setProfileData(prevData => ({
          ...prevData,
          profileImageUrl: defaultImage
        }));
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
      style={{ position: 'relative' }}
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
