
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
  const [flowOffset, setFlowOffset] = useState(0);
  
  // Animate connections
  useEffect(() => {
    if (animationComplete) {
      // Fade in the connections
      setOpacity(1);
      
      // Animate the flow
      const interval = setInterval(() => {
        setFlowOffset(prev => (prev + 1) % 16);
      }, 100);
      
      return () => clearInterval(interval);
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
          stroke={isActive ? "rgba(14, 165, 233, 0.6)" : "rgba(14, 165, 233, 0.2)"}
          strokeWidth={isActive ? 1.5 : 0.8}
          strokeDasharray={isActive ? "none" : "3,3"}
          strokeDashoffset={flowOffset}
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
                stroke="rgba(14, 165, 233, 0.3)"
                strokeWidth={0.8}
                strokeDasharray="2,4"
                fill="none"
                style={{
                  animation: "fadeIn 0.3s ease-in-out forwards"
                }}
              />
            );
          }
        });
      }
    });
    
    return connections;
  };
  
  // Create pulse effects at the center
  const renderPulse = () => {
    return (
      <circle
        cx={centerX}
        cy={centerY}
        r={12}
        fill="rgba(14, 165, 233, 0.1)"
        style={{
          animation: "pulse-soft 2s infinite ease-in-out"
        }}
      />
    );
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
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Pulse at center */}
      {renderPulse()}
      
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
            fill={isActive ? "rgba(14, 165, 233, 0.8)" : "rgba(14, 165, 233, 0.3)"}
            filter={isActive ? "url(#glow)" : "none"}
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
