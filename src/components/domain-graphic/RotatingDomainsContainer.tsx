
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
    centerSize,
    containerHeight: calculatedContainerHeight,
    orbitRadius: calculatedOrbitRadius
  } = useNodePositioning();

  // Set animation complete after initial load - faster timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Calculate node positions based on angle
  const getNodePosition = (initialAngle: number) => {
    const radians = (initialAngle * Math.PI) / 180;
    
    return {
      x: width / 2 + Math.sin(radians) * calculatedOrbitRadius,
      y: height / 2 - Math.cos(radians) * calculatedOrbitRadius
    };
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full relative overflow-hidden"
      style={{ height: calculatedContainerHeight }}
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
      {width > 0 && (
        <svg className="absolute top-0 left-0 w-full h-full">
          <DomainConnections
            domains={domains}
            centerX={width / 2}
            centerY={height / 2}
            orbitRadius={calculatedOrbitRadius}
            activeNode={activeNode}
            animationComplete={animationComplete}
            width={width}
            isMobile={isMobile}
          />
        </svg>
      )}
      
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
