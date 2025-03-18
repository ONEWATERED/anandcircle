
import React, { useEffect, useState } from 'react';
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
  // Animation states
  const [opacity, setOpacity] = useState(0);
  
  // Animate connections
  useEffect(() => {
    if (animationComplete) {
      // Fade in the connections
      setOpacity(1);
    }
  }, [animationComplete]);
  
  if (!animationComplete || width === 0) return null;
  
  // Calculate position from angle
  const getPosition = (angle: number) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: centerX + orbitRadius * Math.cos(radians),
      y: centerY + orbitRadius * Math.sin(radians)
    };
  };
  
  // Create connections
  const renderConnections = () => {
    const connections: JSX.Element[] = [];
    
    // First connect each node to the center
    domains.forEach((domain, i) => {
      const position = getPosition(domain.initialAngle);
      const isActive = activeNode === domain.id;
      
      // Create a path from the node to the center
      connections.push(
        <path
          key={`${domain.id}-center`}
          d={`M ${position.x} ${position.y} L ${centerX} ${centerY}`}
          stroke={isActive ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.2)"}
          strokeWidth={isActive ? 1.5 : 0.8}
          strokeDasharray={isActive ? "none" : "3,3"}
          fill="none"
          style={{
            transition: "stroke 0.3s ease, stroke-width 0.3s ease",
          }}
        />
      );
      
      // If a node is active, connect it to other nodes
      if (isActive && !isMobile) {
        domains.forEach((otherDomain, j) => {
          if (domain.id !== otherDomain.id) {
            const otherPosition = getPosition(otherDomain.initialAngle);
            connections.push(
              <path
                key={`${domain.id}-${otherDomain.id}`}
                d={`M ${position.x} ${position.y} Q ${centerX} ${centerY} ${otherPosition.x} ${otherPosition.y}`}
                stroke="rgba(0, 0, 0, 0.3)"
                strokeWidth={0.8}
                strokeDasharray="2,4"
                fill="none"
                style={{
                  transition: "opacity 0.3s ease-in-out"
                }}
              />
            );
          }
        });
      }
    });
    
    return connections;
  };
  
  return (
    <svg 
      width="100%" 
      height="100%" 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        pointerEvents: 'none',
        opacity,
        transition: "opacity 1s ease"
      }}
    >
      {/* Connection lines */}
      {renderConnections()}
      
      {/* Dots at node positions */}
      {domains.map((domain) => {
        const position = getPosition(domain.initialAngle);
        const isActive = activeNode === domain.id;
        
        return (
          <circle
            key={`${domain.id}-dot`}
            cx={position.x}
            cy={position.y}
            r={isActive ? 4 : 3}
            fill={isActive ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)"}
            style={{
              transition: "fill 0.3s ease, r 0.3s ease",
            }}
          />
        );
      })}
    </svg>
  );
};

export default DomainConnections;
