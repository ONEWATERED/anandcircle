
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

  // Determine if the title should be split into two lines
  // For titles with more than one word
  const titleWords = domain.title.split(' ');
  const shouldSplitTitle = titleWords.length > 1 && !isMobile;

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

  // Calculate additional height for text to prevent overlap
  const nodeHeight = nodeWidth * (shouldSplitTitle ? 1.8 : 1.6);

  return (
    <motion.div
      key={domain.id}
      className="absolute flex flex-col items-center justify-center"
      data-domain-node="true"
      style={{ 
        top: position.y, 
        left: position.x, 
        width: nodeWidth,
        height: nodeHeight, // Adjusted height to fit multiple text lines
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
      <motion.div 
        className="cursor-pointer rounded-full flex items-center justify-center shadow-md mb-2"
        style={{ 
          backgroundColor: domain.color,
          border: `2px solid ${isActive ? 'white' : 'transparent'}`,
          width: nodeIconSize,
          height: nodeIconSize,
        }}
        whileHover={{ scale: 1.1 }}
        animate={{ 
          scale: isActive ? 1.1 : 1,
          boxShadow: isActive ? '0 0 10px rgba(255,255,255,0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <Icon size={iconSize} color="white" />
      </motion.div>
      <motion.div 
        className={`text-center ${textWidth} mx-auto`}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          scale: isActive ? 1.05 : 1
        }}
        transition={{ delay: nodeDelay + 0.1 }}
      >
        {shouldSplitTitle ? (
          // Split title into two lines for desktop
          <div className={`font-semibold text-xs md:text-sm`}>
            <div className="truncate">{titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(' ')}</div>
            <div className="truncate">{titleWords.slice(Math.ceil(titleWords.length / 2)).join(' ')}</div>
          </div>
        ) : (
          // Single line for mobile or short titles
          <div className={`font-semibold ${width < 350 ? 'text-3xs' : width < 500 ? 'text-2xs' : 'text-xs'} md:text-sm truncate`}>
            {domain.title}
          </div>
        )}
        
        {isActive && (
          <motion.div 
            className={`${width < 350 ? 'text-3xs' : 'text-2xs'} md:text-xs text-muted-foreground mt-0.5 z-10 bg-black/70 p-1 rounded-md backdrop-blur-sm text-white`}
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
