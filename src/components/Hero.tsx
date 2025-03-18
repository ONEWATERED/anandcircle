
import React from 'react';
import { ChevronDown } from 'lucide-react';
import ResumeButton from './ResumeButton';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced futuristic gradient background with brand colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/80 via-brand-purple/60 to-brand-blue/70 z-0"></div>
      
      {/* Enhanced abstract geometric shapes for futuristic look */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 blur-3xl animate-pulse-soft" style={{ animationDuration: '15s' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-brand-purple/20 to-brand-cyan/20 blur-3xl animate-pulse-soft" style={{ animationDuration: '20s' }}></div>
      <div className="absolute top-1/3 left-1/5 w-72 h-72 rounded-full bg-gradient-to-r from-brand-cyan/10 to-brand-blue/10 blur-3xl animate-pulse-soft" style={{ animationDuration: '25s' }}></div>
      
      {/* Enhanced digital mesh network effect - small glowing dots with brand colors */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ 
        backgroundImage: 'radial-gradient(circle at 30px 30px, rgba(0, 255, 255, 0.4) 2px, transparent 0)', 
        backgroundSize: '60px 60px' 
      }}></div>
      
      <div className="section-container z-10 text-center max-w-5xl mx-auto">
        {/* Center aligned content */}
        <div className="space-y-6 animate-fade-up px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-white text-balance animate-fade-up animate-delay-200 drop-shadow-lg">
            Innovating at the <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan to-brand-cyan/80">Intersection</span>
          </h1>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white text-balance animate-fade-up animate-delay-300 drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-purple/80">Tech • Health • Community</span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto animate-fade-up animate-delay-400">
            Executive. Innovator. Mentor. Bringing data-driven solutions to public service, health challenges, and community needs.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4 justify-center animate-fade-up animate-delay-500">
            <a 
              href="#story" 
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple hover:shadow-lg hover:shadow-brand-purple/20 focus:outline-none"
            >
              Discover My Story
            </a>
            <a 
              href="#passions" 
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-full glass-button hover:shadow-brand-cyan/20"
            >
              Explore My Work
            </a>
            
            {/* Resume Button with enhanced styling */}
            <ResumeButton 
              variant="outline" 
              size="lg"
              className="h-12 px-6 rounded-full glass-button text-white"
            />
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <a href="#story" className="flex flex-col items-center text-white/80 hover:text-white transition-colors duration-200">
          <span className="text-sm font-medium mb-1">Scroll Down</span>
          <ChevronDown size={20} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
