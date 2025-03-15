
import React, { useState, useEffect } from 'react';
import { useNodePositioning } from '@/hooks/use-node-position';
import { useIsMobile } from '@/hooks/use-mobile';
import FamilyCircleCenter from './FamilyCircleCenter';
import FamilyMemberNode from './FamilyMemberNode';
import CircleConnections from './CircleConnections';
import { motion } from 'framer-motion';
import { FamilyMember, familyMembers } from '@/data/familyData';

interface FamilyCircleGraphicProps {
  onSelectMember: (member: FamilyMember | null) => void;
}

const FamilyCircleGraphic: React.FC<FamilyCircleGraphicProps> = ({ onSelectMember }) => {
  const [activeMember, setActiveMember] = useState<string | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const isMobile = useIsMobile();
  
  const { 
    containerRef, 
    width, 
    height, 
    nodeWidth, 
    nodeIconSize, 
    iconSize, 
    textWidth, 
    centerSize 
  } = useNodePositioning();

  // Calculate orbit radius for the family members circle
  const orbitRadius = Math.min(width, height) * (isMobile ? 0.35 : 0.38);

  // Set animation complete after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, isMobile ? 600 : 1000);
    
    return () => clearTimeout(timer);
  }, [isMobile]);

  // Continuous rotation effect
  useEffect(() => {
    if (!animationComplete) return;
    
    const rotationSpeed = 0.006; // degrees per millisecond (slow rotation)
    const rotationInterval = 20; // update every 20ms for smooth animation
    
    const rotationTimer = setInterval(() => {
      setRotationAngle(angle => (angle + rotationSpeed * rotationInterval) % 360);
    }, rotationInterval);
    
    return () => clearInterval(rotationTimer);
  }, [animationComplete]);

  // Calculate node positions based on angle and rotation
  const getNodePosition = (initialAngle: number) => {
    const angle = (initialAngle + rotationAngle) % 360;
    const radians = (angle * Math.PI) / 180;
    
    // Use trigonometry to position nodes in a perfect circle
    return {
      x: width / 2 + Math.sin(radians) * orbitRadius,
      y: height / 2 - Math.cos(radians) * orbitRadius
    };
  };
  
  // Handle member selection
  const handleMemberClick = (memberId: string) => {
    const member = familyMembers.find(m => m.id === memberId) || null;
    setActiveMember(memberId);
    onSelectMember(member);
  };

  const containerHeight = isMobile ? 550 : 600;

  return (
    <motion.div 
      ref={containerRef} 
      className="w-full relative overflow-hidden"
      style={{ 
        height: containerHeight,
        opacity: 0,
        animationDelay: '200ms',
        animationFillMode: 'forwards'
      }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
      
      {/* Center circle with your photo */}
      <FamilyCircleCenter
        centerSize={centerSize} 
        width={width} 
        height={height}
      />
      
      {/* Family member connections */}
      <svg className="absolute top-0 left-0 w-full h-full">
        <CircleConnections
          members={familyMembers}
          centerX={width / 2}
          centerY={height / 2}
          orbitRadius={orbitRadius}
          activeMember={activeMember}
          animationComplete={animationComplete}
          width={width}
          isMobile={isMobile}
        />
      </svg>
      
      {/* Rotating Family Members */}
      <div className="absolute top-0 left-0 w-full h-full">
        {familyMembers.map((member, index) => {
          // Calculate position on the orbit with equal spacing
          const position = getNodePosition(member.initialAngle);
          
          return (
            <FamilyMemberNode
              key={member.id}
              member={member}
              position={position}
              nodeWidth={nodeWidth}
              nodeIconSize={nodeIconSize}
              iconSize={iconSize}
              textWidth={textWidth}
              activeMember={activeMember}
              onNodeClick={handleMemberClick}
              index={index}
              isMobile={isMobile}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default FamilyCircleGraphic;
