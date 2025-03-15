
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

  // Orbit radius calculation - use a consistent percentage of the smaller dimension
  const orbitRadius = Math.min(width, height) * 0.38;

  // Set animation complete after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, isMobile ? 600 : 1000);
    
    return () => clearTimeout(timer);
  }, [isMobile]);

  // Continuous rotation effect
  useEffect(() => {
    if (!animationComplete) return;
    
    const rotationSpeed = 0.01; // degrees per millisecond (slow rotation)
    const rotationInterval = 20; // update every 20ms for smooth animation
    
    const rotationTimer = setInterval(() => {
      setRotationAngle(angle => (angle + rotationSpeed * rotationInterval) % 360);
    }, rotationInterval);
    
    return () => clearInterval(rotationTimer);
  }, [animationComplete]);

  // Calculate node positions based on angle and rotation
  const getNodePosition = (initialAngle: number) => {
    const angle = (initialAngle + rotationAngle) % 360;
    const radians = (angle * Math.PI) / 180;
    
    // Use trigonometry to position nodes in a perfect circle
    return {
      x: width / 2 + Math.sin(radians) * orbitRadius,
      y: height / 2 - Math.cos(radians) * orbitRadius
    };
  };

  // Calculate container height
  const containerHeight = (() => {
    if (isMobile) {
      if (width < 350) return 280;
      if (width < 500) return 320;
      return 380;
    }
    return 550;
  })();

  return (
    <div 
      ref={containerRef} 
      className="w-full relative overflow-hidden"
      style={{ height: containerHeight }}
    >
      {/* Background particles */}
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
      
      {/* Rotating Domain Nodes */}
      <div className="absolute top-0 left-0 w-full h-full">
        {domains.map((domain, index) => {
          // Calculate position on the orbit
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
              rotationEnabled={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RotatingDomainsContainer;
