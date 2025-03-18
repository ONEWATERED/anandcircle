
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface FamilyCircleCenterProps {
  centerSize: number;
  width: number;
  height: number;
}

const FamilyCircleCenter: React.FC<FamilyCircleCenterProps> = ({ centerSize, width, height }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('Your Name');
  const [imageError, setImageError] = useState(false);
  const defaultImage = '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
  const isMobile = useIsMobile();

  useEffect(() => {
    // First try to get directly from localStorage for speed
    const directImageUrl = localStorage.getItem('profileImageUrl');
    if (directImageUrl) {
      setProfileImage(directImageUrl);
      console.log("Using profile image from localStorage:", directImageUrl);
    }
    
    // Try to get the personal profile from localStorage
    const storedProfile = localStorage.getItem('personalProfile');
    
    if (storedProfile) {
      try {
        const profileData = JSON.parse(storedProfile);
        
        // Only set the profile image if we don't already have one from localStorage
        if (profileData.photo_url && !directImageUrl) {
          setProfileImage(profileData.photo_url);
          console.log("Using profile image from personalProfile:", profileData.photo_url);
        }
        
        if (profileData.name) {
          setName(profileData.name);
        }
      } catch (error) {
        console.error("Error parsing profile data:", error);
      }
    }
  }, []);

  const handleImageError = () => {
    console.warn("Profile image failed to load in FamilyCircleCenter:", profileImage);
    setImageError(true);
  };

  const imageToDisplay = imageError || !profileImage ? defaultImage : profileImage;

  // Calculate responsive sizes based on mobile detection
  const centerBoxSize = isMobile ? centerSize * 1.8 : centerSize * 2.2;
  const avatarSize = isMobile ? "h-14 w-14" : "h-20 w-20";
  const nameFontSize = isMobile ? "text-xs md:text-sm" : "text-sm md:text-lg";
  const subtitleFontSize = isMobile ? "text-3xs md:text-2xs" : "text-3xs md:text-xs";

  return (
    <div
      className="absolute flex flex-col items-center justify-center z-10"
      style={{
        top: '50%',
        left: '50%',
        width: centerBoxSize,
        height: centerBoxSize,
        marginLeft: -centerBoxSize / 2,
        marginTop: -centerBoxSize / 2,
      }}
    >
      <div
        className="rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg p-3 md:p-4"
        style={{
          width: centerBoxSize,
          height: centerBoxSize,
        }}
      >
        <Avatar className={`${avatarSize} mb-1 md:mb-2 border-4 border-white/30`}>
          <AvatarImage 
            src={imageToDisplay} 
            alt={name} 
            onError={handleImageError}
          />
          <AvatarFallback>
            <Users size={isMobile ? 24 : 32} />
          </AvatarFallback>
        </Avatar>
        
        <h3 className={`text-white font-bold text-center mb-0.5 ${nameFontSize}`}>
          {name}
        </h3>
        
        <p className={`text-white/80 text-center mb-0.5 ${subtitleFontSize} max-w-[90%] mx-auto`}>
          My Family Circle
        </p>
      </div>
    </div>
  );
};

export default FamilyCircleCenter;
