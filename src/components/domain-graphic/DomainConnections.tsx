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
  
  // Simplified animations
  const animationDuration = isMobile ? 0.5 : 0.8; // Reduced from 0.8/1.2

  // Calculate position from angle
  const getPosition = (angle: number) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: centerX + Math.sin(radians) * orbitRadius,
      y: centerY - Math.cos(radians) * orbitRadius
    };
  };
  
  // Connect each node to the center with a connection line
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
          delay: 0.1 + (i * (isMobile ? 0.02 : 0.03)), // Reduced from 0.2 + 0.05/0.08
          ease: "easeInOut"
        }}
      />
    );
  });

  // Connect adjacent nodes along the circle's circumference - simplified
  domains.forEach((domain, i) => {
    const nextIndex = (i + 1) % domains.length;
    const nextDomain = domains[nextIndex];
    
    const position = getPosition(domain.initialAngle);
    const nextPosition = getPosition(nextDomain.initialAngle);
    
    const isActive = activeNode === domain.id || activeNode === nextDomain.id;
    
    // Create curved connections along the circle's circumference
    const pathData = createArcPath(
      position.x, position.y,
      nextPosition.x, nextPosition.y,
      centerX, centerY,
      orbitRadius * 0.1
    );
    
    connections.push(
      <motion.path
        key={`${domain.id}-to-${nextDomain.id}`}
        d={pathData}
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
          delay: 0.15 + (i * 0.03), // Reduced from 0.3 + 0.07
          ease: "easeInOut"
        }}
      />
    );
  });

  return <>{connections}</>;
};

// Helper function to create a curved arc path between two points
function createArcPath(
  x1: number, y1: number, 
  x2: number, y2: number, 
  centerX: number, centerY: number,
  curveFactor: number
): string {
  // Calculate midpoint
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  
  // Calculate vector from center to midpoint
  const vx = mx - centerX;
  const vy = my - centerY;
  
  // Calculate length of this vector
  const length = Math.sqrt(vx * vx + vy * vy);
  
  // Normalize the vector
  const nvx = vx / length;
  const nvy = vy / length;
  
  // Calculate control point by moving slightly outward from the midpoint
  const cpx = mx + nvx * curveFactor;
  const cpy = my + nvy * curveFactor;
  
  // Create the quadratic curve path
  return `M ${x1} ${y1} Q ${cpx} ${cpy}, ${x2} ${y2}`;
}

export default DomainConnections;
