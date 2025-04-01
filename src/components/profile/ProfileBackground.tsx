
import React, { useState, useEffect } from 'react';

interface ProfileBackgroundProps {
  profileImageUrl: string;
}

const ProfileBackground = ({ profileImageUrl }: ProfileBackgroundProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = profileImageUrl;
    
    return () => {
      img.onload = null;
    };
  }, [profileImageUrl]);

  return (
    <>
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 z-10" />
      
      {/* Background image with adjusted positioning */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {profileImageUrl && (
          <div 
            className="w-full h-full bg-cover bg-center transition-opacity duration-1000"
            style={{ 
              backgroundImage: `url(${profileImageUrl})`,
              backgroundPosition: 'center 20%', // Adjusted this value to show more of the top of the image
              opacity: imageLoaded ? 1 : 0, // Increased opacity from 0.7 to 1
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
