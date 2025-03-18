
import React from 'react';
import { ChevronDown, ArrowRight, Droplet, BarChart2, Cpu } from 'lucide-react';
import ResumeButton from './ResumeButton';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <section 
      id="home" 
      className="relative w-full flex items-center min-h-[90vh] pt-20 md:pt-24 pb-12 md:pb-16 overflow-hidden bg-gradient-to-b from-tech-dark to-[#131c32]"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] to-[#131c32] z-0"></div>
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5 z-0"></div>
      
      {/* Animated gradient orbs - subtle and non-intrusive */}
      <div className="absolute top-20 -right-20 w-72 h-72 rounded-full bg-primary/5 blur-[100px] opacity-50"></div>
      <div className="absolute bottom-20 -left-20 w-96 h-96 rounded-full bg-secondary/5 blur-[120px] opacity-50"></div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-8 md:gap-12">
        {/* Hero content column - centered */}
        <div className="w-full max-w-3xl space-y-4 md:space-y-6 text-center">
          {/* Tech tags */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-3 md:mb-4">
            <span className="inline-flex items-center gap-1 md:gap-2 px-2 py-1 rounded-full text-[10px] md:text-xs font-medium bg-primary/20 text-white border border-primary/30">
              <Droplet className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
              Water Data Systems
            </span>
            <span className="inline-flex items-center gap-1 md:gap-2 px-2 py-1 rounded-full text-[10px] md:text-xs font-medium bg-secondary/20 text-white border border-secondary/30">
              <BarChart2 className="w-2.5 h-2.5 md:w-3 md:h-3 text-secondary" />
              AI Analysis
            </span>
            <span className="inline-flex items-center gap-1 md:gap-2 px-2 py-1 rounded-full text-[10px] md:text-xs font-medium bg-accent/20 text-white border border-accent/30">
              <Cpu className="w-2.5 h-2.5 md:w-3 md:h-3 text-accent" />
              Tech Leadership
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Innovating at the <span className="text-gradient-tech">Intersection</span>
          </h1>
          
          <h2 className="text-xl md:text-3xl font-medium tracking-tight text-gray-300">
            Tech • Health • Community
          </h2>
          
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
            Executive. Innovator. Mentor. Bringing data-driven solutions to public service, 
            health challenges, and community needs.
          </p>
          
          <div className="flex flex-wrap gap-3 md:gap-4 pt-4 justify-center">
            <Button size={isMobile ? "default" : "lg"} className="bg-primary text-white hover:bg-primary/80 shadow-lg text-sm md:text-base">
              Discover My Story
              <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size={isMobile ? "default" : "lg"} variant="secondary" className="bg-secondary text-white hover:bg-secondary/80 shadow-lg text-sm md:text-base">
              Explore My Work
            </Button>
            
            <ResumeButton 
              variant="outline" 
              size={isMobile ? "default" : "lg"}
              className="border-primary/50 text-primary hover:text-primary-foreground shadow-lg text-sm md:text-base"
            />
          </div>
        </div>
      </div>
      
      {/* Tech-styled scroll indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <a href="#story" className="flex flex-col items-center text-primary/70 hover:text-primary transition-colors">
          <span className="text-xs md:text-sm font-medium mb-1 text-gray-400">Explore</span>
          <div className="w-5 h-8 md:w-6 md:h-10 border border-primary/30 rounded-full flex items-start justify-center p-1">
            <ChevronDown size={isMobile ? 12 : 16} className="animate-bounce mt-1" />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
