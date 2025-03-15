
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { domains } from '@/data/domainData';
import { useNodePositioning } from '@/hooks/use-node-position';
import DomainNode from './domain-graphic/DomainNode';
import CenterCircle from './domain-graphic/CenterCircle';
import BackgroundParticles from './domain-graphic/BackgroundParticles';
import DomainConnections from './domain-graphic/DomainConnections';

const InterconnectedDomainsGraphic = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  const {
    containerRef,
    width,
    height,
    centerSize,
    nodeWidth,
    nodeIconSize,
    iconSize,
    textWidth,
    containerHeight,
    isMobile,
  } = useNodePositioning();

  // Calculate node positions based on angle and radius
  const getNodePosition = (angle: number, radius: number) => {
    const radians = (angle * Math.PI) / 180;
    const x = Math.sin(radians) * radius;
    const y = -Math.cos(radians) * radius;
    return {
      x: width / 2 + x,
      y: height / 2 + y
    };
  };

  // Main component animation sequence - faster on mobile
  useEffect(() => {
    // Allow time for initial animations before showing connections
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, isMobile ? 600 : 1000);
    
    return () => clearTimeout(timer);
  }, [isMobile]);

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

  // Calculate orbit radius based on container size
  const orbitRadius = Math.min(width, height) * 0.38;

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
      {/* The ANAND Circle in the center */}
      <CenterCircle centerSize={centerSize} width={width} />
      
      {/* Static Domain Nodes */}
      <div className="absolute top-0 left-0 w-full h-full">
        {domains.map((domain, index) => {
          // Calculate position on the orbit
          const position = getNodePosition(domain.initialAngle, orbitRadius);
          
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
              rotateCorrection={false}
            />
          );
        })}
      </div>
      
      {/* Domain connections */}
      <svg className="absolute top-0 left-0 w-full h-full">
        <DomainConnections
          domains={domains}
          getNodePosition={(angle, radius) => getNodePosition(angle, radius * orbitRadius)}
          activeNode={activeNode}
          animationComplete={animationComplete}
          width={width}
          isMobile={isMobile}
        />
      </svg>
      
      {/* Background particles */}
      <BackgroundParticles isMobile={isMobile} />
    </div>
  );
};

export default InterconnectedDomainsGraphic;
