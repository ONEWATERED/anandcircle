
import React from 'react';

const DecorativeElements = () => {
  return (
    <>
      {/* Enhanced decorative elements with more blur for better blending */}
      <div className="absolute -top-5 -right-5 w-48 h-48 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-5 -left-5 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-400/20 rounded-full blur-3xl z-0"></div>
    </>
  );
};

export default DecorativeElements;
