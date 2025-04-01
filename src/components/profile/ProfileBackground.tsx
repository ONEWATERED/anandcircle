
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
              opacity: imageLoaded ? 0.15 : 0, // Very subtle opacity for background presence
            }}
          >
            {/* This div contains the full-length image styled for visibility */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${profileImageUrl})`,
                backgroundSize: 'contain', // Changed to 'contain' to show full-length
                backgroundPosition: 'right center', // Position to right side for better visibility
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(0.6) contrast(1.1)'  // Subtle filter for dark theme
              }}
            />
          </div>
        )}
      </div>
      
      {/* Dark gradient overlay for better text readability and to match site theme */}
      <div className="absolute inset-0 bg-gradient-to-r from-tech-dark via-tech-dark/95 to-tech-dark/80 z-10" />
    </>
  );
};

export default ProfileBackground;
