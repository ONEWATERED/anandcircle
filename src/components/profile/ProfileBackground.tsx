
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
      {/* Dark background layer to match the site's color scheme */}
      <div className="absolute inset-0 bg-tech-dark" />
      
      {/* Background image container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {profileImageUrl && (
          <div 
            className="w-full h-full transition-opacity duration-500"
            style={{ 
              opacity: imageLoaded ? 0.3 : 0, // Lower opacity for a more subtle background
            }}
          >
            {/* This div contains the full-size image with enhanced visibility */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${profileImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(0.7) contrast(1.2)'  // Darker filter to match site's dark theme
              }}
            />
          </div>
        )}
      </div>
      
      {/* Dark gradient overlay for better text readability and to match site theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-tech-dark/80 via-tech-dark/70 to-tech-dark/60 z-10" />
    </>
  );
};

export default ProfileBackground;
