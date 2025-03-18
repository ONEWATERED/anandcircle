
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { FamilyMember } from '@/data/familyData';
import { FlipCard } from '@/components/ui/card';
import FamilyMemberCardBack from './FamilyMemberCardBack';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

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
  photoUrl?: string | null;
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
  photoUrl,
}) => {
  const isActive = activeMember === member.id;
  const Icon = member.icon;
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Staggered animation delay based on index - faster on mobile
  const animationDelay = isMobile ? 0.4 + (index * 0.08) : 0.6 + (index * 0.1);
  
  // Handle click on node
  const handleClick = () => {
    console.log('Card clicked!', member.name, 'Current flip state:', isFlipped);
    setIsFlipped(!isFlipped);
    onNodeClick(member.id);
  };
  
  // Scale factor for active node - smaller on mobile to prevent overlap
  const activeScale = isMobile ? 1.1 : 1.15;
  
  // Adjust height based on mobile
  const nodeHeight = isMobile ? nodeWidth * 1.3 : nodeWidth * 1.5;
  
  // Front content of the flip card
  const frontContent = (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center"
      animate={{ scale: isActive ? activeScale : 1 }}
    >
      {/* Circle with icon or image */}
      <motion.div
        className="relative rounded-full flex items-center justify-center shadow-md mb-2 overflow-hidden"
        style={{
          width: nodeIconSize,
          height: nodeIconSize,
          backgroundColor: isActive ? `${member.color}` : `${member.color}CC`,
          border: isActive ? '3px solid white' : '2px solid rgba(255,255,255,0.7)',
        }}
        whileHover={{ scale: 1.05 }}
      >
        {photoUrl ? (
          <Avatar className="h-full w-full border-0">
            <AvatarImage src={photoUrl} alt={member.name} className="object-cover aspect-square" />
            <AvatarFallback style={{ backgroundColor: member.color }}>
              <Icon size={iconSize} className="text-white" />
            </AvatarFallback>
          </Avatar>
        ) : (
          <Icon size={iconSize} className="text-white" />
        )}
      </motion.div>
      
      {/* Member name */}
      <motion.div className={`text-center flex flex-col items-center ${textWidth}`}>
        <span 
          className={`font-medium text-center mb-0.5 ${isMobile ? 'text-2xs' : 'text-sm'} ${isActive ? 'text-slate-800' : 'text-slate-700'}`}
        >
          {member.name}
        </span>
        <span 
          className={`${isMobile ? 'text-3xs' : 'text-xs'} text-slate-500`}
        >
          {member.role}
        </span>
      </motion.div>
    </motion.div>
  );
  
  // Back content of the flip card - member details and social links
  const backContent = (
    <FamilyMemberCardBack member={member} nodeIconSize={nodeIconSize} photoUrl={photoUrl} />
  );
  
  return (
    <motion.div
      className="absolute select-none cursor-pointer"
      style={{
        top: position.y,
        left: position.x,
        width: nodeWidth,
        height: nodeHeight,
        marginLeft: -nodeWidth / 2,
        marginTop: -nodeHeight / 2,
        zIndex: isFlipped ? 20 : 10,
      }}
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
    >
      <FlipCard
        frontContent={frontContent}
        backContent={backContent}
        flipOnHover={false}
        flipOnClick={true}
        isFlipped={isFlipped}
        onClick={handleClick}
        width="100%"
        height="100%"
        className={`${isFlipped ? 'z-20' : 'z-10'}`}
      />
    </motion.div>
  );
};

export default FamilyMemberNode;
