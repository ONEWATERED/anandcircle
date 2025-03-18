
import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import ResumeButton from './ResumeButton';
import ProfileImageDisplay from './profile/ProfileImageDisplay';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white"
    >
      <div className="section-container z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 py-12">
        {/* Hero content column */}
        <div className="space-y-6 text-center lg:text-left lg:w-3/5 px-4 fade-in">
          {/* Tags */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
              AI & Data Solutions
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
              Tech Leadership
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
              Water & Health
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Innovating at the <span className="text-primary">Intersection</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-muted-foreground">
            Tech • Health • Community
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl">
            Executive. Innovator. Mentor. Bringing data-driven solutions to public service, 
            health challenges, and community needs.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
            <Button size="lg" className="hover-shadow">
              Discover My Story
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="hover-shadow">
              Explore My Work
            </Button>
            
            <ResumeButton 
              variant="secondary" 
              size="lg"
              className="hover-shadow"
            />
          </div>
        </div>
        
        {/* Profile image with modern frame */}
        <div className="lg:w-2/5 max-w-md opacity-0 animate-fade-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
          <div className="relative p-3 bg-white rounded-lg shadow-sm hover-shadow transition-all duration-300">
            {/* Profile image display */}
            <div className="relative z-20 rounded-lg overflow-hidden">
              <ProfileImageDisplay 
                profileImage="/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png" 
                isLoading={false} 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Simple scroll indicator */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20">
        <a href="#story" className="flex flex-col items-center text-gray-500 hover:text-gray-700 transition-colors">
          <span className="text-sm font-medium mb-1">Scroll Down</span>
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
