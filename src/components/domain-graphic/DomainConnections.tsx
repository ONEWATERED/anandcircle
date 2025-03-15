
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
  
  // Connect each node to the center
  domains.forEach((domain, i) => {
    const position = getPosition(domain.initialAngle);
    const isActive = activeNode === domain.id;
    
    connections.push(
      <motion.path
        key={`${domain.id}-center`}
        d={`M ${position.x} ${position.y} L ${centerX} ${centerY}`}
        stroke={isActive ? "rgba(99, 102, 241, 0.9)" : "rgba(209, 213, 219, 0.5)"}
        strokeWidth={isActive ? (isMobile ? 2 : 3) : (isMobile ? 1 : 1.5)}
        strokeDasharray={isMobile ? "3,4" : "5,5"}
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1, 
          opacity: isActive ? 0.9 : (isMobile ? 0.6 : 0.7),
          strokeWidth: isActive ? (isMobile ? 2 : 3) : (isMobile ? 1 : 1.5)
        }}
        transition={{ 
          duration: animationDuration, 
          delay: 0.2 + (i * (isMobile ? 0.05 : 0.08)),
          ease: "easeInOut"
        }}
      />
    );
  });

  // Connect between adjacent nodes in a pentagon shape
  if (!isMobile || width >= 350) {
    for (let i = 0; i < domains.length; i++) {
      const domain = domains[i];
      const nextDomain = domains[(i + 1) % domains.length];
      
      const pos1 = getPosition(domain.initialAngle);
      const pos2 = getPosition(nextDomain.initialAngle);
      
      const isActive = activeNode === domain.id || activeNode === nextDomain.id;
      
      connections.push(
        <motion.path
          key={`${domain.id}-${nextDomain.id}`}
          d={`M ${pos1.x} ${pos1.y} L ${pos2.x} ${pos2.y}`}
          stroke={isActive ? "rgba(99, 102, 241, 0.7)" : "rgba(209, 213, 219, 0.3)"}
          strokeWidth={isActive ? (isMobile ? 1.5 : 2) : (isMobile ? 0.75 : 1)}
          strokeDasharray={isMobile ? "2,3" : "3,4"}
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: isActive ? 0.8 : 0.4,
            strokeWidth: isActive ? (isMobile ? 1.5 : 2) : (isMobile ? 0.75 : 1)
          }}
          transition={{ 
            duration: animationDuration, 
            delay: 0.4 + (i * 0.08),
            ease: "easeInOut"
          }}
        />
      );
    }
  }

  return <>{connections}</>;
};

export default DomainConnections;
