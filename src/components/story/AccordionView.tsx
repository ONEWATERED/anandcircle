
import React from 'react';
import renderIcon from './StoryIconMap';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AccordionViewProps {
  positions: any[];
}

const AccordionView: React.FC<AccordionViewProps> = ({ positions }) => {
  if (positions.length === 0) {
    return (
      <div className="text-center py-10 px-6 border-2 border-dashed border-[#0EA5E9]/20 rounded-lg glass-panel">
        <p className="text-gray-400">Career milestones will appear here</p>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {positions.map((position) => (
        <AccordionItem 
          key={position.id} 
          value={position.id}
          className="border-[#0EA5E9]/20 rounded-lg overflow-hidden glass-panel shadow-neon-cyan hover:shadow-lg transition-all duration-200"
        >
          <AccordionTrigger className="px-5 py-4 hover:no-underline group data-[state=open]:bg-[#0EA5E9]/10">
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center shrink-0">
                {renderIcon(position.icon)}
              </div>
              <span className="font-semibold text-white group-hover:text-[#0EA5E9] transition-colors">
                {position.title}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-4 pt-1 text-gray-300">
            {position.description}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionView;
