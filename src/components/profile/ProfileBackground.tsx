
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
      // Fallback to loaded state even if there's an error, to show the background color
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
      {/* Dark background layer to maintain site's color scheme */}
      <div className="absolute inset-0 bg-tech-dark" />
      
      {/* Full-length profile image container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {profileImageUrl && (
          <div 
            className="w-full h-full transition-opacity duration-500"
            style={{ 
              opacity: imageLoaded ? 0.25 : 0, // Increased opacity slightly for better visibility
            }}
          >
            {/* This div contains the full-length image styled for visibility */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${profileImageUrl})`,
                backgroundSize: 'contain', // Keep 'contain' to show full-length
                backgroundPosition: 'right center', // Position to right side
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(0.8) contrast(1.2)'  // Adjusted filter for better visibility
              }}
            />
          </div>
        )}
      </div>
      
      {/* Adjusted gradient overlay to allow more image visibility on the right side */}
      <div className="absolute inset-0 bg-gradient-to-r from-tech-dark via-tech-dark/90 to-tech-dark/70 z-10" />
    </>
  );
};

export default ProfileBackground;
