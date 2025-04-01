
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
      {/* No gradient overlay to ensure full image visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30 z-10" />
      
      {/* Background image with larger size and position adjusted to show top of head */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {profileImageUrl && (
          <div 
            className="w-full h-full bg-cover bg-center transition-opacity duration-300"
            style={{ 
              backgroundImage: `url(${profileImageUrl})`,
              backgroundPosition: 'center 40%', // Position adjusted to show more of the top
              opacity: imageLoaded ? 1 : 0,
              transform: 'scale(1.1)', // Slightly enlarge the image
            }}
          />
        )}
      </div>
      
      {/* Fallback background color */}
      <div className="absolute inset-0 bg-black" />

      {/* Debug information during development */}
      {!imageLoaded && profileImageUrl && (
        <div className="absolute bottom-4 right-4 bg-red-500 text-white px-2 py-1 text-xs rounded z-50">
          Loading image: {profileImageUrl.substring(0, 30)}...
        </div>
      )}
    </>
  );
};

export default ProfileBackground;
