
import React from 'react';
import { motion } from 'framer-motion';
import { DomainData } from '@/data/domainData';

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
  const width = window.innerWidth;

  const handleInteraction = () => {
    if (isMobile) {
      // For mobile, toggle active state
      onNodeHover(domain.id === activeNode ? null : domain.id);
    } else {
      // For desktop, just set active on hover
      onNodeHover(domain.id);
    }
  };

  // Optimize transition delays for faster initial loading on mobile
  const nodeDelay = isMobile ? 0.2 + (index * 0.05) : 0.3 + (index * 0.1);

  // Calculate additional height for text to prevent overlap with center circle
  // Increased height multiplier for better visibility
  const nodeHeight = nodeWidth * (isMobile ? 3 : 2.5);

  return (
    <motion.div
      key={domain.id}
      className="absolute flex flex-col items-center justify-start"
      data-domain-node="true"
      style={{ 
        top: position.y, 
        left: position.x, 
        width: nodeWidth,
        height: nodeHeight,
        marginLeft: -nodeWidth/2,
        marginTop: -nodeWidth/2,
        // The text should always stay upright even as the node rotates around the circle
        transform: rotationEnabled ? 'rotate(0deg)' : 'none'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
      }}
      transition={{ 
        delay: nodeDelay, 
        duration: 0.5, 
        type: "spring" 
      }}
      onMouseEnter={!isMobile ? () => onNodeHover(domain.id) : undefined}
      onMouseLeave={!isMobile ? () => onNodeHover(null) : undefined}
      onTouchStart={isMobile ? handleInteraction : undefined}
    >
      {/* Circle with icon - centered horizontally */}
      <motion.div 
        className="cursor-pointer rounded-full flex items-center justify-center shadow-md mb-3"
        style={{ 
          backgroundColor: domain.color,
          border: `2px solid ${isActive ? 'white' : 'transparent'}`,
          width: nodeIconSize,
          height: nodeIconSize,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
        whileHover={{ scale: 1.1 }}
        animate={{ 
          scale: isActive ? 1.1 : 1,
          boxShadow: isActive ? '0 0 10px rgba(255,255,255,0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <Icon size={iconSize} color="white" />
      </motion.div>

      {/* Text area - perfectly centered under the icon with improved visibility */}
      <motion.div 
        className={`text-center ${textWidth} mx-auto mt-2`}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          scale: isActive ? 1.05 : 1
        }}
        transition={{ delay: nodeDelay + 0.1 }}
      >
        <div className={`font-semibold ${width < 350 ? 'text-xs' : 'text-sm'} md:text-sm text-center bg-black/50 rounded-md px-1 py-0.5 text-white`}>
          {domain.title}
        </div>
        
        {isActive && (
          <motion.div 
            className={`${width < 350 ? 'text-3xs' : 'text-2xs'} md:text-xs text-muted-foreground mt-2 z-10 bg-black/90 p-1.5 rounded-md backdrop-blur-sm text-white`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {domain.description}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DomainNode;
