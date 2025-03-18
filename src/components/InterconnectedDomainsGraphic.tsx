
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import RotatingDomainsContainer from './domain-graphic/RotatingDomainsContainer';
import DomainTouchHandler from './domain-graphic/DomainTouchHandler';

const InterconnectedDomainsGraphic = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full relative">
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
  );
};

export default InterconnectedDomainsGraphic;
