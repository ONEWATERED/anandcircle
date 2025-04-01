
import React from 'react';
import renderIcon from './StoryIconMap';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

interface TabsViewProps {
  positions: any[];
  isMobile: boolean;
}

const TabsView: React.FC<TabsViewProps> = ({ positions, isMobile }) => {
  if (positions.length === 0) {
    return (
      <div className="text-center py-10 px-6 border-2 border-dashed border-[#0EA5E9]/20 rounded-lg glass-panel">
        <p className="text-gray-400">Career milestones will appear here</p>
      </div>
    );
  }

  return (
    <Tabs defaultValue={positions[0]?.id || "tab-1"} className="w-full">
      <TabsList className="grid grid-cols-3 md:grid-cols-7 h-auto p-1 bg-[#0EA5E9]/10 rounded-lg mb-6 overflow-x-auto">
        {positions.map((position, index) => (
          <TabsTrigger 
            key={position.id} 
            value={position.id}
            className="py-3 data-[state=active]:bg-[#0EA5E9]/20 data-[state=active]:text-[#0EA5E9] text-gray-300 flex items-center gap-2"
          >
            <span className="hidden md:inline">{renderIcon(position.icon)}</span>
            <span className="text-xs md:text-sm whitespace-nowrap">
              {isMobile ? `Step ${index + 1}` : position.title}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
      
      {positions.map((position) => (
        <TabsContent 
          key={position.id} 
          value={position.id}
          className="mt-0 rounded-lg glass-panel shadow-neon-cyan p-6 border border-[#0EA5E9]/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center">
              {renderIcon(position.icon)}
            </div>
            <h3 className="text-xl font-semibold text-white">{position.title}</h3>
          </div>
          <p className="text-gray-300">{position.description}</p>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabsView;
