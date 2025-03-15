
import React from 'react';
import { motion } from 'framer-motion';
import type { FamilyMember } from '@/data/familyData';

interface FamilyMemberNodeProps {
  member: FamilyMember;
  position: { x: number, y: number };
  nodeWidth: number;
  nodeIconSize: number;
  iconSize: number;
  textWidth: string;
  activeMember: string | null;
  onNodeClick: (memberId: string) => void;
  index: number;
  isMobile: boolean;
}

const FamilyMemberNode: React.FC<FamilyMemberNodeProps> = ({
  member,
  position,
  nodeWidth,
  nodeIconSize,
  iconSize,
  textWidth,
  activeMember,
  onNodeClick,
  index,
  isMobile,
}) => {
  const isActive = activeMember === member.id;
  const Icon = member.icon;
  
  // Staggered animation delay based on index
  const animationDelay = 0.6 + (index * 0.1);
  
  return (
    <motion.div
      className="absolute flex flex-col items-center cursor-pointer select-none"
      style={{
        top: position.y,
        left: position.x,
        width: nodeWidth,
        marginLeft: -nodeWidth / 2,
        marginTop: -nodeWidth / 2,
      }}
      onClick={() => onNodeClick(member.id)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
      }}
      transition={{ 
        duration: 0.5, 
        delay: animationDelay, 
        type: "spring"
      }}
      whileHover={{ scale: 1.15 }}
    >
      {/* Circle with icon */}
      <motion.div
        className="relative rounded-full flex items-center justify-center shadow-md mb-3"
        style={{
          width: nodeIconSize,
          height: nodeIconSize,
          backgroundColor: isActive ? `${member.color}` : `${member.color}CC`,
          border: isActive ? '3px solid white' : '2px solid rgba(255,255,255,0.7)',
        }}
        whileHover={{ scale: 1.1 }}
        animate={{ 
          scale: isActive ? 1.15 : 1,
          backgroundColor: isActive ? member.color : `${member.color}CC`
        }}
      >
        <Icon size={iconSize} className="text-white" />
      </motion.div>
      
      {/* Member name */}
      <motion.div 
        className={`text-center flex flex-col items-center ${textWidth}`}
        animate={{ scale: isActive ? 1.1 : 1 }}
      >
        <span 
          className={`font-medium text-center mb-0.5 ${isMobile ? 'text-xs' : 'text-sm'} ${isActive ? 'text-slate-800' : 'text-slate-700'}`}
        >
          {member.name}
        </span>
        <span 
          className={`${isMobile ? 'text-2xs' : 'text-xs'} text-slate-500`}
        >
          {member.role}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default FamilyMemberNode;
