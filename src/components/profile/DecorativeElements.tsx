
import React from 'react';

const DecorativeElements = () => {
  return (
    <>
      {/* Static decorative elements with brand colors */}
      <div className="absolute -top-5 -right-5 w-48 h-48 bg-gradient-to-r from-brand-blue/10 to-brand-cyan/10 rounded-full z-0"></div>
      <div className="absolute -bottom-5 -left-5 w-48 h-48 bg-gradient-to-r from-brand-purple/10 to-brand-cyan/10 rounded-full z-0"></div>
    </>
  );
};

export default DecorativeElements;
