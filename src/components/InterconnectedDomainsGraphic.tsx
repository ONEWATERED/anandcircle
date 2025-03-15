
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import RotatingDomainsContainer from './domain-graphic/RotatingDomainsContainer';
import DomainTouchHandler from './domain-graphic/DomainTouchHandler';

const InterconnectedDomainsGraphic = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className="w-full relative opacity-0 animate-fade-up"
      style={{ 
        animationDelay: '200ms', 
        animationFillMode: 'forwards' 
      }}
    >
      <RotatingDomainsContainer 
        activeNode={activeNode}
        setActiveNode={setActiveNode}
      />
      
      {/* Handle mobile touch events */}
      <DomainTouchHandler 
        isMobile={isMobile}
        setActiveNode={setActiveNode}
      />
    </motion.div>
  );
};

export default InterconnectedDomainsGraphic;
