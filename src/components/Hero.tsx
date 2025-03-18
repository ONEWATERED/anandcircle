
import React from 'react';
import { ChevronDown, Globe, ArrowRight, Award, Zap } from 'lucide-react';
import ResumeButton from './ResumeButton';
import ProfileImageDisplay from './profile/ProfileImageDisplay';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Tech background layers */}
      <div className="absolute inset-0 bg-tech-gradient z-0">
        <div className="absolute inset-0 bg-grid-overlay opacity-20"></div>
        <div className="absolute inset-0 bg-scanlines"></div>
        
        {/* Animated data flow lines */}
        <div className="absolute top-1/4 left-0 w-full h-[1px] data-flow"></div>
        <div className="absolute top-2/4 left-0 w-full h-[1px] data-flow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 left-0 w-full h-[1px] data-flow" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="section-container z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 py-12">
        {/* Hero content column */}
        <div className="space-y-6 text-center lg:text-left lg:w-3/5 px-4">
          {/* Tech leader badges */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-900/30 text-cyan-400 border border-cyan-800/50 tech-hover">
              <Globe size={12} className="mr-1" /> Global Tech Leader
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900/30 text-purple-400 border border-purple-800/50 tech-hover">
              <Award size={12} className="mr-1" /> Speaker
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-magenta-900/30 text-magenta-400 border border-magenta-800/50 tech-hover">
              <Zap size={12} className="mr-1" /> Innovator
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gradient-primary">
            Innovating at the Intersection
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient-secondary">
            Tech • Health • Community
          </h2>
          
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl">
            Executive. Innovator. Mentor. Bringing data-driven solutions to public service, 
            health challenges, and community needs.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
            <a 
              href="#story" 
              className="inline-flex items-center justify-center h-12 px-6 font-medium text-white transition-colors rounded-lg bg-cyan-600 hover:bg-cyan-700 tech-hover"
            >
              Discover My Story
            </a>
            <a 
              href="#passions" 
              className="inline-flex items-center justify-center h-12 px-6 font-medium transition-colors rounded-lg border border-purple-500 text-purple-400 hover:bg-purple-900/20 tech-hover"
            >
              Explore My Work
            </a>
            
            <ResumeButton 
              variant="outline" 
              size="lg"
              className="h-12 px-6 rounded-lg border-cyan-700 text-cyan-400 hover:bg-cyan-900/20 tech-hover"
            />
          </div>
          
          {/* Angular tech accent line */}
          <div className="hidden lg:block w-40 h-[3px] bg-gradient-to-r from-cyan-500 via-purple-500 to-magenta-500"></div>
        </div>
        
        {/* Profile image with tech frame */}
        <div className="lg:w-2/5 max-w-md">
          <div className="relative p-1">
            {/* Tech frame with accent corners */}
            <div className="absolute inset-0 border border-cyan-800/50 rounded-lg">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-magenta-400"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-magenta-400"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>
              
              {/* Data flow lines */}
              <div className="absolute top-0 left-0 right-0 h-[1px] data-flow"></div>
              <div className="absolute bottom-0 left-0 right-0 h-[1px] data-flow" style={{ animationDelay: '1.5s' }}></div>
              <div className="absolute left-0 top-0 bottom-0 w-[1px] data-flow" style={{ animationDirection: 'reverse' }}></div>
              <div className="absolute right-0 top-0 bottom-0 w-[1px] data-flow" style={{ animationDelay: '0.75s', animationDirection: 'reverse' }}></div>
            </div>
            
            {/* Profile image display */}
            <div className="relative z-20 p-3">
              <ProfileImageDisplay 
                profileImage="/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png" 
                isLoading={false} 
              />
              
              {/* World map overlay */}
              <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
                <svg viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M210.3,21.4C180,25,150.2,31.5,121.2,41.9c-13.3-1.2-21.8,4.1-22.1,7.3c-2.3,1.9-1.9,3.5-4.1,4.1c0.4,1.9,2.3,3.9,4.6,3.5 c-0.4,0.4-2.3,1.5-2.7,1.9c-1.5,0-3.5,3.1-3.1,5.4c-1.2,5.4,0.8,7.6,2.3,11.8c-1.2,1.9-3.9,3.1-3.9,6.4c-3.1,1.5-2.7,4.6-3.5,7.6 c1.5,0.4,1.9,4.6,0.8,8.7c-2.3,1.5-3.5,3.9-5,6.4c1.5,0.8,3.9,4.1,3.9,7.3c-5.8,7.3-5.4,10.7-7.6,17.2c-9.5,10.3-9.1,13-13.3,24.8 c-2.3,0.8-2.7-1.5-4.6,0c-3.1,3.1-5.4,5.8-9.1,8.3c-4.1,12.5-10.3,16.8-19.5,24.4c0,1.5-0.4,2.7-2.3,3.1c-0.8,3.1-3.5,4.1-5.4,5.8 c-1.2,3.5-1.9,5.8-3.5,9.1c0.8,3.1,4.1,5.8,6.4,9.1c-3.1,3.1-3.9,7.6-6.8,10.7c0,1.5,1.5,3.1,1.5,4.1c-0.8,0.8-1.5,0.8-1.9,1.5 c0,0.4,0.8,1.9,1.9,2.3c-0.8,2.3-1.5,5-1.9,7.6c0.8,0.8,2.3,0.8,3.5,1.5c0.4,1.9-0.8,3.9-1.2,5.4c-2.3,1.2-3.9,3.1-5.4,5 c0.4,2.3,1.9,3.5,3.5,4.6c0,3.9-0.8,7.3-1.5,10.3c2.7,2.3,4.6,5.4,7.3,7.6c-3.1,4.1-3.1,8.7-4.6,13.7c-1.5,0.8-3.5,0.8-4.6,1.9 c-0.8,2.7-0.8,5.8-1.5,8.7c1.5,1.2,4.6,1.5,5.8,4.1c0,3.9-2.3,6.4-3.9,9.5c1.2,1.5,3.5,2.3,4.6,3.9c-2.3,1.9-3.5,5-3.5,9.1 c-3.1,0.8-3.1,3.9-5.4,4.6c0,1.9,0.4,3.9,1.2,5.4c1.9,0.8,3.5,0.8,5.4,1.5c-0.4,1.9-0.8,3.9-1.5,5.8c-2.3,1.2-4.1,3.1-5.4,5.4 c1.2,1.2,3.1,1.5,4.6,2.3c0,6.4-2.3,11.1-5.4,15.6c-3.9,0.8-5.8,3.9-9.1,5.4c0,7.3-1.2,14.1-1.9,21c-2.3,1.2-3.5,3.5-5.4,5 c0.4,1.5,1.5,3.1,2.3,4.6c-0.8,0.8-1.5,1.9-2.3,2.7c0.4,1.5,1.5,2.7,1.9,4.1c-4.6,3.9-5.8,11.1-9.9,14.9c0,1.9,0.4,3.5,0.8,5 c-2.3,5.8-3.9,24.8-3.9,25.2" fill="none" stroke="#00ccff" strokeWidth="1" className="continent"></path>
                </svg>
              </div>
            </div>
            
            {/* Animated glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-magenta-500/20 rounded-lg blur-sm opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-soft"></div>
          </div>
        </div>
      </div>
      
      {/* Simple scroll indicator */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20">
        <a href="#story" className="flex flex-col items-center text-cyan-400 hover:text-cyan-300 transition-colors">
          <span className="text-sm font-medium mb-1">Scroll Down</span>
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
