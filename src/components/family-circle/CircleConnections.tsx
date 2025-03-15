
import React from 'react';
import { motion } from 'framer-motion';
import { FamilyMember } from '@/data/familyData';

interface CircleConnectionsProps {
  members: FamilyMember[];
  centerX: number;
  centerY: number;
  orbitRadius: number;
  activeMember: string | null;
  animationComplete: boolean;
  width: number;
  isMobile: boolean;
}

const CircleConnections: React.FC<CircleConnectionsProps> = ({
  members,
  centerX,
  centerY,
  orbitRadius,
  activeMember,
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
  
  // Connect each member to the center
  members.forEach((member, i) => {
    const position = getPosition(member.initialAngle);
    const isActive = activeMember === member.id;
    
    connections.push(
      <motion.path
        key={`${member.id}-center`}
        d={`M ${position.x} ${position.y} L ${centerX} ${centerY}`}
        stroke={isActive ? member.color : "rgba(209, 213, 219, 0.4)"}
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

  // Connect adjacent members along the circle's circumference
  members.forEach((member, i) => {
    const nextIndex = (i + 1) % members.length;
    const nextMember = members[nextIndex];
    
    const position = getPosition(member.initialAngle);
    const nextPosition = getPosition(nextMember.initialAngle);
    
    const isActive = activeMember === member.id || activeMember === nextMember.id;
    
    const pathData = createArcPath(
      position.x, position.y,
      nextPosition.x, nextPosition.y,
      centerX, centerY,
      orbitRadius * 0.1
    );
    
    connections.push(
      <motion.path
        key={`${member.id}-to-${nextMember.id}`}
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
          delay: 0.3 + (i * 0.07),
          ease: "easeInOut"
        }}
      />
    );
  });

  return (
    <svg 
      width="100%" 
      height="100%" 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      {connections}
    </svg>
  );
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

export default CircleConnections;
