
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const StoryLoading: React.FC = () => {
  return (
    <div id="story" className="py-8 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-tech-dark text-white">
      <div className="text-center mb-8 md:mb-12">
        <Skeleton className="h-8 w-40 mx-auto mb-4 bg-tech-dark/50" />
        <Skeleton className="h-4 w-full max-w-3xl mx-auto bg-tech-dark/50" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative pl-8 border-l-2 border-[#0EA5E9]/30 pb-6">
              <Skeleton className="h-4 w-full mb-2 bg-tech-dark/50" />
              <Skeleton className="h-16 w-full bg-tech-dark/50" />
              <Skeleton className="h-3 w-20 mt-2 bg-tech-dark/50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryLoading;
