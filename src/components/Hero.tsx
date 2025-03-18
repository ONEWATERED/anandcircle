
import React, { useEffect } from 'react';
import { ChevronDown, ArrowRight, Droplet, BarChart2, Cpu } from 'lucide-react';
import ResumeButton from './ResumeButton';
import ProfileImageDisplay from './profile/ProfileImageDisplay';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import BackgroundParticles from './domain-graphic/BackgroundParticles';

const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-tech-dark"
      style={{ backgroundColor: '#0F172A' }} /* Fallback color */
    >
      {/* Try/catch would be inappropriate here as it's React rendering, not an async operation */}
      <BackgroundParticles isMobile={isMobile} />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/5 blur-[100px] animate-float"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-secondary/5 blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* Grid background with scanlines */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
      
      <div className="section-container z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 py-12">
        {/* Hero content column */}
        <div className="space-y-6 text-center lg:text-left lg:w-3/5 px-4" style={{ color: 'white' }}>
          {/* Tech tags */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-4">
            <span className="tech-gradient-border inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-muted/30 text-foreground border-none" style={{ backgroundColor: 'rgba(30, 41, 59, 0.3)', color: 'white' }}>
              <Droplet className="w-3 h-3 text-primary" style={{ color: '#0EA5E9' }} />
              Water Data Systems
            </span>
            <span className="tech-gradient-border inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-muted/30 text-foreground border-none" style={{ backgroundColor: 'rgba(30, 41, 59, 0.3)', color: 'white' }}>
              <BarChart2 className="w-3 h-3 text-secondary" style={{ color: '#9333EA' }} />
              AI Analysis
            </span>
            <span className="tech-gradient-border inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-muted/30 text-foreground border-none" style={{ backgroundColor: 'rgba(30, 41, 59, 0.3)', color: 'white' }}>
              <Cpu className="w-3 h-3 text-accent" style={{ color: '#DB2777' }} />
              Tech Leadership
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground" style={{ color: 'white' }}>
            Innovating at the <span className="text-gradient-tech">Intersection</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-muted-foreground" style={{ color: '#94a3b8' }}>
            Tech • Health • Community
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl" style={{ color: '#94a3b8' }}>
            Executive. Innovator. Mentor. Bringing data-driven solutions to public service, 
            health challenges, and community needs.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
            <Button size="lg" variant="default" className="hover:bg-primary-foreground/80 hover-float group" style={{ backgroundColor: '#0EA5E9', color: 'white' }}>
              Discover My Story
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="secondary" className="hover-float" style={{ backgroundColor: '#9333EA', color: 'white' }}>
              Explore My Work
            </Button>
            
            <ResumeButton 
              variant="outline" 
              size="lg"
              className="hover-float"
            />
          </div>
        </div>
        
        {/* Profile image with tech frame */}
        <div className="lg:w-2/5 max-w-md">
          <div className="relative p-1 bg-muted/10 transition-all duration-300 hover-float" style={{ border: '1px solid rgba(14, 165, 233, 0.5)' }}>
            {/* Profile image display */}
            <div className="relative z-20 overflow-hidden">
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
        <a href="#story" className="flex flex-col items-center text-primary/70 hover:text-primary transition-colors" style={{ color: 'rgba(14, 165, 233, 0.7)' }}>
          <span className="text-sm font-medium mb-1 text-muted-foreground" style={{ color: '#94a3b8' }}>Explore</span>
          <div className="w-6 h-10 border rounded-full flex items-start justify-center p-1" style={{ borderColor: 'rgba(14, 165, 233, 0.2)' }}>
            <ChevronDown size={16} className="animate-bounce mt-1" />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
