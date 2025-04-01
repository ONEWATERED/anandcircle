
import React from 'react';
import { FileText } from 'lucide-react';

const HealthResourcesHeader = () => {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full bg-primary/10 text-primary font-medium">
        <FileText className="mr-2 h-4 w-4" />
        <span>Health & Wellness</span>
      </div>
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
        My <span className="text-gradient-primary">Health Journey</span> & Research
      </h2>
      
      <p className="text-muted-foreground max-w-2xl mx-auto">
        I'm passionate about sharing what I've learned about optimizing health and wellness. 
        Check out my research and join our Circle community for more personalized guidance!
      </p>
    </div>
  );
};

export default HealthResourcesHeader;
