
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
      {/* Completely transparent background */}
      <div className="absolute inset-0 z-0 bg-transparent" />
      
      {/* Profile image background - positioned with transparency */}
      {profileImageUrl && (
        <div className="absolute inset-0 z-5 w-full h-full overflow-hidden">
          <div 
            className="w-full h-full transition-opacity duration-500"
            style={{ 
              opacity: imageLoaded ? 0.4 : 0,
            }}
          >
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${profileImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                filter: 'grayscale(100%) brightness(1.3)',
                mixBlendMode: 'screen'
              }}
            />
          </div>
        </div>
      )}
      
      {/* Very subtle gradient for text readability without a solid background */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-transparent to-transparent" />
    </>
  );
};

export default ProfileBackground;
