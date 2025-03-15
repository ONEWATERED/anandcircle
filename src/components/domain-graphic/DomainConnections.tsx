
import React from 'react';
import { motion } from 'framer-motion';
import { DomainData } from '@/data/domainData';

interface DomainConnectionsProps {
  domains: DomainData[];
  centerX: number;
  centerY: number;
  orbitRadius: number;
  activeNode: string | null;
  animationComplete: boolean;
  width: number;
  isMobile: boolean;
}

const DomainConnections: React.FC<DomainConnectionsProps> = ({
  domains,
  centerX,
  centerY,
  orbitRadius,
  activeNode,
  animationComplete,
  width,
  isMobile,
}) => {
  if (!animationComplete || width === 0) return null;
  
  const connections: JSX.Element[] = [];
  
  // Faster animations on mobile for better UX
  const animationDuration = isMobile ? 0.8 : 1.2;

  // Calculate position from angle
  const getPosition = (angle: number) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: centerX + Math.sin(radians) * orbitRadius,
      y: centerY - Math.cos(radians) * orbitRadius
    };
  };
  
  // Connect each node to the center with a thinner connection
  domains.forEach((domain, i) => {
    const position = getPosition(domain.initialAngle);
    const isActive = activeNode === domain.id;
    
    connections.push(
      <motion.path
        key={`${domain.id}-center`}
        d={`M ${position.x} ${position.y} L ${centerX} ${centerY}`}
        stroke={isActive ? "rgba(99, 102, 241, 0.9)" : "rgba(209, 213, 219, 0.4)"}
        strokeWidth={isActive ? (isMobile ? 1.5 : 2) : (isMobile ? 0.75 : 1)}
        strokeDasharray={isMobile ? "3,4" : "5,5"}
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1, 
          opacity: isActive ? 0.9 : (isMobile ? 0.5 : 0.6),
          strokeWidth: isActive ? (isMobile ? 1.5 : 2) : (isMobile ? 0.75 : 1)
        }}
        transition={{ 
          duration: animationDuration, 
          delay: 0.2 + (i * (isMobile ? 0.05 : 0.08)),
          ease: "easeInOut"
        }}
      />
    );
  });

  // Connect between adjacent nodes in a circular fashion
  // More visible outer circle connections
  domains.forEach((domain, i) => {
    const nextIndex = (i + 1) % domains.length;
    const nextDomain = domains[nextIndex];
    
    const position = getPosition(domain.initialAngle);
    const nextPosition = getPosition(nextDomain.initialAngle);
    
    const isActive = activeNode === domain.id || activeNode === nextDomain.id;
    
    // Brighter, more visible connections
    connections.push(
      <motion.path
        key={`${domain.id}-to-${nextDomain.id}`}
        d={`M ${position.x} ${position.y} L ${nextPosition.x} ${nextPosition.y}`}
        stroke={isActive ? "rgba(139, 92, 246, 0.95)" : "rgba(150, 150, 240, 0.85)"}
        strokeWidth={isActive ? (isMobile ? 2 : 2.5) : (isMobile ? 1.2 : 1.8)}
        strokeDasharray={isMobile ? "2,3" : "3,4"}
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1, 
          opacity: isActive ? 0.95 : 0.85,
          strokeWidth: isActive ? (isMobile ? 2 : 2.5) : (isMobile ? 1.2 : 1.8)
        }}
        transition={{ 
          duration: animationDuration, 
          delay: 0.3 + (i * 0.07),
          ease: "easeInOut"
        }}
      />
    );
  });

  return <>{connections}</>;
};

export default DomainConnections;
