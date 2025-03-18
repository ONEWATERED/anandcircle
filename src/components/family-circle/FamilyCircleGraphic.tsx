
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FamilyMemberNode from './FamilyMemberNode';
import CircleConnections from './CircleConnections';
import { familyMembers, FamilyMember } from '@/data/familyData';
import { useIsMobile } from '@/hooks/use-mobile';
import FamilyCircleCenter from './FamilyCircleCenter';
import { useNodePositioning } from '@/hooks/use-node-position';

interface FamilyCircleGraphicProps {
  onSelectMember: (member: FamilyMember | null) => void;
  memberImages?: Record<string, string | null>;
}

const FamilyCircleGraphic: React.FC<FamilyCircleGraphicProps> = ({ 
  onSelectMember,
  memberImages = {} 
}) => {
  const [activeMember, setActiveMember] = useState<string | null>(null);
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
  
  // Handle click on a family member node
  const handleNodeClick = (memberId: string) => {
    const clickedMember = familyMembers.find(m => m.id === memberId);
    setActiveMember(prevActive => prevActive === memberId ? null : memberId);
    onSelectMember(clickedMember || null);
  };
  
  // Calculate positions for family members in a circle
  const getNodePosition = (angle: number) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: width / 2 + orbitRadius * Math.cos(radians),
      y: height / 2 + orbitRadius * Math.sin(radians)
    };
  };
  
  return (
    <div 
      id="family-circle-container" 
      ref={containerRef}
      className="relative w-full flex items-center justify-center" 
      style={{ height: containerHeight }}
    >
      {/* Center component */}
      <FamilyCircleCenter 
        centerSize={centerSize} 
        width={width} 
        height={height} 
      />
      
      {/* Connecting lines */}
      <CircleConnections 
        members={familyMembers}
        centerX={width / 2}
        centerY={height / 2}
        orbitRadius={orbitRadius}
        activeMember={activeMember}
        animationComplete={width > 0}
        width={width}
        isMobile={isMobile}
      />
      
      {/* Family Member Nodes */}
      {familyMembers.map((member, index) => {
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
            onNodeClick={handleNodeClick}
            index={index}
            isMobile={isMobile}
            photoUrl={memberImages[member.id] || member.photoUrl}
          />
        );
      })}
    </div>
  );
};

export default FamilyCircleGraphic;
