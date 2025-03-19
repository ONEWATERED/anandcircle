
import React from 'react';
import InterconnectedDomainsGraphic from './InterconnectedDomainsGraphic';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Users, ExternalLink } from 'lucide-react';

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
    <section id="passions" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="text-center mb-10 md:mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">My Areas of Interest</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary/70 to-secondary/70 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto px-4 text-lg text-slate-700">
            These domains are interconnected, creating a holistic approach to innovation and impact.
          </p>
        </motion.div>
        
        {/* Enhanced Domains Display */}
        <motion.div 
          variants={itemVariants}
          className="mb-16"
        >
          <InterconnectedDomainsGraphic />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="max-w-3xl mx-auto text-center mt-16 bg-white p-8 rounded-xl shadow-md border border-gray-100"
        >
          <h3 className="text-2xl font-semibold text-slate-900 mb-4">Join My One Water Circle</h3>
          <p className="text-slate-700 mb-8">
            Join my circle to explore more about these interconnected domains and how they create meaningful change.
            Connect with like-minded individuals and be part of the solution.
          </p>
          <a href="https://www.circleso.com" target="_blank" rel="noopener noreferrer" className="inline-block">
            <Button className="bg-slate-900 hover:bg-slate-800 shadow-md hover:shadow-lg transition-all duration-300 rounded-lg text-white">
              <Users className="mr-2" size={18} />
              Join One Water Circle
              <ExternalLink className="ml-2" size={16} />
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PassionSection;
