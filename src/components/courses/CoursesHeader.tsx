
import React from 'react';
import { GraduationCap } from 'lucide-react';

const CoursesHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full bg-primary/10 text-primary font-medium">
        <GraduationCap className="mr-2 h-4 w-4" />
        <span>Premium Learning Experiences</span>
      </div>
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
        Professional Courses on <span className="text-gradient-primary">One Water Circle</span>
      </h2>
      
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Specialized courses on prompt engineering, AI applications, and productivity systems.
        Join the One Water Circle community to get early access when these courses launch.
      </p>
    </div>
  );
};

export default CoursesHeader;
