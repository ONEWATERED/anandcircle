
import React from 'react';

// Simplified background component without animation
const BackgroundParticles: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <div className="absolute inset-0 bg-[#0F172A] opacity-50">
      {/* Static pattern background instead of animated particles */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
    </div>
  );
};

export default BackgroundParticles;
