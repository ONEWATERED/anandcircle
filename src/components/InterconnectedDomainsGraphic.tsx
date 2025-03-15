
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { domains } from '@/data/domainData';
import DomainNode from './domain-graphic/DomainNode';
import CenterCircle from './domain-graphic/CenterCircle';
import BackgroundParticles from './domain-graphic/BackgroundParticles';
import DomainConnections from './domain-graphic/DomainConnections';
import { useIsMobile } from '@/hooks/use-mobile';

const InterconnectedDomainsGraphic = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [rotationAngle, setRotationAngle] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Calculate container dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Force another update after a slight delay to ensure proper rendering
    const timer = setTimeout(updateDimensions, 100);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  // Rotation animation
  useEffect(() => {
    // Allow time for initial animations before starting rotation
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

  // Responsive sizing calculations
  const calculateResponsiveSizes = () => {
    const { width, height } = containerDimensions;
    
    // Default values
    let centerSize = 80;
    let nodeWidth = 60;
    let nodeIconSize = 44;
    let iconSize = 24;
    let textWidth = 'w-16';
    
    // Adjust based on screen size
    if (width < 350) { // Very small screens
      centerSize = 50;
      nodeWidth = 40;
      nodeIconSize = 28;
      iconSize = 16;
      textWidth = 'w-12';
    } else if (width < 500) { // Small screens
      centerSize = 60;
      nodeWidth = 50;
      nodeIconSize = 36;
      iconSize = 20;
      textWidth = 'w-14';
    } else if (width < 768) { // Medium screens
      centerSize = 70;
      nodeWidth = 55;
      nodeIconSize = 40;
      iconSize = 22;
      textWidth = 'w-16';
    } else { // Large screens
      centerSize = 90;
      nodeWidth = 70;
      nodeIconSize = 50;
      iconSize = 26;
      textWidth = 'w-24';
    }
    
    return {
      centerSize,
      nodeWidth,
      nodeIconSize,
      iconSize,
      textWidth
    };
  };

  const { centerSize, nodeWidth, nodeIconSize, iconSize, textWidth } = calculateResponsiveSizes();

  // Calculate container height
  const containerHeight = (() => {
    if (isMobile) {
      if (containerDimensions.width < 350) return 280;
      if (containerDimensions.width < 500) return 320;
      return 380;
    }
    return 550;
  })();

  // Calculate orbit radius based on container size
  const orbitRadius = Math.min(containerDimensions.width, containerDimensions.height) * 0.38;

  // Calculate node positions based on angle and rotation
  const getNodePosition = (initialAngle: number) => {
    const angle = (initialAngle + rotationAngle) % 360;
    const radians = (angle * Math.PI) / 180;
    return {
      x: containerDimensions.width / 2 + Math.sin(radians) * orbitRadius,
      y: containerDimensions.height / 2 - Math.cos(radians) * orbitRadius
    };
  };

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
      className="w-full relative opacity-0 animate-fade-up overflow-hidden"
      style={{ 
        height: containerHeight,
        animationDelay: '200ms', 
        animationFillMode: 'forwards' 
      }}
    >
      {/* Background particles */}
      <BackgroundParticles isMobile={isMobile} />
      
      {/* The HARDEEP ANAND Circle in the center */}
      <CenterCircle 
        centerSize={centerSize} 
        width={containerDimensions.width} 
        height={containerDimensions.height} 
      />
      
      {/* Domain connections */}
      <svg className="absolute top-0 left-0 w-full h-full">
        <DomainConnections
          domains={domains}
          centerX={containerDimensions.width / 2}
          centerY={containerDimensions.height / 2}
          orbitRadius={orbitRadius}
          activeNode={activeNode}
          animationComplete={animationComplete}
          width={containerDimensions.width}
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

export default InterconnectedDomainsGraphic;
