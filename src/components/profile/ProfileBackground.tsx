
import React from 'react';
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
    
    // Preload image to ensure it's ready before displaying
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

  // Log the image URL to debug
  console.log("Rendering background with image URL:", profileImageUrl);

const ProfileBackground = () => {
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
              opacity: 0.25,
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
      
      {/* Centered profile image above background but behind text */}
      {profileImageUrl && (
        <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
          <div 
            className="w-3/4 md:w-1/2 max-w-lg h-auto aspect-square transition-opacity duration-500 rounded-full overflow-hidden"
            style={{ 
              opacity: 0.4,
            }}
          >
            <img 
              src={profileImageUrl} 
              alt="Profile" 
              className="w-full h-full object-cover"
              style={{
                filter: 'grayscale(100%) contrast(1.1)'
              }}
            />
          </div>
        </div>
      )}
      
{/* Very subtle gradient for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-black/20 to-black/30" />
      <div className="absolute inset-0 z-15 bg-gradient-to-b from-black/10 via-black/20 to-black/30" />
</>
);
};