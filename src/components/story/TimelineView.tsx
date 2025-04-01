
import React from 'react';
import { motion } from 'framer-motion';
import renderIcon from './StoryIconMap';

interface TimelineViewProps {
  positions: any[];
}

const TimelineView: React.FC<TimelineViewProps> = ({ positions }) => {
  if (positions.length === 0) {
    return (
      <div className="text-center py-10 px-6 border-2 border-dashed border-[#0EA5E9]/20 rounded-lg glass-panel">
        <p className="text-gray-400">Career milestones will appear here</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {positions.map((position, index) => (
        <motion.div 
          key={position.id} 
          className="relative pl-8 border-l-2 border-[#0EA5E9]/30 pb-8 hover:border-[#0EA5E9] transition-colors"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-tech-dark border-2 border-[#0EA5E9] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#0EA5E9]"></div>
          </div>
          <div className="p-6 rounded-lg glass-panel shadow-neon-cyan hover:shadow-lg transition-all duration-300 border border-[#0EA5E9]/20">
            <h3 className="text-xl font-semibold text-white mb-3">
              {position.title}
            </h3>
            <p className="text-gray-300">
              {position.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TimelineView;
