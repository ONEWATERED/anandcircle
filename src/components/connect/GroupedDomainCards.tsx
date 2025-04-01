
import React from 'react';
import { motion } from 'framer-motion';
import { DomainData } from '@/data/domainData';
import DomainCard from './DomainCard';

interface GroupedDomainsProps {
  group: {
    id: string;
    domains: (DomainData | undefined)[];
  };
  onClick: () => void;
}

const GroupedDomainCards: React.FC<GroupedDomainsProps> = ({ group, onClick }) => {
  return (
    <motion.div 
      key={group.id}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 hover:bg-white/20 transition-all duration-300 cursor-pointer"
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transition: { duration: 0.2 }
      }}
      onClick={onClick}
    >
      <div className="flex flex-col h-full">
        {group.domains.map((domain, index) => (
          domain && <DomainCard 
            key={domain.id} 
            domain={domain} 
            index={index} 
            onClick={onClick} 
          />
        ))}
      </div>
    </motion.div>
  );
};

export default GroupedDomainCards;
