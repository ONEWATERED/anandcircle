
import React from 'react';

const ProfileBackground = () => {
  return (
    <>
      {/* Black background base */}
      <div className="absolute inset-0 z-0 bg-black" />
      
      {/* Very subtle gradient for text readability */}
      <div className="absolute inset-0 z-15 bg-gradient-to-b from-black/10 via-black/20 to-black/30" />
    </>
  );
};

export default ProfileBackground;
