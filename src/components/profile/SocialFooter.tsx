
import React from 'react';
import { motion } from 'framer-motion';
import SocialMediaLinks from './SocialMediaLinks';

interface SocialFooterProps {
  socialLinks: {
    linkedIn: string;
    twitter: string;
    youtube: string;
    anandCircle: string;
  };
  isLoading: boolean;
}

const SocialFooter: React.FC<SocialFooterProps> = ({ socialLinks, isLoading }) => {
  return (
    <motion.div 
      className="flex-1 space-y-6 text-center text-white max-w-5xl mx-auto mt-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="h-1 w-20 md:w-32 bg-gradient-tech mx-auto my-6 rounded-full"></div>
      
      <p className="text-gray-100 text-lg max-w-2xl mx-auto">
        Connect with me on social platforms to explore collaborations and stay updated on my latest initiatives.
      </p>
      
      {!isLoading && (
        <div className="pt-6">
          <SocialMediaLinks 
            links={socialLinks} 
            iconColor="text-white" 
            hoverColor="hover:text-[#0EA5E9]" 
          />
        </div>
      )}
    </motion.div>
  );
};

export default SocialFooter;
