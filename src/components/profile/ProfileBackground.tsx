
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
      console.error("Failed to load background image:", profileImageUrl, e);
    };
    img.src = profileImageUrl;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [profileImageUrl]);

  console.log("ProfileBackground rendering with image:", profileImageUrl, "Loaded:", imageLoaded);

  return (
    <>
      {/* Very light gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-10 z-10" />
      
      {/* Background image container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {profileImageUrl && (
          <div 
            className="w-full h-full transition-opacity duration-500"
            style={{ 
              opacity: imageLoaded ? 1 : 0,
            }}
          >
            {/* This div contains the full-size image */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${profileImageUrl})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          </div>
        )}
      </div>
      
      {/* Dark background base */}
      <div className="absolute inset-0 bg-black/70" />
    </>
  );
};

export default ProfileBackground;
