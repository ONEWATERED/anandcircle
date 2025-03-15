
import React, { useEffect } from 'react';

interface DomainTouchHandlerProps {
  isMobile: boolean;
  setActiveNode: (nodeId: string | null) => void;
}

const DomainTouchHandler: React.FC<DomainTouchHandlerProps> = ({
  isMobile,
  setActiveNode
}) => {
  // Mobile touch handling - clear active node when tapping elsewhere
  useEffect(() => {
    if (!isMobile) return;
    
    const handleTouchStart = (e: TouchEvent) => {
      // Check if the touch is outside any domain node
      const target = e.target as HTMLElement;
      if (!target.closest('[data-domain-node="true"]')) {
        setActiveNode(null);
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart);
    return () => document.removeEventListener('touchstart', handleTouchStart);
  }, [isMobile, setActiveNode]);

  return null; // This is a logic-only component with no visual rendering
};

export default DomainTouchHandler;
