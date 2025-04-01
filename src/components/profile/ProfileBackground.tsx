
import React, { useState, useEffect } from 'react';

interface ProfileBackgroundProps {
  profileImageUrl: string;
}

const ProfileBackground = ({ profileImageUrl }: ProfileBackgroundProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!profileImageUrl) return;
    
    // Preload image to ensure it's ready before displaying
    const img = new Image();
    img.onload = () => {
      console.log("Background image loaded successfully:", profileImageUrl);
      setImageLoaded(true);
    };
    img.onerror = (e) => {
      console.error("Failed to load background image:", e);
      setImageLoaded(true);
    };
    img.src = profileImageUrl;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [profileImageUrl]);

  // Log the image URL to debug
  console.log("Rendering background with image URL:", profileImageUrl);

  return (
    <>
      {/* Base dark background layer */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Full-length profile image container */}
      {profileImageUrl && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div 
            className="w-full h-full transition-opacity duration-500"
            style={{ 
              opacity: imageLoaded ? 0.1 : 0, // Reduced to 10% opacity as requested
            }}
          >
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${profileImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(1.4) contrast(1.5) saturate(1.2)', // Enhanced brightness, contrast and saturation
                mixBlendMode: 'normal' // Using normal blend mode instead of overlay
              }}
            />
          </div>
        </div>
      )}
      
      {/* Very light gradient overlay to maintain text readability while keeping image visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-black/20 z-10" />
    </>
  );
};

export default ProfileBackground;
