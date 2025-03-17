
import React from 'react';
import { StoryMilestone } from '@/hooks/useStoryMilestones';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Edit, Trash2 } from 'lucide-react';

interface MilestoneCardProps {
  milestone: StoryMilestone;
  onEdit: (milestone: StoryMilestone) => void;
  onDelete: (id: string) => void;
  onReorder: (id: string, direction: 'up' | 'down') => void;
  isFirst: boolean;
  isLast: boolean;
}

const MilestoneCard = ({ 
  milestone, 
  onEdit, 
  onDelete, 
  onReorder, 
  isFirst, 
  isLast 
}: MilestoneCardProps) => {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-primary/50" />
      
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          {milestone.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground">{milestone.description}</p>
        <div className="mt-2 text-sm text-muted-foreground/70">
          Position: {milestone.order_position} | Icon: {milestone.icon}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2">
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onReorder(milestone.id, 'up')}
            disabled={isFirst}
          >
            <ArrowUp size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onReorder(milestone.id, 'down')}
            disabled={isLast}
          >
            <ArrowDown size={16} />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => onEdit(milestone)}
          >
            <Edit size={14} />
            <span>Edit</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(milestone.id)}
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MilestoneCard;
