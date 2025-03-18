
import React from 'react';
import { DomainData } from '@/data/domainData';
import { motion } from 'framer-motion';

interface DomainNodeProps {
  domain: DomainData;
  position: { x: number; y: number };
  nodeWidth: number;
  nodeIconSize: number;
  iconSize: number;
  textWidth: string;
  activeNode: string | null;
  onNodeHover: (id: string | null) => void;
  index: number;
  isMobile: boolean;
  rotationEnabled: boolean;
}

const DomainNode: React.FC<DomainNodeProps> = ({
  domain,
  position,
  nodeWidth,
  nodeIconSize,
  iconSize,
  textWidth,
  activeNode,
  onNodeHover,
  index,
  isMobile,
  rotationEnabled
}) => {
  const Icon = domain.icon;
  const isActive = activeNode === domain.id;

  // Animation variants for framer-motion
  const nodeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        delay: index * 0.1,
        duration: 0.3,
        type: "spring",
        stiffness: 260,
        damping: 20
      } 
    },
    hover: { 
      scale: 1.05, 
      transition: { duration: 0.2 } 
    },
    active: { 
      scale: 1.1, 
      transition: { duration: 0.2 } 
    }
  };

  // Handle interactions
  const handleInteraction = () => {
    if (isMobile) {
      onNodeHover(domain.id === activeNode ? null : domain.id);
    } else {
      onNodeHover(domain.id);
    }
  };

  const handleClick = () => {
    if (domain.link) {
      window.open(domain.link, '_blank', 'noopener,noreferrer');
    }
  };

  // Adjust node dimensions based on device
  const nodeHeight = nodeWidth * (isMobile ? 1.8 : 2.2);

  return (
    <motion.div
      className="absolute flex flex-col items-center justify-start cursor-pointer"
      data-domain-node="true"
      style={{ 
        top: position.y, 
        left: position.x, 
        width: nodeWidth,
        height: nodeHeight,
        marginLeft: -nodeWidth/2,
        marginTop: -nodeWidth/2,
        zIndex: isActive ? 10 : 1
      }}
      variants={nodeVariants}
      initial="initial"
      animate="animate"
      whileHover={!isMobile && !isActive ? "hover" : undefined}
      whileTap={isMobile ? "active" : undefined}
      onHoverStart={!isMobile ? () => onNodeHover(domain.id) : undefined}
      onHoverEnd={!isMobile ? () => onNodeHover(null) : undefined}
      onTap={isMobile ? handleInteraction : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Circle with icon */}
      <motion.div 
        className="rounded-2xl flex items-center justify-center shadow-sm mb-2"
        style={{ 
          backgroundColor: isActive ? "#f0f9ff" : "#ffffff",
          border: `1px solid ${isActive ? '#0ea5e9' : '#e5e7eb'}`,
          width: nodeIconSize,
          height: nodeIconSize,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
        onClick={domain.link ? handleClick : undefined}
        animate={isActive ? {
          boxShadow: "0 0 12px 3px rgba(14, 165, 233, 0.3)",
        } : {
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
        transition={{ duration: 0.3 }}
      >
        <Icon 
          size={iconSize} 
          color="#0ea5e9" 
          className={isActive ? "animate-pulse-soft" : ""} 
        />
      </motion.div>

      {/* Text area */}
      <motion.div 
        className={`text-center ${textWidth} mx-auto text-center`}
        onClick={domain.link ? handleClick : undefined}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div 
          className={`font-semibold ${isMobile ? 'text-[10px]' : 'text-xs md:text-sm'} text-center whitespace-nowrap`}
          style={{ color: isActive ? "#0ea5e9" : "#d1d5db" }}
        >
          {domain.title}
          {domain.link && <span className="ml-1 text-primary">↗</span>}
        </div>
        
        {isActive && (
          <motion.div 
            className={`${isMobile ? 'text-[8px]' : 'text-[9px] md:text-xs'} mt-1 z-10 text-gray-100 bg-[#1E293B]/90 backdrop-blur-sm p-2 rounded-md shadow-sm`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {isMobile 
              ? domain.description.split(' ').slice(0, 5).join(' ') + '...' 
              : domain.description}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DomainNode;
