
import React, { useEffect, useState } from 'react';
import { getProfileImage, getUserProfileData } from '@/utils/imageLoader';
import SocialMediaLinks from './profile/SocialMediaLinks';
import AvatarDialog from './profile/AvatarDialog';
import ProfileImageDisplay from './profile/ProfileImageDisplay';
import DecorativeElements from './profile/DecorativeElements';

interface SocialLinks {
  linkedIn: string;
  twitter: string;
  youtube: string;
  spotify: string;
  anandCircle: string;
}

const ProfileImage = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isAvatarPulsing, setIsAvatarPulsing] = useState(true);
  const [showAvatarHint, setShowAvatarHint] = useState(false);
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    linkedIn: 'https://linkedin.com/in/hardeepanand',
    twitter: 'https://twitter.com/hardeepanand',
    youtube: 'https://youtube.com/@hardeepanand',
    spotify: 'https://open.spotify.com/user/hardeepanand',
    anandCircle: '#anand-circle'
  });

  useEffect(() => {
    // Load profile image and social links
    const loadUserData = async () => {
      setIsLoading(true);
      try {
        // Load profile image
        const savedImage = await getProfileImage();
        console.log("Loaded profile image:", savedImage);
        if (savedImage) {
          setProfileImage(savedImage);
        } else {
          // Fallback to default image
          setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
        }
        
        // Load social links
        const userData = await getUserProfileData();
        if (userData && userData.socialLinks) {
          setSocialLinks(userData.socialLinks as SocialLinks);
        }
      } catch (error) {
        console.error("Error loading profile image:", error);
        // Fallback to default image on error
        setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();

    // Set interval for the avatar animation
    const pulseInterval = setInterval(() => {
      setIsAvatarPulsing(prev => !prev);
    }, 2000);

    // Show the avatar dialog automatically after 3 seconds
    const dialogTimer = setTimeout(() => {
      setShowAvatarDialog(true);
    }, 3000);

    return () => {
      clearInterval(pulseInterval);
      clearTimeout(dialogTimer);
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
