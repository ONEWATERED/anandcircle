
import React from 'react';
import { ImagePlus } from 'lucide-react';

const AIGalleryHeader = () => {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full bg-primary/10 text-primary font-medium">
        <ImagePlus className="mr-2 h-4 w-4" />
        <span>My Visual Collection</span>
      </div>
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-white">
        Peek Into <span className="text-gradient-cyan-purple">My Gallery</span>
      </h2>
      
      <p className="text-muted-foreground max-w-2xl mx-auto">
        I've collected these visuals throughout my journey in water conservation, 
        health data, and climate action. Feel free to browse and get inspired!
      </p>
    </div>
  );
};

export default AIGalleryHeader;
