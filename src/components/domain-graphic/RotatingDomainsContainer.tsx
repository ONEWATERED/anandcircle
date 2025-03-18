
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
  // Remove rotation animation
  const [rotationAngle, setRotationAngle] = useState(0);
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

  // Increased orbit radius to create more space between center and nodes
  const orbitRadius = Math.min(width, height) * (isMobile ? 0.35 : 0.38);

  // Set animation complete after initial load - faster timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, isMobile ? 300 : 500); // Reduced from 600/1000
    
    return () => clearTimeout(timer);
  }, [isMobile]);

  // Remove continuous rotation effect

  // Calculate node positions based on initial angle only (no rotation)
  const getNodePosition = (initialAngle: number) => {
    const radians = (initialAngle * Math.PI) / 180;
    
    return {
      x: width / 2 + Math.sin(radians) * orbitRadius,
      y: height / 2 - Math.cos(radians) * orbitRadius
    };
  };

  // Increase container height to provide more space
  const containerHeight = (() => {
    if (isMobile) {
      if (width < 350) return 500;
      if (width < 500) return 520;
      return 550;
    }
    return 600;
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
      
      {/* Domain connections - simplified */}
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
      
      {/* Static Domain Nodes */}
      <div className="absolute top-0 left-0 w-full h-full">
        {domains.map((domain, index) => {
          // Calculate static position
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
              rotationEnabled={false} // Disable rotation
            />
          );
        })}
      </div>
    </div>
  );
};

export default RotatingDomainsContainer;
