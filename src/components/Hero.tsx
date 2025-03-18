
import React from 'react';
import { ChevronDown } from 'lucide-react';
import ResumeButton from './ResumeButton';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Plain background */}
      <div className="absolute inset-0 bg-gray-50 z-0"></div>
      
      <div className="section-container z-10 text-center max-w-5xl mx-auto">
        <div className="space-y-6 px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Innovating at the Intersection
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
            Tech • Health • Community
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Executive. Innovator. Mentor. Bringing data-driven solutions to public service, health challenges, and community needs.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4 justify-center">
            <a 
              href="#story" 
              className="inline-flex items-center justify-center h-12 px-6 font-medium text-white transition-colors rounded-lg bg-primary hover:bg-primary/90"
            >
              Discover My Story
            </a>
            <a 
              href="#passions" 
              className="inline-flex items-center justify-center h-12 px-6 font-medium text-primary transition-colors rounded-lg border border-primary hover:bg-primary/10"
            >
              Explore My Work
            </a>
            
            <ResumeButton 
              variant="outline" 
              size="lg"
              className="h-12 px-6 rounded-lg text-primary border-primary"
            />
          </div>
        </div>
      </div>
      
      {/* Simple scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <a href="#story" className="flex flex-col items-center text-gray-500 hover:text-gray-800 transition-colors">
          <span className="text-sm font-medium mb-1">Scroll Down</span>
          <ChevronDown size={20} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
