
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Rocket, Bot, FileText } from 'lucide-react';
import ResumeButton from '@/components/ResumeButton';
import { useIsMobile } from '@/hooks/use-mobile';

const ProfileHeader: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className="w-full max-w-3xl space-y-6 md:space-y-8 text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white text-gradient-tech">
        Hardeep Anand
      </h1>
      
      <h2 className="text-xl md:text-3xl font-medium tracking-tight text-gray-300">
        <span className="text-[#0EA5E9]">Tech</span> • <span className="text-[#9333EA]">Health</span> • <span className="text-[#DB2777]">Community</span>
      </h2>
      
      <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto">
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
          variant="default"
          className="bg-gradient-tech text-white font-medium rounded-xl shadow-neon-cyan hover:shadow-lg hover:scale-105 transition-all duration-300"
          onClick={() => {
            document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <BookOpen className="mr-2 h-5 w-5" />
          My Story
        </Button>
        
        <Button 
          size={isMobile ? "default" : "lg"} 
          variant="default"
          className="bg-gradient-purple-magenta text-white font-medium rounded-xl shadow-neon-purple hover:shadow-lg hover:scale-105 transition-all duration-300"
          onClick={() => {
            document.getElementById('passions')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <Rocket className="mr-2 h-5 w-5" />
          Areas of Interest
        </Button>
        
        <ResumeButton 
          size={isMobile ? "default" : "lg"}
          className="bg-gradient-magenta-gold text-white font-medium rounded-xl shadow-neon-magenta hover:shadow-lg hover:scale-105 transition-all duration-300"
        />
      </motion.div>
      
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Button 
          size={isMobile ? "default" : "lg"} 
          variant="default"
          onClick={() => document.getElementById('digital-avatar')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-gradient-to-r from-[#0EA5E9] to-[#9333EA] text-white font-medium shadow-neon-purple rounded-xl px-6 hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          <Bot className="mr-2 h-5 w-5" />
          <span>Chat with my AI-powered Digital Twin</span>
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ProfileHeader;
