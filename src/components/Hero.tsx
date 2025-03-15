
import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Futuristic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-purple-800/60 to-blue-900/70 z-0"></div>
      
      {/* Abstract geometric shapes for futuristic look */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400/20 to-indigo-500/20 blur-3xl animate-pulse" style={{ animationDuration: '15s' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl animate-pulse" style={{ animationDuration: '20s' }}></div>
      <div className="absolute top-1/3 left-1/5 w-72 h-72 rounded-full bg-gradient-to-r from-cyan-400/10 to-teal-500/10 blur-3xl animate-pulse" style={{ animationDuration: '25s' }}></div>
      
      {/* Digital mesh network effect - small glowing dots */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ 
        backgroundImage: 'radial-gradient(circle at 30px 30px, rgba(120, 120, 255, 0.4) 2px, transparent 0)', 
        backgroundSize: '60px 60px' 
      }}></div>
      
      <div className="section-container z-10 text-center max-w-5xl mx-auto">
        {/* Center aligned content */}
        <div className="space-y-6 animate-fade-up px-4">
          <div className="inline-block glass-dark rounded-full px-4 py-1 text-sm font-medium text-white/90 animate-fade-up animate-delay-100">
            hardeepand.com
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-white text-balance animate-fade-up animate-delay-200 drop-shadow-lg">
            Innovating at the <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-teal-300">Intersection</span>
          </h1>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white text-balance animate-fade-up animate-delay-300 drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">Tech • Health • Community</span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto animate-fade-up animate-delay-400">
            Executive. Innovator. Mentor. Bringing data-driven solutions to public service, health challenges, and community needs.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4 justify-center animate-fade-up animate-delay-500">
            <a 
              href="#story" 
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 shadow-lg hover:shadow-indigo-500/30 focus:shadow-outline focus:outline-none"
            >
              Discover My Story
            </a>
            <a 
              href="#passions" 
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 border border-white/10 shadow-lg"
            >
              Explore My Work
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
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
