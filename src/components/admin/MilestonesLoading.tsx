
import React from 'react';
import { Loader2 } from 'lucide-react';

const MilestonesLoading = () => {
  return (
    <div className="flex items-center justify-center py-16">
      <Loader2 className="w-8 h-8 animate-spin text-primary/70" />
      <span className="ml-3 text-lg text-muted-foreground">Loading story milestones...</span>
    </div>
  );
};

export default MilestonesLoading;
