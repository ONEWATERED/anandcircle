
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
    >
      <BackgroundParticles isMobile={isMobile} />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/5 blur-[100px] animate-float"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-secondary/5 blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* Grid background with scanlines */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
      
      <div className="section-container z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 py-12">
        {/* Hero content column */}
        <div className="space-y-6 text-center lg:text-left lg:w-3/5 px-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          {/* Tech tags */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-4">
            <span className="tech-gradient-border inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-muted/30 text-foreground border-none">
              <Droplet className="w-3 h-3 text-primary" />
              Water Data Systems
            </span>
            <span className="tech-gradient-border inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-muted/30 text-foreground border-none">
              <BarChart2 className="w-3 h-3 text-secondary" />
              AI Analysis
            </span>
            <span className="tech-gradient-border inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-muted/30 text-foreground border-none">
              <Cpu className="w-3 h-3 text-accent" />
              Tech Leadership
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Innovating at the <span className="text-gradient-tech">Intersection</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-muted-foreground">
            Tech • Health • Community
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl">
            Executive. Innovator. Mentor. Bringing data-driven solutions to public service, 
            health challenges, and community needs.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
            <Button size="lg" variant="tech" glow="cyan" className="tech-gradient-border hover-float group">
              Discover My Story
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="secondary" className="hover-float">
              Explore My Work
            </Button>
            
            <ResumeButton 
              variant="glass" 
              size="lg"
              className="hover-float"
            />
          </div>
        </div>
        
        {/* Profile image with tech frame */}
        <div className="lg:w-2/5 max-w-md opacity-0 animate-fade-up" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
          <div className="relative p-1 bg-muted/10 tech-gradient-border transition-all duration-300 hover-float">
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
        <a href="#story" className="flex flex-col items-center text-primary/70 hover:text-primary transition-colors">
          <span className="text-sm font-medium mb-1 text-muted-foreground">Explore</span>
          <div className="w-6 h-10 border border-primary/20 rounded-full flex items-start justify-center p-1">
            <ChevronDown size={16} className="animate-bounce mt-1" />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
