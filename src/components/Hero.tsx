
import React from 'react';
import { ChevronDown, ArrowRight, Droplet, BarChart2, Cpu } from 'lucide-react';
import ResumeButton from './ResumeButton';
import ProfileImageDisplay from './profile/ProfileImageDisplay';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <section 
      id="home" 
      className="relative w-full flex items-center min-h-screen pt-24 pb-16 overflow-hidden bg-gradient-to-b from-tech-dark to-[#131c32]"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] to-[#131c32] z-0"></div>
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5 z-0"></div>
      
      {/* Animated gradient orbs - subtle and non-intrusive */}
      <div className="absolute top-20 -right-20 w-72 h-72 rounded-full bg-primary/5 blur-[100px] opacity-50"></div>
      <div className="absolute bottom-20 -left-20 w-96 h-96 rounded-full bg-secondary/5 blur-[120px] opacity-50" style={{ animationDelay: '2s' }}></div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Hero content column */}
        <div className="w-full lg:w-3/5 space-y-6 text-center lg:text-left">
          {/* Tech tags */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-white border border-primary/30">
              <Droplet className="w-3 h-3 text-primary" />
              Water Data Systems
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-secondary/20 text-white border border-secondary/30">
              <BarChart2 className="w-3 h-3 text-secondary" />
              AI Analysis
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-white border border-accent/30">
              <Cpu className="w-3 h-3 text-accent" />
              Tech Leadership
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Innovating at the <span className="text-gradient-tech">Intersection</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-gray-300">
            Tech • Health • Community
          </h2>
          
          <p className="text-lg text-gray-400 max-w-3xl">
            Executive. Innovator. Mentor. Bringing data-driven solutions to public service, 
            health challenges, and community needs.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/80 shadow-lg">
              Discover My Story
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="secondary" className="bg-secondary text-white hover:bg-secondary/80 shadow-lg">
              Explore My Work
            </Button>
            
            <ResumeButton 
              variant="outline" 
              size="lg"
              className="border-primary/50 text-primary hover:text-primary-foreground shadow-lg"
            />
          </div>
        </div>
        
        {/* Profile image with tech frame - properly positioned and sized */}
        <div className="w-full lg:w-2/5 max-w-md flex justify-center lg:justify-end">
          <div className="w-[280px] md:w-[320px] tech-gradient-border bg-black/30 p-1 rounded-lg shadow-neon-cyan">
            {/* Profile image display */}
            <div className="relative overflow-hidden rounded-md">
              <ProfileImageDisplay 
                profileImage="/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png" 
                isLoading={false} 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Tech-styled scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <a href="#story" className="flex flex-col items-center text-primary/70 hover:text-primary transition-colors">
          <span className="text-sm font-medium mb-1 text-gray-400">Explore</span>
          <div className="w-6 h-10 border border-primary/30 rounded-full flex items-start justify-center p-1">
            <ChevronDown size={16} className="animate-bounce mt-1" />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
