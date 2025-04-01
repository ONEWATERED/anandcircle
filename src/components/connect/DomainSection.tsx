
import React from 'react';
import { motion } from 'framer-motion';
import { domains } from '@/data/domainData';
import GroupedDomainCards from './GroupedDomainCards';

interface DomainSectionProps {
  onCardClick: () => void;
}

const DomainSection: React.FC<DomainSectionProps> = ({ onCardClick }) => {
  // Reordering and grouping the domains
  const groupedDomains = [
    // Group 1: AI & Data
    {
      id: 'tech',
      domains: [
        domains.find(d => d.id === 'ai'),        // AI
        domains.find(d => d.id === 'data'),      // Data
      ].filter(Boolean)
    },
    // Group 2: One Water
    {
      id: 'water',
      domains: [
        domains.find(d => d.id === 'water'),     // One Water
      ].filter(Boolean)
    },
    // Group 3: Mentoring & Family
    {
      id: 'people',
      domains: [
        domains.find(d => d.id === 'mentoring'), // Mentoring
        domains.find(d => d.id === 'family'),    // Nuclear Family
      ].filter(Boolean)
    },
    // Group 4: Health
    {
      id: 'health',
      domains: [
        domains.find(d => d.id === 'health'),    // Health
      ].filter(Boolean)
    }
  ];

  return (
    <motion.div
      className="mt-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h3 className="text-xl md:text-2xl font-medium text-center mb-8 text-white">
        What I'm <span className="text-gradient-cyan-purple">Passionate About</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-auto max-w-5xl">
        {groupedDomains.map((group) => (
          <GroupedDomainCards 
            key={group.id} 
            group={group} 
            onClick={onCardClick} 
          />
        ))}
      </div>
    </motion.div>
  );
};

export default DomainSection;
