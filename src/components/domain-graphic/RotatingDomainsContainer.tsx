
import React, { useState, useEffect, useRef } from 'react';
import { domains } from '@/data/domainData';
import DomainNode from './DomainNode';
import CenterCircle from './CenterCircle';
import DomainConnections from './DomainConnections';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNodePositioning } from '@/hooks/use-node-position';

interface RotatingDomainsContainerProps {
  activeNode: string | null;
  setActiveNode: (nodeId: string | null) => void;
}

const RotatingDomainsContainer: React.FC<RotatingDomainsContainerProps> = ({ 
  activeNode,
  setActiveNode
}) => {
  const isMobile = useIsMobile();
  const { 
    containerRef, 
    width, 
    height, 
    nodeWidth, 
    nodeIconSize, 
    iconSize, 
    textWidth, 
    centerSize, 
    containerHeight,
    orbitRadius
  } = useNodePositioning();
  
  const [animationComplete, setAnimationComplete] = useState(false);
  const [rotationEnabled, setRotationEnabled] = useState(true);
  const rotationRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  
  // Handle node hover/click
  const handleNodeHover = (nodeId: string | null) => {
    setActiveNode(nodeId);
    
    // Disable auto-rotation when a node is active
    setRotationEnabled(!nodeId);
  };
  
  // Calculate positions for domains in a circle
  const getNodePosition = (angle: number) => {
    const radians = (angle * Math.PI) / 180;
    const adjustedRadius = activeNode ? orbitRadius * 1.05 : orbitRadius;
    return {
      x: width / 2 + adjustedRadius * Math.cos(radians),
      y: height / 2 + adjustedRadius * Math.sin(radians)
    };
  };
  
  // Gentle auto-rotation animation
  useEffect(() => {
    if (!width || !rotationEnabled) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }
    
    const rotateNodes = () => {
      rotationRef.current += 0.1; // Very slow rotation speed
      if (rotationRef.current >= 360) {
        rotationRef.current = 0;
      }
      
      // Request next frame
      animationFrameRef.current = requestAnimationFrame(rotateNodes);
    };
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(rotateNodes);
    
    // Mark animation as complete after a short delay
    setTimeout(() => {
      setAnimationComplete(true);
    }, 500);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [width, rotationEnabled]);
  
  // When user interacts, stop rotation for a while
  useEffect(() => {
    if (activeNode) {
      setRotationEnabled(false);
      
      // Re-enable rotation after delay
      const timer = setTimeout(() => {
        if (!activeNode) {
          setRotationEnabled(true);
        }
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [activeNode]);
  
  if (!width) return <div className="h-64 md:h-96" ref={containerRef} />;
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full mx-auto overflow-visible"
      style={{ height: containerHeight }}
    >
      {/* Center component */}
      <CenterCircle 
        centerSize={centerSize} 
        width={width} 
        height={height} 
      />
      
      {/* Connecting lines */}
      <DomainConnections 
        domains={domains}
        centerX={width / 2}
        centerY={height / 2}
        orbitRadius={orbitRadius}
        activeNode={activeNode}
        animationComplete={animationComplete}
        width={width}
        isMobile={isMobile}
      />
      
      {/* Domain Nodes */}
      {domains.map((domain, index) => {
        // Calculate actual angle by adding the auto-rotation
        const actualAngle = rotationEnabled 
          ? domain.initialAngle + rotationRef.current 
          : domain.initialAngle;
          
        // Calculate position based on the adjusted angle
        const position = getNodePosition(actualAngle);
        
        return (
          <DomainNode
            key={domain.id}
            domain={domain}
            position={position}
            nodeWidth={nodeWidth}
            nodeIconSize={nodeIconSize}
            iconSize={iconSize}
            textWidth={textWidth}
            activeNode={activeNode}
            onNodeHover={handleNodeHover}
            index={index}
            isMobile={isMobile}
            rotationEnabled={rotationEnabled}
          />
        );
      })}
    </div>
  );
};

export default RotatingDomainsContainer;
