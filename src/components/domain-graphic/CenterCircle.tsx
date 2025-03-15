
import React from 'react';
import { motion } from 'framer-motion';

interface CenterCircleProps {
  centerSize: number;
  width: number;
}

const CenterCircle: React.FC<CenterCircleProps> = ({ centerSize, width }) => {
  // Determine font sizes based on available space
  const titleFontSize = width < 350 ? 'text-2xs' : width < 500 ? 'text-xs' : 'text-sm md:text-xl';
  const subtitleFontSize = width < 350 ? 'text-3xs' : width < 500 ? 'text-2xs' : 'text-xs md:text-sm';

  // Adjust pulse ring size for better mobile appearance
  const pulseRingSize = centerSize + (width < 350 ? 6 : width < 768 ? 8 : 20);

  return (
    <>
      {/* The Circle for ANAND */}
      <motion.div 
        className="absolute z-10 rounded-full bg-gradient-to-r from-primary/80 to-accent/80 flex items-center justify-center text-white shadow-lg"
        style={{ 
          top: '50%', 
          left: '50%', 
          width: centerSize, 
          height: centerSize,
          transform: 'translate(-50%, -50%)'
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
        whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)' }}
      >
        <div className="text-center">
          <div className={`${titleFontSize} font-bold tracking-tight`}>HARDEEP</div>
          <div className={`${subtitleFontSize} font-medium mt-0.5`}>ANAND Circle</div>
        </div>
      </motion.div>
      
      {/* Pulsing ring around center - smaller on mobile */}
      <motion.div
        className="absolute rounded-full border-2 border-primary/20"
        style={{ 
          top: '50%', 
          left: '50%', 
          width: pulseRingSize, 
          height: pulseRingSize,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
    </>
  );
};

export default CenterCircle;
