
import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CenterCircleProps {
  centerSize: number;
  width: number;
  height: number;
}

const CenterCircle: React.FC<CenterCircleProps> = ({ centerSize, width, height }) => {
  // Determine if this is a very small mobile screen
  const isVerySmallScreen = width > 0 && width < 350;
  
  // Scale the circle based on screen size - slightly larger on mobile for better visibility
  const scaleFactor = isVerySmallScreen ? 1.2 : 1;
  const circleSize = centerSize * 2.5 * scaleFactor;
  
  return (
    <motion.div
      className="absolute flex flex-col items-center justify-center z-10"
      style={{
        top: height / 2,
        left: width / 2,
        width: circleSize,
        height: circleSize,
        marginLeft: -circleSize / 2,
        marginTop: -circleSize / 2,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
    >
      <motion.div
        className="rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-primary to-accent shadow-lg p-2 md:p-4"
        style={{
          width: circleSize,
          height: circleSize,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)', // Enhanced shadow for depth
        }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
      >
        <div 
          className="rounded-full bg-white/20 flex items-center justify-center text-white mb-1 md:mb-2"
          style={{
            width: isVerySmallScreen ? 32 : (centerSize < 50 ? 36 : 48),
            height: isVerySmallScreen ? 32 : (centerSize < 50 ? 36 : 48),
          }}
        >
          <Users size={isVerySmallScreen ? 18 : (centerSize < 50 ? 22 : 28)} />
        </div>
        
        <motion.h3 
          className="text-white font-bold text-center mb-0 md:mb-1"
          style={{
            fontSize: isVerySmallScreen ? '0.75rem' : (centerSize < 50 ? '0.8rem' : '0.9rem')
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Join The Circle
        </motion.h3>
        
        <motion.p 
          className="text-white/80 text-center mb-1 md:mb-3 max-w-[90%] mx-auto"
          style={{
            fontSize: isVerySmallScreen ? '0.55rem' : (centerSize < 50 ? '0.6rem' : '0.65rem'),
            display: centerSize < 40 ? 'none' : 'block'
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {centerSize < 50 ? 'Connect across domains' : 'Connect with professionals across all domains'}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button 
            size="sm" 
            variant="secondary" 
            className="text-[9px] md:text-xs font-semibold"
            style={{
              padding: isVerySmallScreen ? '0.3rem 0.7rem' : '',
              height: isVerySmallScreen ? '1.7rem' : '',
              minHeight: isVerySmallScreen ? '1.7rem' : '',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Add shadow for better visibility
            }}
          >
            Join Now
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CenterCircle;
