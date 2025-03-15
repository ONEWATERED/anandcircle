
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
}) => {
  const Icon = domain.icon;
  const isActive = activeNode === domain.id;
  const width = window.innerWidth;

  return (
    <motion.div
      key={domain.id}
      className="absolute flex flex-col items-center"
      style={{ 
        top: position.y, 
        left: position.x, 
        width: nodeWidth,
        height: nodeWidth,
        marginLeft: -nodeWidth/2,
        marginTop: -nodeWidth/2,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        delay: 0.3 + (index * 0.1), 
        duration: 0.6, 
        type: "spring" 
      }}
      onMouseEnter={() => onNodeHover(domain.id)}
      onMouseLeave={() => onNodeHover(null)}
      onTouchStart={() => onNodeHover(domain.id === activeNode ? null : domain.id)}
    >
      <motion.div 
        className="cursor-pointer rounded-full flex items-center justify-center shadow-lg mb-2 transition-transform"
        style={{ 
          backgroundColor: domain.color,
          border: `2px solid ${isActive ? 'white' : 'transparent'}`,
          width: nodeIconSize,
          height: nodeIconSize,
        }}
        whileHover={{ scale: 1.1 }}
        animate={{ 
          scale: isActive ? 1.1 : 1,
          boxShadow: isActive ? '0 0 15px rgba(255,255,255,0.5)' : '0 4px 6px rgba(0,0,0,0.1)'
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
        transition={{ delay: 0.5 + (index * 0.1) }}
      >
        <div className={`font-semibold ${width < 350 ? 'text-2xs' : 'text-xs'} md:text-sm`}>
          {domain.title}
        </div>
        {isActive && (
          <motion.div 
            className={`${width < 350 ? 'text-3xs' : 'text-2xs'} md:text-xs text-muted-foreground mt-1`}
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
