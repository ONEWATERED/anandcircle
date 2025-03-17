
import React, { useEffect, useState } from 'react';
import { PersonalProfile } from '@/types/thought-leaders';
import SocialMediaLinks from './profile/SocialMediaLinks';
import AvatarDialog from './profile/AvatarDialog';
import ProfileImageDisplay from './profile/ProfileImageDisplay';
import DecorativeElements from './profile/DecorativeElements';

const ProfileImage = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isAvatarPulsing, setIsAvatarPulsing] = useState(true);
  const [showAvatarHint, setShowAvatarHint] = useState(false);
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [socialLinks, setSocialLinks] = useState({
    linkedIn: 'https://linkedin.com/in/hardeepanand',
    twitter: 'https://twitter.com/hardeepanand',
    youtube: 'https://youtube.com/@hardeepanand',
    spotify: 'https://open.spotify.com/user/hardeepanand',
    anandCircle: 'https://www.circleso.com'
  });

  useEffect(() => {
    // Load profile image and social links from the synced personal profile
    const loadProfileData = async () => {
      setIsLoading(true);
      try {
        // First try to get direct profile image URL
        const directProfileImage = localStorage.getItem('profileImageUrl');
        
        if (directProfileImage) {
          setProfileImage(directProfileImage);
          console.log('Loaded profile image directly from localStorage');
        } else {
          // Try to get from the personal profile object
          const storedProfile = localStorage.getItem('personalProfile');
          
          if (storedProfile) {
            try {
              const profileData: PersonalProfile = JSON.parse(storedProfile);
              
              // Set profile image
              if (profileData.photo_url) {
                setProfileImage(profileData.photo_url);
              } else {
                // Fallback to default image
                setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
              }
              
              // Set social links if available
              if (profileData.socialLinks) {
                setSocialLinks({
                  linkedIn: profileData.socialLinks.linkedin || socialLinks.linkedIn,
                  twitter: profileData.socialLinks.twitter || socialLinks.twitter,
                  youtube: profileData.socialLinks.youtube || socialLinks.youtube,
                  spotify: profileData.socialLinks.spotify || socialLinks.spotify,
                  anandCircle: profileData.socialLinks.anandcircle || socialLinks.anandCircle
                });
              }
            } catch (parseError) {
              console.error("Error parsing profile data:", parseError);
              setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
            }
          } else {
            // Try to load social links individually
            try {
              const linkedInUrl = localStorage.getItem('linkedInUrl');
              const twitterUrl = localStorage.getItem('twitterUrl');
              const youtubeUrl = localStorage.getItem('youtubeUrl');
              const spotifyUrl = localStorage.getItem('spotifyUrl');
              const anandCircleUrl = localStorage.getItem('anandCircleUrl');
              
              setSocialLinks({
                linkedIn: linkedInUrl || socialLinks.linkedIn,
                twitter: twitterUrl || socialLinks.twitter,
                youtube: youtubeUrl || socialLinks.youtube,
                spotify: spotifyUrl || socialLinks.spotify,
                anandCircle: anandCircleUrl || socialLinks.anandCircle
              });
              
              // Fallback to default image
              setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
            } catch (e) {
              console.error("Error loading individual social links:", e);
              // Keep default social links
              setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
            }
          }
        }
      } catch (error) {
        console.error("Error loading profile image:", error);
        // Fallback to default image on error
        setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();

    // Set interval for the avatar animation
    const pulseInterval = setInterval(() => {
      setIsAvatarPulsing(prev => !prev);
    }, 2000);

    // Removed the automatic avatar dialog display

    return () => {
      clearInterval(pulseInterval);
    };
  }, []);

  const handleAvatarHover = () => {
    setShowAvatarHint(true);
  };

  const handleAvatarLeave = () => {
    setShowAvatarHint(false);
  };

  return (
    <div className="relative">
      {/* Main image container with soft blend effect */}
      <div className="relative z-10">
        <ProfileImageDisplay profileImage={profileImage} isLoading={isLoading} />
      </div>
      
      {/* Digital Avatar Interactive Element */}
      <AvatarDialog 
        isAvatarPulsing={isAvatarPulsing}
        showAvatarHint={showAvatarHint}
        showAvatarDialog={showAvatarDialog}
        setShowAvatarDialog={setShowAvatarDialog}
        handleAvatarHover={handleAvatarHover}
        handleAvatarLeave={handleAvatarLeave}
      />
      
      {/* Decorative background elements */}
      <DecorativeElements />
      
      {/* Social Media Links */}
      <SocialMediaLinks links={socialLinks} />
    </div>
  );
};

export default ProfileImage;
