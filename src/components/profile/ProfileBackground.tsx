
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
      {/* Dark gradient overlay - reduced opacity to make image more visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10" />
      
      {/* Background image with adjusted positioning */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {profileImageUrl && (
          <div 
            className="w-full h-full bg-cover bg-center transition-opacity duration-1000"
            style={{ 
              backgroundImage: `url(${profileImageUrl})`,
              backgroundPosition: 'center 15%', // Move image up to show head better
              opacity: imageLoaded ? 1 : 0, 
            }}
          />
        )}
      </div>
      
      {/* Fallback background color */}
      <div className="absolute inset-0 bg-black" />
    </>
  );
};

export default ProfileBackground;
