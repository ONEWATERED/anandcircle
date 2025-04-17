
import React, { useState, useEffect } from 'react';

interface ProfileBackgroundProps {
  profileImageUrl: string;
}

const ProfileBackground = ({ profileImageUrl }: ProfileBackgroundProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!profileImageUrl) return;
    
    // Reset states when image URL changes
    setImageLoaded(false);
    setHasError(false);
    
    // Preload image to ensure it's ready before displaying
    const img = new Image();
    img.onload = () => {
      console.log("Background image loaded successfully:", profileImageUrl);
      setImageLoaded(true);
    };
    img.onerror = (e) => {
      console.error("Failed to load background image:", e);
      setHasError(true);
      // Still set imageLoaded to true so we can show a fallback
      setImageLoaded(true);
    };
    
    // Ensure the image URL has a leading slash if it's a relative path
    const imageSrc = profileImageUrl.startsWith('http') || profileImageUrl.startsWith('/') 
      ? profileImageUrl 
      : `/${profileImageUrl}`;
      
    img.src = imageSrc;
    
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
      {profileImageUrl && !hasError && (
        <div className="absolute inset-0 z-5 w-full h-full overflow-hidden">
          <div 
            className="w-full h-full transition-opacity duration-500"
            style={{ 
              opacity: imageLoaded ? 0.2 : 0, // Reduced opacity for subtlety
            }}
          >
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${profileImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(1)', // Normal brightness
                mixBlendMode: 'normal'
              }}
            />
          </div>
        </div>
      )}
      
      {/* Fallback background when image fails to load */}
      {hasError && (
        <div className="absolute inset-0 z-5 w-full h-full overflow-hidden">
          <div className="w-full h-full bg-white opacity-30"></div>
        </div>
      )}
      
      {/* Very subtle gradient for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/10 via-white/20 to-white/30" />
    </>
  );
};

export default ProfileBackground;
