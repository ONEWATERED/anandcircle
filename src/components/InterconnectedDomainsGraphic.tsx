
import React, { useState, useEffect } from 'react';
import { domains } from '@/data/domainData';
import { useNodePositioning } from '@/hooks/use-node-position';
import DomainNode from './domain-graphic/DomainNode';
import CenterCircle from './domain-graphic/CenterCircle';
import DomainConnections from './domain-graphic/DomainConnections';
import BackgroundParticles from './domain-graphic/BackgroundParticles';

const InterconnectedDomainsGraphic = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  const {
    containerRef,
    width,
    height,
    getNodePosition,
    centerSize,
    nodeSize,
    iconSize,
    nodeWidth,
    nodeIconSize,
    textWidth,
    containerHeight,
    isMobile,
  } = useNodePositioning();

  // Main component animation sequence
  useEffect(() => {
    // Allow time for initial animations before showing connections
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

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
  }, [isMobile]);

  return (
    <div 
      ref={containerRef} 
      className="w-full relative opacity-0 animate-fade-up"
      style={{ 
        height: containerHeight,
        animationDelay: '200ms', 
        animationFillMode: 'forwards' 
      }}
    >
      {/* SVG for connections */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <DomainConnections
          domains={domains}
          getNodePosition={getNodePosition}
          activeNode={activeNode}
          animationComplete={animationComplete}
          width={width}
          isMobile={isMobile}
        />
      </svg>
      
      {/* The ANAND Circle in the center */}
      <CenterCircle centerSize={centerSize} width={width} />
      
      {/* Domain Nodes */}
      {domains.map((domain, index) => {
        const position = getNodePosition(domain.x, domain.y);
        
        return (
          <DomainNode
            key={domain.id}
            domain={domain}
            position={position}
            nodeWidth={nodeWidth}
            nodeIconSize={nodeIconSize}
            iconSize={iconSize}
            textWidth={textWidth}
            activeNode={activeNode}
            onNodeHover={setActiveNode}
            index={index}
            isMobile={isMobile}
          />
        );
      })}
      
      {/* Background particles */}
      <BackgroundParticles isMobile={isMobile} />
    </div>
  );
};

export default InterconnectedDomainsGraphic;
