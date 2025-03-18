
import React from 'react';
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
  
  // Calculate position from angle
  const getPosition = (angle: number) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: centerX + Math.sin(radians) * orbitRadius,
      y: centerY - Math.cos(radians) * orbitRadius
    };
  };
  
  // Connect each member to the center with simple lines
  members.forEach((member, i) => {
    const position = getPosition(member.initialAngle);
    const isActive = activeMember === member.id;
    
    connections.push(
      <path
        key={`${member.id}-center`}
        d={`M ${position.x} ${position.y} L ${centerX} ${centerY}`}
        stroke={isActive ? "#333333" : "#CCCCCC"}
        strokeWidth={isActive ? 1.5 : 0.8}
        strokeDasharray="3,3"
        fill="none"
      />
    );
  });

  // Connect adjacent members along the circle with simple lines
  members.forEach((member, i) => {
    const nextIndex = (i + 1) % members.length;
    const nextMember = members[nextIndex];
    
    const position = getPosition(member.initialAngle);
    const nextPosition = getPosition(nextMember.initialAngle);
    
    connections.push(
      <path
        key={`${member.id}-to-${nextMember.id}`}
        d={`M ${position.x} ${position.y} L ${nextPosition.x} ${nextPosition.y}`}
        stroke="#CCCCCC"
        strokeWidth={0.8}
        strokeDasharray="2,2"
        fill="none"
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

export default CircleConnections;
