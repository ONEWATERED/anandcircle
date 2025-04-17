
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
      // Still set imageLoaded to true so we can show a fallback
      setImageLoaded(true);
    };
    
    // Ensure the image URL has a leading slash if it's a relative path
    const imageSrc = profileImageUrl.startsWith('http') || profileImageUrl.startsWith('/') 
      ? profileImageUrl 
      : `/${profileImageUrl}`;
      
    img.src = imageSrc;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [profileImageUrl]);

  // Log the image URL to debug
  console.log("Rendering background with image URL:", profileImageUrl);

  return (
    <>
      {/* Black background base */}
      <div className="absolute inset-0 z-0 bg-black" />
      
      {/* Profile image background - positioned with transparency */}
      {profileImageUrl && !hasError && (
        <div className="absolute inset-0 z-5 w-full h-full overflow-hidden">
          <div 
            className="w-full h-full transition-opacity duration-500"
            style={{ 
              opacity: imageLoaded ? 0.25 : 0, // Increased opacity for better visibility
            }}
          >
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${profileImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                filter: 'grayscale(100%) brightness(0.8)', // Black & white with reduced brightness
                mixBlendMode: 'normal'
              }}
            />
          </div>
        </div>
      )}
      
      {/* Centered profile image above background but behind text */}
      {profileImageUrl && !hasError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
          <div 
            className="w-3/4 md:w-1/2 max-w-lg h-auto aspect-square transition-opacity duration-500 rounded-full overflow-hidden"
            style={{ 
              opacity: imageLoaded ? 0.4 : 0, // Increased opacity for better visibility
            }}
          >
            <img 
              src={profileImageUrl} 
              alt="Profile" 
              className="w-full h-full object-cover"
              style={{
                filter: 'grayscale(100%) contrast(1.1)' // Black & white with slightly increased contrast
              }}
            />
          </div>
        </div>
      )}
      
      {/* Fallback background when image fails to load */}
      {hasError && (
        <div className="absolute inset-0 z-5 w-full h-full overflow-hidden">
          <div className="w-full h-full bg-black opacity-30"></div>
        </div>
      )}
      
      {/* Very subtle gradient for text readability */}
      <div className="absolute inset-0 z-15 bg-gradient-to-b from-black/10 via-black/20 to-black/30" />
    </>
  );
};

export default ProfileBackground;
