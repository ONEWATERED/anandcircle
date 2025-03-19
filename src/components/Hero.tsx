
import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import ResumeButton from './ResumeButton';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <section 
      id="home" 
      className="relative w-full flex items-center min-h-[90vh] pt-20 md:pt-24 pb-12 md:pb-16 overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-8 md:gap-12">
        {/* Hero content column - centered */}
        <motion.div 
          className="w-full max-w-3xl space-y-6 md:space-y-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-slate-900">
            Innovating at the Intersection
          </h1>
          
          <h2 className="text-xl md:text-3xl font-medium tracking-tight text-slate-700">
            <span className="text-primary">Tech</span> • <span className="text-primary">Health</span> • <span className="text-primary">Community</span>
          </h2>
          
          <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto">
            Executive. Innovator. Mentor. Bringing data-driven solutions to public service, 
            health challenges, and community needs.
          </p>
          
          <motion.div 
            className="flex flex-wrap gap-4 pt-6 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button 
              size={isMobile ? "default" : "lg"} 
              className="bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base rounded-lg"
              onClick={() => {
                document.getElementById('profile-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Meet Hardeep
              <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <Button 
              size={isMobile ? "default" : "lg"} 
              variant="outline" 
              className="border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-slate-400 transition-all duration-300 text-sm md:text-base rounded-lg"
            >
              Explore My Work
            </Button>
            
            <ResumeButton 
              variant="outline" 
              size={isMobile ? "default" : "lg"}
              className="border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-slate-400 transition-all duration-300 text-sm md:text-base rounded-lg"
            />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <a 
          href="#profile-section" 
          className="flex flex-col items-center text-slate-500 hover:text-slate-900 transition-colors"
        >
          <span className="text-xs md:text-sm font-medium mb-2 tracking-wider">EXPLORE</span>
          <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center animate-bounce">
            <ChevronDown className="h-5 w-5" />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
