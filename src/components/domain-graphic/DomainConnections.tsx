
import React from 'react';
import { motion } from 'framer-motion';
import { DomainData } from '@/data/domainData';

interface DomainConnectionsProps {
  domains: DomainData[];
  getNodePosition: (x: number, y: number) => { x: number; y: number };
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
  const animationDuration = isMobile ? 1 : 1.5;
  
  // Connect each node to the center (ANAND Circle)
  domains.forEach((domain, i) => {
    const source = getNodePosition(domain.x, domain.y);
    const dest = getNodePosition(0, 0); // Center point
    
    const key = `${domain.id}-center`;
    const isActive = activeNode === domain.id;
    
    // Thinner lines and faster animations on mobile
    connections.push(
      <motion.path
        key={key}
        d={`M ${source.x} ${source.y} L ${dest.x} ${dest.y}`}
        stroke={isActive ? "rgba(99, 102, 241, 0.8)" : "rgba(209, 213, 219, 0.4)"}
        strokeWidth={isActive ? (isMobile ? 2 : 3) : (isMobile ? 1 : 1.5)}
        strokeDasharray={isMobile ? "3,4" : "5,5"}
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1, 
          opacity: isActive ? 0.9 : (isMobile ? 0.5 : 0.7),
          strokeWidth: isActive ? (isMobile ? 2 : 3) : (isMobile ? 1 : 1.5)
        }}
        transition={{ 
          duration: animationDuration, 
          delay: 0.3 + (i * (isMobile ? 0.05 : 0.1)),
          ease: "easeInOut"
        }}
      />
    );
  });

  // On mobile, only show connections between adjacent nodes to reduce visual clutter
  if (isMobile) {
    // For very small screens, only show connections to center
    if (width < 350) {
      // No additional connections for very small screens
    } else {
      // On larger mobile screens, connect adjacent nodes in a circular pattern
      for (let i = 0; i < domains.length; i++) {
        const domain = domains[i];
        const nextDomain = domains[(i + 1) % domains.length];
        
        const source = getNodePosition(domain.x, domain.y);
        const dest = getNodePosition(nextDomain.x, nextDomain.y);
        
        const key = `${domain.id}-${nextDomain.id}`;
        const isActive = activeNode === domain.id || activeNode === nextDomain.id;
        
        // Thinner, more transparent lines on mobile
        connections.push(
          <motion.path
            key={key}
            d={`M ${source.x} ${source.y} L ${dest.x} ${dest.y}`}
            stroke={isActive ? "rgba(99, 102, 241, 0.7)" : "rgba(209, 213, 219, 0.25)"}
            strokeWidth={isActive ? 1.5 : 0.75}
            strokeDasharray="2,3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: isActive ? 0.8 : 0.4,
              strokeWidth: isActive ? 1.5 : 0.75
            }}
            transition={{ 
              duration: animationDuration, 
              delay: 0.5 + (i * 0.05),
              ease: "easeInOut"
            }}
          />
        );
      }
    }
  } else {
    // On desktop, show a complete web of connections
    domains.forEach((domain, i) => {
      domains.slice(i + 1).forEach((target, j) => {
        const source = getNodePosition(domain.x, domain.y);
        const dest = getNodePosition(target.x, target.y);
        
        const key = `${domain.id}-${target.id}`;
        const isActive = activeNode === domain.id || activeNode === target.id;
        
        connections.push(
          <motion.path
            key={key}
            d={`M ${source.x} ${source.y} L ${dest.x} ${dest.y}`}
            stroke={isActive ? "rgba(99, 102, 241, 0.8)" : "rgba(209, 213, 219, 0.3)"}
            strokeWidth={isActive ? 2 : 1}
            strokeDasharray="3,3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: isActive ? 1 : 0.5,
              strokeWidth: isActive ? 2 : 1
            }}
            transition={{ 
              duration: animationDuration, 
              delay: 0.7 + (i * 0.1) + (j * 0.1),
              ease: "easeInOut"
            }}
          />
        );
      });
    });
  }

  return <>{connections}</>;
};

export default DomainConnections;
