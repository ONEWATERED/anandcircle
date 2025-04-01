
import React from 'react';
import { ImagePlus } from 'lucide-react';

const AIGalleryHeader = () => {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full bg-primary/10 text-primary font-medium">
        <ImagePlus className="mr-2 h-4 w-4" />
        <span>Curated Gallery Collection</span>
      </div>
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
        Explore Our <span className="text-gradient-primary">Visual Knowledge Hub</span>
      </h2>
      
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Browse our categorized collection of visual content spanning water conservation, 
        health data, climate change, and productivity frameworks. These resources are 
        designed to inform and inspire action across all our focus areas.
      </p>
    </div>
  );
};

export default AIGalleryHeader;
