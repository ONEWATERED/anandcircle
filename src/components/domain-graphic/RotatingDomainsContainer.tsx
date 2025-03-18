
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
    orbitRadius: calculatedOrbitRadius,
    isIOS,
  } = useNodePositioning();

  // Set animation complete after initial load - faster timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Calculate node positions based on angle with special handling for iOS
  const getNodePosition = (initialAngle: number) => {
    const radians = (initialAngle * Math.PI) / 180;
    
    return {
      x: width / 2 + Math.sin(radians) * calculatedOrbitRadius,
      y: height / 2 - Math.cos(radians) * calculatedOrbitRadius
    };
  };

  // Calculate adjusted angles for better mobile layout - with specific iOS adjustments
  const getAdjustedDomains = () => {
    // iOS-specific adjustments
    if (isIOS && width < 390) {
      return domains.map(domain => {
        // Create a copy to avoid mutating the original
        const adjustedDomain = { ...domain };
        
        // Adjust angles for better iOS spacing on small screens
        if (domain.id === 'family') {
          adjustedDomain.initialAngle = 0; // Top position
        } else if (domain.id === 'health') {
          adjustedDomain.initialAngle = 72; // Adjusted for iOS
        } else if (domain.id === 'water') {
          adjustedDomain.initialAngle = 144; // Adjusted for iOS
        } else if (domain.id === 'ai') {
          adjustedDomain.initialAngle = 216; // Adjusted for iOS
        } else if (domain.id === 'mentoring') {
          adjustedDomain.initialAngle = 288; // Adjusted for iOS
        }
        
        return adjustedDomain;
      });
    }
    // On other mobile devices
    else if (isMobile && width < 370) {
      return domains.map(domain => {
        // Create a copy to avoid mutating the original
        const adjustedDomain = { ...domain };
        
        // Adjust angles for better spacing on very small screens
        if (domain.id === 'family') {
          adjustedDomain.initialAngle = 0; // Top position
        } else if (domain.id === 'health') {
          adjustedDomain.initialAngle = 65; // Slightly tighter spacing
        } else if (domain.id === 'water') {
          adjustedDomain.initialAngle = 135; // Adjusted for small screens
        } else if (domain.id === 'ai') {
          adjustedDomain.initialAngle = 225; // Adjusted for small screens
        } else if (domain.id === 'mentoring') {
          adjustedDomain.initialAngle = 295; // Slightly tighter spacing
        }
        
        return adjustedDomain;
      });
    }
    
    // No adjustments needed for larger screens
    return domains;
  };

  const displayDomains = getAdjustedDomains();

  return (
    <div 
      ref={containerRef} 
      className="w-full relative overflow-hidden"
      style={{ 
        height: calculatedContainerHeight,
        // Add a minimum height to ensure display on iOS
        minHeight: isMobile ? '350px' : '500px'
      }}
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
      {width > 0 && (
        <svg className="absolute top-0 left-0 w-full h-full">
          <DomainConnections
            domains={displayDomains}
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
        {displayDomains.map((domain, index) => {
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
