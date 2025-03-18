
import React from 'react';
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
  
  // Calculate position from angle
  const getPosition = (angle: number) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: centerX + Math.sin(radians) * orbitRadius,
      y: centerY - Math.cos(radians) * orbitRadius
    };
  };
  
  // Connect each node to the center with simple lines
  domains.forEach((domain, i) => {
    const position = getPosition(domain.initialAngle);
    const isActive = activeNode === domain.id;
    
    connections.push(
      <path
        key={`${domain.id}-center`}
        d={`M ${position.x} ${position.y} L ${centerX} ${centerY}`}
        stroke={isActive ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.2)"}
        strokeWidth={isActive ? 1.5 : 0.8}
        fill="none"
      />
    );
  });

  return <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
    {connections}
  </svg>;
};

export default DomainConnections;
