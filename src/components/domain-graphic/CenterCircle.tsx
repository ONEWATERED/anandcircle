
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
  
  return (
    <motion.div
      className="absolute flex flex-col items-center justify-center z-10"
      style={{
        top: height / 2,
        left: width / 2,
        width: centerSize * 2.5,
        height: centerSize * 2.5,
        marginLeft: -(centerSize * 2.5) / 2,
        marginTop: -(centerSize * 2.5) / 2,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
    >
      <motion.div
        className="rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-primary to-accent shadow-lg p-2 md:p-4"
        style={{
          width: centerSize * 2.5,
          height: centerSize * 2.5,
        }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
      >
        <div 
          className="rounded-full bg-white/20 flex items-center justify-center text-white mb-1 md:mb-2"
          style={{
            width: isVerySmallScreen ? 28 : (centerSize < 50 ? 32 : 48),
            height: isVerySmallScreen ? 28 : (centerSize < 50 ? 32 : 48),
          }}
        >
          <Users size={isVerySmallScreen ? 16 : (centerSize < 50 ? 20 : 28)} />
        </div>
        
        <motion.h3 
          className="text-white font-bold text-center mb-0 md:mb-1"
          style={{
            fontSize: isVerySmallScreen ? '0.65rem' : (centerSize < 50 ? '0.75rem' : '0.9rem')
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
            fontSize: isVerySmallScreen ? '0.5rem' : (centerSize < 50 ? '0.55rem' : '0.65rem'),
            display: centerSize < 45 ? 'none' : 'block'
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
              padding: isVerySmallScreen ? '0.25rem 0.5rem' : '',
              height: isVerySmallScreen ? '1.5rem' : ''
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
