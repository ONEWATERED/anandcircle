
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
      console.log("Background image loaded successfully");
      setImageLoaded(true);
    };
    img.onerror = (e) => {
      console.error("Failed to load background image:", e);
      // Fallback to loaded state even if there's an error
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
      {/* Dark background layer */}
      <div className="absolute inset-0 bg-tech-dark" />
      
      {/* Gradient overlay for visual depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-tech-dark/80 via-tech-dark to-tech-dark/95 z-10" />
    </>
  );
};

export default ProfileBackground;
