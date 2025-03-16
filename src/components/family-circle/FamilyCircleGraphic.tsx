
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FamilyMemberNode from './FamilyMemberNode';
import CircleConnections from './CircleConnections';
import { familyMembers, FamilyMember } from '@/data/familyData';
import { useIsMobile } from '@/hooks/use-mobile';

interface FamilyCircleGraphicProps {
  onSelectMember: (member: FamilyMember | null) => void;
  memberImages?: Record<string, string | null>;
}

const FamilyCircleGraphic: React.FC<FamilyCircleGraphicProps> = ({ 
  onSelectMember,
  memberImages = {} 
}) => {
  const [activeMember, setActiveMember] = useState<string | null>(null);
  const [circleRadius, setCircleRadius] = useState<number>(180);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isMobile = useIsMobile();
  
  // Adjust dimensions based on mobile or desktop
  const nodeWidth = isMobile ? 85 : 120;
  const nodeIconSize = isMobile ? 40 : 60;
  const iconSize = isMobile ? 20 : 28;
  const textWidth = isMobile ? 'w-20' : 'w-28';
  
  // Adjust circle radius based on screen size
  useEffect(() => {
    const calculateRadius = () => {
      if (isMobile) {
        setCircleRadius(140);
      } else {
        const containerWidth = document.getElementById('family-circle-container')?.offsetWidth || 400;
        setCircleRadius(Math.min(180, containerWidth / 2 - nodeWidth / 2 - 20));
      }
    };
    
    const updateDimensions = () => {
      const container = document.getElementById('family-circle-container');
      if (container) {
        setDimensions({
          width: container.offsetWidth,
          height: container.offsetHeight
        });
      }
    };
    
    calculateRadius();
    updateDimensions();
    
    window.addEventListener('resize', () => {
      calculateRadius();
      updateDimensions();
    });
    
    return () => {
      window.removeEventListener('resize', () => {
        calculateRadius();
        updateDimensions();
      });
    };
  }, [isMobile, nodeWidth]);
  
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
      x: dimensions.width / 2 + circleRadius * Math.cos(radians),
      y: dimensions.height / 2 + circleRadius * Math.sin(radians)
    };
  };
  
  return (
    <div id="family-circle-container" className="relative w-full h-[500px] flex items-center justify-center">
      {/* Connecting lines */}
      <CircleConnections 
        members={familyMembers}
        centerX={dimensions.width / 2}
        centerY={dimensions.height / 2}
        orbitRadius={circleRadius}
        activeMember={activeMember}
        animationComplete={dimensions.width > 0}
        width={dimensions.width}
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
