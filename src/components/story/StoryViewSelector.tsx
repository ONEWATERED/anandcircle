
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface StoryViewSelectorProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const StoryViewSelector: React.FC<StoryViewSelectorProps> = ({ 
  activeView, 
  setActiveView 
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveView('tiles')}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
          activeView === 'tiles' 
            ? 'bg-[#0EA5E9] text-white' 
            : 'bg-[#0EA5E9]/10 text-gray-300 hover:bg-[#0EA5E9]/20'
        }`}
      >
        <div className="grid grid-cols-2 gap-0.5">
          <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
          <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
          <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
          <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
        </div>
        <span className="text-sm">Tiles</span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveView('timeline')}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
          activeView === 'timeline' 
            ? 'bg-[#0EA5E9] text-white' 
            : 'bg-[#0EA5E9]/10 text-gray-300 hover:bg-[#0EA5E9]/20'
        }`}
      >
        <div className="w-4 h-4 flex flex-col items-center">
          <div className="w-0.5 h-full bg-current"></div>
          <div className="w-1.5 h-1.5 bg-current rounded-full -mt-1.5"></div>
        </div>
        <span className="text-sm">Timeline</span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveView('accordion')}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
          activeView === 'accordion' 
            ? 'bg-[#0EA5E9] text-white' 
            : 'bg-[#0EA5E9]/10 text-gray-300 hover:bg-[#0EA5E9]/20'
        }`}
      >
        <ChevronDown className="h-4 w-4" />
        <span className="text-sm">Accordion</span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveView('tabs')}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
          activeView === 'tabs' 
            ? 'bg-[#0EA5E9] text-white' 
            : 'bg-[#0EA5E9]/10 text-gray-300 hover:bg-[#0EA5E9]/20'
        }`}
      >
        <div className="flex">
          <div className="h-4 w-4 border-t-2 border-l-2 border-r-2 border-current rounded-t-sm"></div>
          <div className="h-4 w-4 border-t-2 border-r-2 border-current ml-0.5 rounded-tr-sm opacity-70"></div>
        </div>
        <span className="text-sm">Tabs</span>
      </motion.button>
    </div>
  );
};

export default StoryViewSelector;
