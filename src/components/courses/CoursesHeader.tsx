
import React from 'react';
import { GraduationCap } from 'lucide-react';

const CoursesHeader = () => {
  return (
    <div className="text-center mb-16 opacity-0 animate-fade-up">
      <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full bg-primary/10 text-primary font-medium">
        <GraduationCap className="mr-2 h-4 w-4" />
        <span>Learning & Community</span>
      </div>
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
        Exclusive Courses on <span className="text-gradient-primary">Circle</span>
      </h2>
      
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Join my Circle community to access premium courses on data science, artificial intelligence, 
        and prompt engineering. Learn skills that will transform your career and future.
      </p>
    </div>
  );
};

export default CoursesHeader;
