
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import RotatingDomainsContainer from './domain-graphic/RotatingDomainsContainer';
import DomainTouchHandler from './domain-graphic/DomainTouchHandler';
import { motion } from 'framer-motion';

const InterconnectedDomainsGraphic = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Reset active node when switching between mobile and desktop
  useEffect(() => {
    setActiveNode(null);
  }, [isMobile]);
  
  return (
    <motion.div 
      className="w-full relative max-w-[900px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative z-[5]">
        <RotatingDomainsContainer 
          activeNode={activeNode}
          setActiveNode={setActiveNode}
        />
        
        {/* Handle mobile touch events */}
        <DomainTouchHandler 
          isMobile={isMobile}
          setActiveNode={setActiveNode}
        />
      </div>
    </motion.div>
  );
};

export default InterconnectedDomainsGraphic;
