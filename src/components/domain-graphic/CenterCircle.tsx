
import React from 'react';
import { motion } from 'framer-motion';

interface CenterCircleProps {
  centerSize: number;
  width: number;
}

const CenterCircle: React.FC<CenterCircleProps> = ({ centerSize, width }) => {
  // Determine font sizes based on available space
  const titleFontSize = width < 350 ? 'text-xs' : width < 500 ? 'text-sm' : 'text-base md:text-xl';
  const subtitleFontSize = width < 350 ? 'text-2xs' : width < 500 ? 'text-xs' : 'text-sm md:text-base';

  // Adjust pulse ring size for better appearance
  const pulseRingSize = centerSize + (width < 350 ? 10 : width < 768 ? 15 : 25);
  
  // Add a second larger pulse ring for enhanced visual effect
  const outerPulseRingSize = pulseRingSize + (width < 350 ? 10 : width < 768 ? 15 : 25);

  return (
    <>
      {/* The Circle for HARDEEP ANAND */}
      <motion.div 
        className="absolute z-10 rounded-full bg-gradient-to-r from-primary/90 to-accent/90 flex items-center justify-center text-white shadow-lg"
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
        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99, 102, 241, 0.6)' }}
      >
        <div className="text-center">
          <div className={`${titleFontSize} font-bold tracking-tight`}>HARDEEP</div>
          <div className={`${subtitleFontSize} font-medium mt-0.5`}>ANAND Circle</div>
        </div>
      </motion.div>
      
      {/* Inner pulsing ring */}
      <motion.div
        className="absolute rounded-full border-2 border-primary/30"
        style={{ 
          top: '50%', 
          left: '50%', 
          width: pulseRingSize, 
          height: pulseRingSize,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
      
      {/* Outer pulsing ring */}
      <motion.div
        className="absolute rounded-full border border-primary/20"
        style={{ 
          top: '50%', 
          left: '50%', 
          width: outerPulseRingSize, 
          height: outerPulseRingSize,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          delay: 0.5
        }}
      />
    </>
  );
};

export default CenterCircle;
