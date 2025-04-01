
import React from 'react';
import { GraduationCap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CoursesHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full bg-primary/10 text-primary font-medium">
        <Users className="mr-2 h-4 w-4" />
        <span>Join Our Circle Community</span>
      </div>
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
        Learn With Me in the <span className="text-gradient-cyan-purple">One Water Circle</span>
      </h2>
      
      <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
        I've created a community where we can learn together about prompt engineering, AI, and productivity systems. 
        Join our free Circle community first and get early access to these premium courses when they launch!
      </p>
      
      <Link to="https://www.circleso.com" target="_blank" rel="noopener noreferrer">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white mb-8"
        >
          <Users className="mr-2 h-4 w-4" />
          Join Our Circle for Free
        </Button>
      </Link>
    </div>
  );
};

export default CoursesHeader;
