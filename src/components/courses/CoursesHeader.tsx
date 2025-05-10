
import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CoursesHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full bg-primary/10 text-primary font-medium">
        <GraduationCap className="mr-2 h-4 w-4" />
        <span>Community Courses</span>
      </div>
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-white">
        Learn With Me <span className="text-gradient-cyan-purple">Online</span>
      </h2>
      
      <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
        I've created a community where we can learn together about prompt engineering, AI, and productivity systems. 
        Join us to get early access to these premium courses when they launch!
      </p>
    </div>
  );
};

export default CoursesHeader;
