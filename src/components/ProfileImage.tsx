
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

    // Set up occasional connection effect show/hide
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
    // Don't turn off connection effect immediately
    setTimeout(() => {
      setShowConnectionEffect(false);
    }, 2000);
  };

  return (
    <div className="relative">
      {/* Main image container with soft blend effect */}
      <div className="relative z-10">
        <ProfileImageDisplay profileImage={profileImage} isLoading={isLoading} />
      </div>
      
      {/* "Mind connection" animation overlay */}
      {showConnectionEffect && (
        <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
          {/* Neural network-like connecting lines from head to avatar */}
          <div className="absolute top-[25%] right-0 w-[150px] h-[100px]">
            <svg width="100%" height="100%" viewBox="0 0 150 100" className="opacity-60">
              {/* Neural network nodes from head to AI avatar */}
              <circle cx="10" cy="50" r="3" fill="#9b87f5" className="animate-pulse" />
              <circle cx="40" cy="35" r="2" fill="#8B5CF6" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
              <circle cx="70" cy="25" r="2.5" fill="#D6BCFA" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
              <circle cx="100" cy="20" r="2" fill="#9b87f5" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
              <circle cx="130" cy="10" r="3" fill="#8B5CF6" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
              
              {/* Connection paths */}
              <path d="M10,50 Q40,45 40,35" stroke="#9b87f5" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
              <path d="M40,35 Q55,30 70,25" stroke="#8B5CF6" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
              <path d="M70,25 Q85,22 100,20" stroke="#D6BCFA" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
              <path d="M100,20 Q115,15 130,10" stroke="#9b87f5" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
              
              {/* Moving data particle effects */}
              <circle className="animate-[neural-data-1_3s_infinite]" r="1.5" fill="#ffffff">
                <animateMotion
                  path="M10,50 Q40,45 40,35 Q55,30 70,25 Q85,22 100,20 Q115,15 130,10"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle className="animate-[neural-data-2_3s_infinite_1s]" r="1" fill="#ffffff">
                <animateMotion
                  path="M10,50 Q40,45 40,35 Q55,30 70,25 Q85,22 100,20 Q115,15 130,10"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
          
          {/* Pulsing brain energy effect near profile head */}
          <div className="absolute top-[30%] left-[35%] w-16 h-16 rounded-full bg-primary/10 animate-pulse blur-lg"></div>
        </div>
      )}
      
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
