
import React from 'react';
import { ChevronDown, ExternalLink, ArrowRight } from 'lucide-react';
import ResumeButton from './ResumeButton';
import ProfileImageDisplay from './profile/ProfileImageDisplay';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-light"
    >
      {/* Light background patterns */}
      <div className="absolute inset-0 bg-dot-pattern z-0 opacity-50"></div>
      <div className="absolute inset-0 bg-grid z-0 opacity-30"></div>
      
      <div className="section-container z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 py-12">
        {/* Hero content column */}
        <div className="space-y-6 text-center lg:text-left lg:w-3/5 px-4 fade-in">
          {/* Tags */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover-shadow">
              AI & Data Solutions
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20 hover-shadow">
              Tech Leadership
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20 hover-shadow">
              Water & Health
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Innovating at the <span className="text-gradient-primary">Intersection</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-muted-foreground">
            Tech • Health • Community
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
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
          
          {/* Subtle accent line */}
          <div className="hidden lg:block w-40 h-[2px] bg-gradient-to-r from-primary to-secondary/70"></div>
        </div>
        
        {/* Profile image with modern frame */}
        <div className="lg:w-2/5 max-w-md fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="relative p-3 bg-white rounded-xl card-shadow hover-shadow transition-all duration-300">
            {/* Clean frame */}
            <div className="absolute inset-0 border border-primary/10 rounded-xl overflow-hidden">
              {/* Corner accents - subtle */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary"></div>
              
              {/* Flow animation line - top */}
              <div className="absolute top-0 left-0 right-0 h-[1px] flow-animation"></div>
            </div>
            
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
        <a href="#story" className="flex flex-col items-center text-primary hover:text-primary/80 transition-colors">
          <span className="text-sm font-medium mb-1">Scroll Down</span>
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
