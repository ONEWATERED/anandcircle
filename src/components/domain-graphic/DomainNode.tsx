
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

  // Handle mouse and touch events
  const handleInteraction = () => {
    if (isMobile) {
      // For mobile, toggle active state
      onNodeHover(domain.id === activeNode ? null : domain.id);
    } else {
      // For desktop, just set active on hover
      onNodeHover(domain.id);
    }
  };

  const handleClick = () => {
    if (domain.link) {
      window.open(domain.link, '_blank', 'noopener,noreferrer');
    }
  };

  // Calculate proper height for better mobile display
  const nodeHeight = nodeWidth * (isMobile ? 2.2 : 3.2);

  // Determine text color based on domain
  const getTextColor = () => {
    switch(domain.id) {
      case 'family': return '#ff47c7'; // vibrant pink
      case 'health': return '#33C3F0'; // bright blue
      case 'water': return '#0EA5E9'; // ocean blue 
      case 'ai': return '#8B5CF6'; // vivid purple
      case 'mentoring': return '#F97316'; // bright orange
      default: return '#9b87f5'; // default purple
    }
  };

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
        transform: 'none' // No rotation
      }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={!isMobile ? () => onNodeHover(domain.id) : undefined}
      onMouseLeave={!isMobile ? () => onNodeHover(null) : undefined}
      onTouchStart={isMobile ? handleInteraction : undefined}
    >
      {/* Circle with icon - centered horizontally */}
      <motion.div 
        className={`rounded-full flex items-center justify-center shadow-md mb-2 ${domain.link ? 'cursor-pointer' : ''}`}
        style={{ 
          backgroundColor: domain.color,
          border: `2px solid ${isActive ? 'white' : 'transparent'}`,
          width: nodeIconSize,
          height: nodeIconSize,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
        animate={{ 
          scale: isActive ? 1.1 : 1,
        }}
        onClick={domain.link ? handleClick : undefined}
      >
        <Icon size={iconSize} color="white" />
      </motion.div>

      {/* Text area - optimized for mobile */}
      <motion.div 
        className={`text-center ${textWidth} mx-auto ${domain.link ? 'cursor-pointer' : ''}`}
        animate={{ 
          scale: isActive ? 1.05 : 1
        }}
        onClick={domain.link ? handleClick : undefined}
      >
        <div 
          className={`font-bold text-xs md:text-sm text-center`}
          style={{ 
            color: getTextColor(),
          }}
        >
          {domain.title}
          {domain.link && <span className="ml-1">↗</span>}
        </div>
        
        {isActive && (
          <motion.div 
            className="text-2xs md:text-xs mt-1 z-10"
            style={{ 
              color: getTextColor(),
            }}
          >
            {/* Short descriptions on all devices for clarity */}
            {isMobile 
              ? domain.description.split(' ').slice(0, 6).join(' ') + '...' 
              : domain.description.split(' ').slice(0, 10).join(' ') + '...'}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DomainNode;
