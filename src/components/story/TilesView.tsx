
import React from 'react';
import { motion } from 'framer-motion';
import renderIcon from './StoryIconMap';

interface TilesViewProps {
  positions: any[];
}

const TilesView: React.FC<TilesViewProps> = ({ positions }) => {
  if (positions.length === 0) {
    return (
      <div className="text-center py-10 px-6 border-2 border-dashed border-[#0EA5E9]/20 rounded-lg glass-panel col-span-full">
        <p className="text-gray-400">Career milestones will appear here</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {positions.map((position, index) => (
        <motion.div 
          key={position.id}
          className="rounded-lg glass-panel shadow-neon-cyan hover:shadow-lg transition-all duration-300 border border-[#0EA5E9]/20 overflow-hidden h-full flex flex-col"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          whileHover={{ y: -5 }}
        >
          <div className="p-5 bg-gradient-to-r from-[#0EA5E9]/10 to-transparent border-b border-[#0EA5E9]/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center">
              {renderIcon(position.icon)}
            </div>
            <h3 className="text-lg font-semibold text-white flex-1 truncate">{position.title}</h3>
            <div className="text-xs font-medium rounded-full px-2 py-1 bg-[#0EA5E9]/20 text-[#0EA5E9]">
              {position.order_position}
            </div>
          </div>
          <div className="p-5 flex-1">
            <p className="text-gray-300 text-sm">
              {position.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TilesView;
