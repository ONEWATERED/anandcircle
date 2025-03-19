
import React from 'react';
import InterconnectedDomainsGraphic from './InterconnectedDomainsGraphic';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Users } from 'lucide-react';

const PassionSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  return (
    <section id="passions" className="py-6 md:py-16">
      <motion.div 
        className="section-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="text-center mb-4 md:mb-8"
          variants={itemVariants}
        >
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase mb-2">Areas of Interest</h2>
          <h3 className="text-xl md:text-4xl font-display font-bold mb-3 md:mb-4">My Areas of Interest</h3>
          <div className="h-1 w-16 md:w-20 bg-primary mx-auto rounded-full"></div>
          <p className="max-w-2xl mx-auto mt-3 md:mt-4 px-4 text-sm md:text-base text-gray-600">
            These domains are interconnected, creating a holistic approach to innovation and impact.
          </p>
        </motion.div>
        
        {/* Simplified Domains Display */}
        <motion.div 
          variants={itemVariants}
          className="mb-6 md:mb-10"
        >
          <InterconnectedDomainsGraphic />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center mt-8"
        >
          <p className="max-w-2xl mx-auto px-4 text-sm md:text-base text-gray-600 mb-6">
            Join my circle to explore more about these interconnected domains and how they create meaningful change.
          </p>
          <a href="https://www.circleso.com" target="_blank" rel="noopener noreferrer">
            <Button className="bg-gray-800 hover:bg-gray-700">
              <Users className="mr-2" size={16} />
              Join One Water Circle
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PassionSection;
