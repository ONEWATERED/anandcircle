
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
        className="rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-primary to-accent shadow-lg p-4"
        style={{
          width: centerSize * 2.5,
          height: centerSize * 2.5,
        }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
      >
        <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-white text-3xl font-bold mb-2">
          <Users size={32} />
        </div>
        
        <motion.h3 
          className="text-white font-bold text-center mb-1 text-sm md:text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Join The Circle
        </motion.h3>
        
        <motion.p 
          className="text-white/80 text-center mb-3 text-3xs md:text-xs max-w-[90%] mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Connect with professionals across all domains
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button 
            size="sm" 
            variant="secondary" 
            className="text-2xs md:text-xs font-semibold"
          >
            Join Now
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CenterCircle;
