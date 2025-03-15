
import React from 'react';
import { motion } from 'framer-motion';
import { DomainData } from '@/data/domainData';

interface DomainConnectionsProps {
  domains: DomainData[];
  getNodePosition: (angle: number, radius: number) => { x: number; y: number };
  activeNode: string | null;
  animationComplete: boolean;
  width: number;
  isMobile: boolean;
}

const DomainConnections: React.FC<DomainConnectionsProps> = ({
  domains,
  getNodePosition,
  activeNode,
  animationComplete,
  width,
  isMobile,
}) => {
  if (!animationComplete || width === 0) return null;
  
  const connections: JSX.Element[] = [];
  
  // Faster animations on mobile for better UX
  const animationDuration = isMobile ? 0.8 : 1.2;
  
  // Connect each node to the center (ANAND Circle)
  domains.forEach((domain, i) => {
    const source = getNodePosition(domain.initialAngle, 1); // Use the angle and a radius of 1
    const dest = getNodePosition(0, 0); // Center point
    
    const key = `${domain.id}-center`;
    const isActive = activeNode === domain.id;
    
    connections.push(
      <motion.path
        key={key}
        d={`M ${source.x} ${source.y} L ${dest.x} ${dest.y}`}
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
      
      const source = getNodePosition(domain.initialAngle, 1);
      const dest = getNodePosition(nextDomain.initialAngle, 1);
      
      const key = `${domain.id}-${nextDomain.id}`;
      const isActive = activeNode === domain.id || activeNode === nextDomain.id;
      
      connections.push(
        <motion.path
          key={key}
          d={`M ${source.x} ${source.y} L ${dest.x} ${dest.y}`}
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

  // On desktop, add diagonal connections to create a complete web
  if (!isMobile && width >= 768) {
    // Connect non-adjacent nodes to form diagonals of the pentagon
    for (let i = 0; i < domains.length; i++) {
      const domain = domains[i];
      const skipNext = (i + 2) % domains.length; // Skip adjacent, connect to next-but-one
      
      const source = getNodePosition(domain.initialAngle, 1);
      const dest = getNodePosition(domains[skipNext].initialAngle, 1);
      
      const key = `${domain.id}-${domains[skipNext].id}`;
      const isActive = activeNode === domain.id || activeNode === domains[skipNext].id;
      
      connections.push(
        <motion.path
          key={key}
          d={`M ${source.x} ${source.y} L ${dest.x} ${dest.y}`}
          stroke={isActive ? "rgba(99, 102, 241, 0.6)" : "rgba(209, 213, 219, 0.25)"}
          strokeWidth={isActive ? 1.5 : 0.75}
          strokeDasharray="4,5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: isActive ? 0.7 : 0.3,
            strokeWidth: isActive ? 1.5 : 0.75
          }}
          transition={{ 
            duration: animationDuration, 
            delay: 0.6 + (i * 0.1),
            ease: "easeInOut"
          }}
        />
      );
    }
  }

  return <>{connections}</>;
};

export default DomainConnections;
