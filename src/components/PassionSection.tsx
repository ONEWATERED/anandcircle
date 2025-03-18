
import React from 'react';
import InterconnectedDomainsGraphic from './InterconnectedDomainsGraphic';
import { motion } from 'framer-motion';

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
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase mb-2">My Domains</h2>
          <h3 className="text-xl md:text-4xl font-display font-bold mb-3 md:mb-4">Areas of Expertise & Innovation</h3>
          <div className="h-1 w-16 md:w-20 bg-primary mx-auto rounded-full"></div>
          <p className="max-w-2xl mx-auto mt-3 md:mt-4 px-4 text-sm md:text-base text-gray-600">
            My work spans five interconnected domains where I drive innovation and deliver measurable impact.
            <a href="#articles" className="text-primary hover:underline ml-1">
              Check out related articles →
            </a>
          </p>
        </motion.div>
        
        {/* Simplified Domains Display */}
        <motion.div 
          variants={itemVariants}
          className="mb-6 md:mb-10"
        >
          <InterconnectedDomainsGraphic />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PassionSection;
