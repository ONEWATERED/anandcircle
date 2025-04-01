
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
      {/* Darker background base to make the image stand out */}
      <div className="absolute inset-0 bg-gray-900" />
      
      {/* Background image container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {profileImageUrl && (
          <div 
            className="w-full h-full transition-opacity duration-500"
            style={{ 
              opacity: imageLoaded ? 1 : 0,
            }}
          >
            {/* This div contains the full-size image with enhanced visibility */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${profileImageUrl})`,
                backgroundSize: 'contain',  // Show full person without cropping
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(1.3) contrast(1.1)'  // Increase brightness for better visibility
              }}
            />
          </div>
        )}
      </div>
      
      {/* Very subtle gradient overlay to help with text readability without hiding the image */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10" />
    </>
  );
};

export default ProfileBackground;
