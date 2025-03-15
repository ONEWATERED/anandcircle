
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

  // Connect each node to the center (ANAND Circle)
  domains.forEach((domain, i) => {
    const source = getNodePosition(domain.x, domain.y);
    const dest = getNodePosition(0, 0); // Center point
    
    const key = `${domain.id}-center`;
    const isActive = activeNode === domain.id;
    
    connections.push(
      <motion.path
        key={key}
        d={`M ${source.x} ${source.y} L ${dest.x} ${dest.y}`}
        stroke={isActive ? "rgba(99, 102, 241, 0.9)" : "rgba(209, 213, 219, 0.5)"}
        strokeWidth={isActive ? 3 : 1.5}
        strokeDasharray="5,5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1, 
          opacity: isActive ? 1 : 0.7,
          strokeWidth: isActive ? 3 : 1.5
        }}
        transition={{ 
          duration: 1.5, 
          delay: 0.5 + (i * 0.1),
          ease: "easeInOut"
        }}
      />
    );
  });

  // Make connections between nodes more selective on mobile
  if (!isMobile) {
    // Connect all nodes on desktop for a full web
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
              duration: 1.5, 
              delay: 0.7 + (i * 0.1) + (j * 0.1),
              ease: "easeInOut"
            }}
          />
        );
      });
    });
  } else {
    // On mobile, only connect adjacent nodes to reduce visual clutter
    for (let i = 0; i < domains.length; i++) {
      const domain = domains[i];
      const nextDomain = domains[(i + 1) % domains.length];
      
      const source = getNodePosition(domain.x, domain.y);
      const dest = getNodePosition(nextDomain.x, nextDomain.y);
      
      const key = `${domain.id}-${nextDomain.id}`;
      const isActive = activeNode === domain.id || activeNode === nextDomain.id;
      
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
            duration: 1.5, 
            delay: 0.7 + (i * 0.1),
            ease: "easeInOut"
          }}
        />
      );
    }
  }

  return <>{connections}</>;
};

export default DomainConnections;
