
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import RotatingDomainsContainer from './domain-graphic/RotatingDomainsContainer';
import DomainTouchHandler from './domain-graphic/DomainTouchHandler';

const InterconnectedDomainsGraphic = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Reset active node when switching between mobile and desktop
  useEffect(() => {
    setActiveNode(null);
  }, [isMobile]);
  
  return (
    <div className="w-full relative max-w-[900px] mx-auto">
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
    </div>
  );
};

export default InterconnectedDomainsGraphic;
