
import React from 'react';
import { ArrowRight } from 'lucide-react';
import ResumeButton from './ResumeButton';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <section 
      id="home" 
      className="relative w-full flex items-center min-h-[90vh] pt-20 md:pt-24 pb-12 md:pb-16 overflow-hidden bg-white"
    >
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-8 md:gap-12">
        {/* Hero content column - centered */}
        <div className="w-full max-w-3xl space-y-4 md:space-y-6 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black">
            Innovating at the Intersection
          </h1>
          
          <h2 className="text-xl md:text-3xl font-normal tracking-tight text-gray-700">
            Tech • Health • Community
          </h2>
          
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Executive. Innovator. Mentor. Bringing data-driven solutions to public service, 
            health challenges, and community needs.
          </p>
          
          <div className="flex flex-wrap gap-3 md:gap-4 pt-4 justify-center">
            <Button 
              size={isMobile ? "default" : "lg"} 
              className="bg-black text-white hover:bg-black/90 text-sm md:text-base"
              onClick={() => {
                document.getElementById('profile-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Meet Hardeep
              <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <Button size={isMobile ? "default" : "lg"} variant="outline" className="border-black text-black hover:bg-black/10 text-sm md:text-base">
              Explore My Work
            </Button>
            
            <ResumeButton 
              variant="outline" 
              size={isMobile ? "default" : "lg"}
              className="border-black text-black hover:bg-black/10 text-sm md:text-base"
            />
          </div>
        </div>
      </div>
      
      {/* Simple scroll indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <a href="#profile-section" className="flex flex-col items-center text-black hover:text-gray-600 transition-colors">
          <span className="text-xs md:text-sm font-normal mb-1 text-gray-600">Explore</span>
          <div className="w-5 h-8 md:w-6 md:h-10 border border-black rounded-full flex items-start justify-center p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
