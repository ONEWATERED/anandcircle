
import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient background with blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
      
      <div className="section-container grid lg:grid-cols-2 gap-8 items-center z-10">
        {/* Text content */}
        <div className="order-2 lg:order-1 space-y-6 animate-fade-right">
          <div className="inline-block glass-dark rounded-full px-4 py-1 text-sm font-medium animate-fade-up animate-delay-100">
            Welcome to hardeepand.com
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-balance animate-fade-up animate-delay-200">
            Innovating at the Intersection of <span className="text-primary">Tech, Health & Community</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-xl animate-fade-up animate-delay-300">
            Executive. Innovator. Mentor. Bringing data-driven solutions to public service, health challenges, and community needs.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2 animate-fade-up animate-delay-400">
            <a 
              href="#story" 
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-full bg-primary hover:bg-primary/90 focus:shadow-outline focus:outline-none"
            >
              Discover My Story
            </a>
            <a 
              href="#passions" 
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-foreground transition duration-200 rounded-full glass hover:bg-white/80"
            >
              Explore My Work
            </a>
          </div>
        </div>
        
        {/* Image container - replace with your actual image */}
        <div className="order-1 lg:order-2 relative animate-fade-left">
          <div className="relative max-w-md mx-auto">
            {/* Main image with a glass effect frame */}
            <div className="glass-card p-3 rounded-3xl">
              {/* Replace with your actual image */}
              <div className="aspect-[3/4] bg-gray-200 rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">Your professional photo here</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 glass-card p-3 rounded-xl animate-fade-up animate-delay-300 shadow-lg">
              <div className="flex items-center space-x-2 h-full">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-sm font-medium">Public Works Director</span>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 glass-card p-3 rounded-xl animate-fade-up animate-delay-200 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                <span className="text-sm font-medium">Technology Innovator</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#story" className="flex flex-col items-center text-gray-500 hover:text-primary transition-colors duration-200">
          <span className="text-sm font-medium mb-1">Scroll Down</span>
          <ChevronDown size={20} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
