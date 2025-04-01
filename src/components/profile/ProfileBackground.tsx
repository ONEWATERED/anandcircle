
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

  return (
    <>
      {/* Dark background layer for base color */}
      <div className="absolute inset-0 bg-tech-dark" />
      
      {/* Full-length profile image container */}
      {profileImageUrl && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div 
            className="w-full h-full transition-opacity duration-500"
            style={{ 
              opacity: imageLoaded ? 1 : 0, // Set to full opacity (was 0.7)
            }}
          >
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${profileImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(1.2) contrast(1.3) saturate(1.1)' // Increased brightness, contrast and saturation
              }}
            />
          </div>
        </div>
      )}
      
      {/* Lighter gradient overlay for better text readability but more image visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-tech-dark/70 via-tech-dark/50 to-tech-dark/30 z-10" />
    </>
  );
};

export default ProfileBackground;
