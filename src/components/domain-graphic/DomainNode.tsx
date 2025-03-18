
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
    <div
      className="absolute flex flex-col items-center justify-start cursor-pointer"
      data-domain-node="true"
      style={{ 
        top: position.y, 
        left: position.x, 
        width: nodeWidth,
        height: nodeHeight,
        marginLeft: -nodeWidth/2,
        marginTop: -nodeWidth/2,
        zIndex: isActive ? 10 : 1,
        transition: "transform 0.3s ease"
      }}
      onMouseEnter={!isMobile ? () => onNodeHover(domain.id) : undefined}
      onMouseLeave={!isMobile ? () => onNodeHover(null) : undefined}
      onClick={isMobile ? handleInteraction : undefined}
    >
      {/* Circle with icon */}
      <div 
        className="rounded-lg flex items-center justify-center shadow-sm mb-2"
        style={{ 
          backgroundColor: isActive ? "#f0f0f0" : "#ffffff",
          border: `1px solid ${isActive ? '#000000' : '#e0e0e0'}`,
          width: nodeIconSize,
          height: nodeIconSize,
          marginLeft: 'auto',
          marginRight: 'auto',
          transition: "all 0.3s ease"
        }}
        onClick={domain.link ? handleClick : undefined}
      >
        <Icon 
          size={iconSize} 
          color="#000000"
        />
      </div>

      {/* Text area */}
      <div 
        className={`text-center ${textWidth} mx-auto text-center`}
        onClick={domain.link ? handleClick : undefined}
      >
        <div 
          className={`font-normal ${isMobile ? 'text-[10px]' : 'text-xs md:text-sm'} text-center whitespace-nowrap`}
          style={{ color: isActive ? "#000000" : "#666666" }}
        >
          {domain.title}
          {domain.link && <span className="ml-1 text-black">↗</span>}
        </div>
        
        {isActive && (
          <div 
            className={`${isMobile ? 'text-[8px]' : 'text-[9px] md:text-xs'} mt-1 z-10 text-black bg-white p-2 rounded-md shadow-sm border border-gray-200`}
          >
            {isMobile 
              ? domain.description.split(' ').slice(0, 5).join(' ') + '...' 
              : domain.description}
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainNode;
