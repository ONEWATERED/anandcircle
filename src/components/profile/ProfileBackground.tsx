
import React, { useState, useEffect } from 'react';

interface ProfileBackgroundProps {
  profileImageUrl: string;
}

const ProfileBackground = ({ profileImageUrl }: ProfileBackgroundProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!profileImageUrl) return;
    
    setImageLoaded(false);
    setHasError(false);
    
    const img = new Image();
    img.onload = () => {
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
      
      {/* Profile image background - positioned with transparency */}
      {profileImageUrl && (
        <div className="absolute inset-0 z-5 w-full h-full overflow-hidden">
          <div 
            className="w-full h-full transition-opacity duration-500"
            style={{ 
              opacity: 0.4,
            }}
          >
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${profileImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                filter: 'grayscale(100%) brightness(0.8)',
                mixBlendMode: 'normal'
              }}
            />
          </div>
        </div>
      )}
      
      {/* Very subtle gradient for text readability */}
      <div className="absolute inset-0 z-15 bg-gradient-to-b from-black/10 via-black/20 to-black/30" />
    </>
  );
};

export default ProfileBackground;
