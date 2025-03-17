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
  const [showConnectionEffect, setShowConnectionEffect] = useState(false);
  const [socialLinks, setSocialLinks] = useState({
    linkedIn: 'https://linkedin.com/in/hardeepanand',
    twitter: 'https://twitter.com/hardeepanand',
    youtube: 'https://youtube.com/@hardeepanand',
    spotify: 'https://open.spotify.com/user/hardeepanand',
    anandCircle: 'https://www.circleso.com'
  });

  useEffect(() => {
    const loadProfileData = async () => {
      setIsLoading(true);
      try {
        const directProfileImage = localStorage.getItem('profileImageUrl');
        
        if (directProfileImage) {
          setProfileImage(directProfileImage);
          console.log('Loaded profile image directly from localStorage');
        } else {
          const storedProfile = localStorage.getItem('personalProfile');
          
          if (storedProfile) {
            try {
              const profileData: PersonalProfile = JSON.parse(storedProfile);
              
              if (profileData.photo_url) {
                setProfileImage(profileData.photo_url);
              } else {
                setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
              }
              
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
              
              setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
            } catch (e) {
              console.error("Error loading individual social links:", e);
              setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
            }
          }
        }
      } catch (error) {
        console.error("Error loading profile image:", error);
        setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();

    const pulseInterval = setInterval(() => {
      setIsAvatarPulsing(prev => !prev);
    }, 2000);

    const connectionInterval = setInterval(() => {
      setShowConnectionEffect(prev => !prev);
    }, 5000);

    return () => {
      clearInterval(pulseInterval);
      clearInterval(connectionInterval);
    };
  }, []);

  const handleAvatarHover = () => {
    setShowAvatarHint(true);
    setShowConnectionEffect(true);
  };

  const handleAvatarLeave = () => {
    setShowAvatarHint(false);
    setTimeout(() => {
      setShowConnectionEffect(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <div className="relative z-10">
        <ProfileImageDisplay profileImage={profileImage} isLoading={isLoading} />
      </div>
      
      {showConnectionEffect && (
        <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
          <div className="absolute top-[30%] left-[35%] w-16 h-16 rounded-full bg-primary/10 animate-pulse blur-lg"></div>
        </div>
      )}
      
      <AvatarDialog 
        isAvatarPulsing={isAvatarPulsing}
        showAvatarHint={showAvatarHint}
        showAvatarDialog={showAvatarDialog}
        setShowAvatarDialog={setShowAvatarDialog}
        handleAvatarHover={handleAvatarHover}
        handleAvatarLeave={handleAvatarLeave}
      />
      
      <DecorativeElements />
      
      <SocialMediaLinks links={socialLinks} />
    </div>
  );
};

export default ProfileImage;
