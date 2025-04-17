
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
    
    const img = new Image();
    img.onload = () => {
      console.log("Background image loaded successfully:", profileImageUrl);
      setImageLoaded(true);
    };
    img.onerror = (e) => {
      console.error("Failed to load background image:", e);
      setHasError(true);
    };
    
    img.src = profileImageUrl;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [profileImageUrl]);

  return (
    <>
      {/* Black background base */}
      <div className="absolute inset-0 z-0 bg-black" />
      
      {/* Profile image background - positioned with improved opacity and scaling */}
      {profileImageUrl && (
        <div className="absolute inset-0 z-5 w-full h-full overflow-hidden">
          <div 
            className="w-full h-full transition-opacity duration-500"
            style={{ 
              opacity: 0.35, // Adjusted opacity for better visibility
            }}
          >
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${profileImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 25%', // Positioned slightly higher
                backgroundRepeat: 'no-repeat',
                filter: 'grayscale(50%) brightness(0.9)', // Reduced grayscale effect
                mixBlendMode: 'normal'
              }}
            />
          </div>
        </div>
      )}
      
      {/* Enhanced gradient overlay for better text readability */}
      <div 
        className="absolute inset-0 z-15 bg-gradient-to-b from-black/30 via-black/20 to-black/40" 
        style={{ mixBlendMode: 'multiply' }}
      />
    </>
  );
};

export default ProfileBackground;
