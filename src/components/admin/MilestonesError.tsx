
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const MilestonesError = () => {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-700">
      <AlertTriangle className="w-5 h-5 mt-0.5" />
      <div>
        <h3 className="font-medium">Failed to load milestones</h3>
        <p className="text-sm opacity-80">There was an error loading your story milestones. Please try refreshing the page.</p>
      </div>
    </div>
  );
};

export default MilestonesError;
