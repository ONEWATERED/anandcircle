
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface EmptyMilestonesProps {
  onAddFirst: () => void;
}

const EmptyMilestones = ({ onAddFirst }: EmptyMilestonesProps) => {
  return (
    <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <h3 className="text-lg font-medium text-gray-600 mb-2">No milestones yet</h3>
      <p className="text-muted-foreground mb-4">Add your first story milestone to get started.</p>
      <Button onClick={onAddFirst} variant="outline" className="gap-2">
        <Plus size={16} />
        <span>Add First Milestone</span>
      </Button>
    </div>
  );
};

export default EmptyMilestones;
