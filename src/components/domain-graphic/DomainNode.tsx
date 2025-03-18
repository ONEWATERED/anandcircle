
import React from 'react';
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

  const nodeHeight = nodeWidth * (isMobile ? 2.0 : 3.0);

  return (
    <div
      className="absolute flex flex-col items-center justify-start"
      data-domain-node="true"
      style={{ 
        top: position.y, 
        left: position.x, 
        width: nodeWidth,
        height: nodeHeight,
        marginLeft: -nodeWidth/2,
        marginTop: -nodeWidth/2,
        transform: 'none',
        zIndex: isActive ? 10 : 1
      }}
      onMouseEnter={!isMobile ? () => onNodeHover(domain.id) : undefined}
      onMouseLeave={!isMobile ? () => onNodeHover(null) : undefined}
      onTouchStart={isMobile ? handleInteraction : undefined}
    >
      {/* Circle with icon - centered horizontally */}
      <div 
        className={`rounded-lg flex items-center justify-center shadow-sm mb-1 ${domain.link ? 'cursor-pointer' : ''}`}
        style={{ 
          backgroundColor: isActive ? "#f0f9ff" : "#ffffff",
          border: `1px solid ${isActive ? '#0ea5e9' : '#e5e7eb'}`,
          width: nodeIconSize,
          height: nodeIconSize,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
        onClick={domain.link ? handleClick : undefined}
      >
        <Icon size={iconSize} color="#0ea5e9" />
      </div>

      {/* Text area - simplified */}
      <div 
        className={`text-center ${textWidth} mx-auto ${domain.link ? 'cursor-pointer' : ''}`}
        onClick={domain.link ? handleClick : undefined}
      >
        <div 
          className={`font-medium text-xs md:text-sm text-center whitespace-nowrap`}
          style={{ color: isActive ? "#0ea5e9" : "#333333" }}
        >
          {domain.title}
          {domain.link && <span className="ml-1 text-primary">↗</span>}
        </div>
        
        {isActive && (
          <div className="text-[7px] md:text-xs mt-1 z-10 text-muted-foreground bg-white/80 backdrop-blur-sm p-1 rounded-md">
            {isMobile 
              ? domain.description.split(' ').slice(0, 3).join(' ') + '...' 
              : domain.description.split(' ').slice(0, 10).join(' ') + '...'}
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainNode;
