
import React from 'react';
import { DomainData } from '@/data/domainData';
import { LucideIcon } from 'lucide-react';

interface DomainCardProps {
  domain: DomainData;
  index: number;
  onClick: () => void;
}

const DomainCard: React.FC<DomainCardProps> = ({ domain, index, onClick }) => {
  if (!domain) return null;
  const Icon = domain.icon;
  
  return (
    <div 
      key={domain.id} 
      className={`${index > 0 ? 'mt-4 pt-4 border-t border-white/10' : ''}`}
    >
      <div className="flex items-center mb-2">
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
          style={{ backgroundColor: `${domain.color}30` }}
        >
          <Icon size={16} color={domain.color} />
        </div>
        <h4 className="text-base font-medium text-white">{domain.title}</h4>
      </div>
      
      <p className="text-xs text-gray-300">
        {domain.description}
      </p>
    </div>
  );
};

export default DomainCard;
