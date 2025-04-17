
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
      console.error("Failed to load background image:", e);
      setImageLoaded(true);
    };
    img.src = profileImageUrl;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [profileImageUrl]);

  // Log the image URL to debug
  console.log("Rendering background with image URL:", profileImageUrl);

  return (
    <>
      {/* Layering structure for background elements */}
      <div className="absolute inset-0 z-0 bg-black" /> {/* Base black background */}
      
      {/* Profile image background - positioned above the black base */}
      {profileImageUrl && (
        <div className="absolute inset-0 z-5 w-full h-full overflow-hidden">
          <div 
            className="w-full h-full transition-opacity duration-500"
            style={{ 
              opacity: imageLoaded ? 0.4 : 0, // Increased opacity to 40% for better visibility
            }}
          >
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${profileImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                filter: 'grayscale(100%) brightness(1.3)', // Increased brightness slightly
                mixBlendMode: 'screen' // Changed blend mode to help visibility
              }}
            />
          </div>
        </div>
      )}
      
      {/* Gentle gradient overlay for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/50 via-black/30 to-black/20" />
    </>
  );
};

export default ProfileBackground;
