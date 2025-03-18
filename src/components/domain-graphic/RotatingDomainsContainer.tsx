
import React, { useState, useEffect } from 'react';
import { useNodePositioning } from '@/hooks/use-node-position';
import { useIsMobile } from '@/hooks/use-mobile';
import { domains } from '@/data/domainData';
import DomainNode from './DomainNode';
import CenterCircle from './CenterCircle';
import BackgroundParticles from './BackgroundParticles';
import DomainConnections from './DomainConnections';

interface RotatingDomainsContainerProps {
  activeNode: string | null;
  setActiveNode: (nodeId: string | null) => void;
}

const RotatingDomainsContainer: React.FC<RotatingDomainsContainerProps> = ({
  activeNode,
  setActiveNode
}) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const isMobile = useIsMobile();
  const { 
    containerRef, 
    width, 
    height, 
    nodeWidth, 
    nodeIconSize, 
    iconSize, 
    textWidth, 
    centerSize 
  } = useNodePositioning();

  // Adjusted orbit radius based on mobile device size
  const orbitRadius = (() => {
    if (isMobile) {
      // Smaller screens need more compact layout
      if (width < 350) return Math.min(width, height) * 0.32;
      if (width < 500) return Math.min(width, height) * 0.34;
      return Math.min(width, height) * 0.36;
    }
    // Desktop gets more space
    return Math.min(width, height) * 0.38;
  })();

  // Set animation complete after initial load - faster timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 100); // Reduced delay for faster rendering
    
    return () => clearTimeout(timer);
  }, []);

  // Calculate node positions based on angle
  const getNodePosition = (initialAngle: number) => {
    const radians = (initialAngle * Math.PI) / 180;
    
    return {
      x: width / 2 + Math.sin(radians) * orbitRadius,
      y: height / 2 - Math.cos(radians) * orbitRadius
    };
  };

  // Determine appropriate container height based on screen size
  const containerHeight = (() => {
    if (isMobile) {
      if (width < 350) return 400; // Very small screens
      if (width < 500) return 450; // Small screens
      return 480; // Medium screens
    }
    return 600; // Desktop
  })();

  return (
    <div 
      ref={containerRef} 
      className="w-full relative overflow-hidden"
      style={{ height: containerHeight }}
    >
      {/* Simplified background particles */}
      <BackgroundParticles isMobile={isMobile} />
      
      {/* Center Circle */}
      <CenterCircle 
        centerSize={centerSize} 
        width={width} 
        height={height} 
      />
      
      {/* Domain connections */}
      <svg className="absolute top-0 left-0 w-full h-full">
        <DomainConnections
          domains={domains}
          centerX={width / 2}
          centerY={height / 2}
          orbitRadius={orbitRadius}
          activeNode={activeNode}
          animationComplete={animationComplete}
          width={width}
          isMobile={isMobile}
        />
      </svg>
      
      {/* Domain Nodes */}
      <div className="absolute top-0 left-0 w-full h-full">
        {domains.map((domain, index) => {
          // Calculate position
          const position = getNodePosition(domain.initialAngle);
          
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
              rotationEnabled={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RotatingDomainsContainer;
