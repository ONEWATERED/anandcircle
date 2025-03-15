
import React from 'react';
import { FileText } from 'lucide-react';

const HealthResourcesHeader = () => {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full bg-primary/10 text-primary font-medium">
        <FileText className="mr-2 h-4 w-4" />
        <span>Health Resources</span>
      </div>
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
        Innovative <span className="text-gradient-primary">Health Insights</span>
      </h2>
      
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Access my evidence-based research and publications on optimizing health, wellness, and performance.
        Join the Circle community for exclusive content and resources.
      </p>
    </div>
  );
};

export default HealthResourcesHeader;
