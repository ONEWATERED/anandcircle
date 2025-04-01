
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const ScrollPrompt: React.FC = () => {
  return (
    <motion.div 
      className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <a 
        href="#story" 
        className="flex flex-col items-center text-gray-400 hover:text-white transition-colors"
      >
        <span className="text-xs md:text-sm font-medium mb-2 tracking-wider">EXPLORE</span>
        <div className="w-10 h-10 rounded-full border border-[#0EA5E9]/30 flex items-center justify-center animate-bounce bg-[#0EA5E9]/20 shadow-neon-cyan">
          <ArrowDown className="h-5 w-5" />
        </div>
      </a>
    </motion.div>
  );
};

export default ScrollPrompt;
