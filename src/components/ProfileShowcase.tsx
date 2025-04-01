
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
        console.log("ProfileShowcase: Loading user profile data");
        
        // First check if default image is accessible
        const isDefaultImageValid = await isValidImageUrl(defaultImage);
        if (!isDefaultImageValid) {
          console.error("Default image is inaccessible:", defaultImage);
          // Use an alternative default image from Unsplash that we know works
          setProfileData(prev => ({
            ...prev,
            profileImageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
          }));
        }
        
        // Get user profile data
        const data = await getUserProfileData();
        console.log("Raw profile data received:", data);
        
        if (data && data.photoUrl) {
          // Always ensure we have a valid image URL
          let photoUrl = data.photoUrl;
          
          // Log the URL we're about to use
          console.log("Using photo URL:", photoUrl);
          
          // If URL is relative, make it absolute
          if (photoUrl && !photoUrl.startsWith('http') && !photoUrl.startsWith('/')) {
            photoUrl = '/' + photoUrl;
          }
          
          // Validate the image URL
          const isPhotoValid = await isValidImageUrl(photoUrl);
          if (isPhotoValid) {
            console.log("Profile photo is valid and accessible:", photoUrl);
            setProfileData(prev => ({
              ...prev,
              profileImageUrl: photoUrl
            }));
          } else {
            console.error("Profile photo is not accessible, using fallback:", photoUrl);
            // Use Unsplash fallback
            setProfileData(prev => ({
              ...prev,
              profileImageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
            }));
          }
          
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
        } else {
          console.warn("No profile data retrieved or missing photo URL, using Unsplash placeholder");
          setProfileData(prev => ({
            ...prev,
            profileImageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
          }));
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
        toast.error("There was an issue loading your profile data");
        // Use a known working image URL as fallback
        setProfileData(prev => ({
          ...prev,
          profileImageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
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
