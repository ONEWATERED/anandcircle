
import React from 'react';
import { StoryMilestone } from '@/hooks/useStoryMilestones';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogClose 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save } from 'lucide-react';

interface MilestoneFormData {
  title: string;
  description: string;
  icon: string;
  order_position: number;
}

interface MilestoneFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: MilestoneFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onIconChange: (value: string) => void;
  onSave: () => Promise<void>;
  isEditing: boolean;
  iconOptions: Array<{value: string; label: string}>;
}

const MilestoneFormDialog = ({ 
  open, 
  onOpenChange, 
  formData, 
  onInputChange, 
  onIconChange, 
  onSave, 
  isEditing,
  iconOptions
}: MilestoneFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Milestone' : 'Add New Milestone'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <Input 
              id="title" 
              name="title" 
              value={formData.title} 
              onChange={onInputChange} 
              placeholder="e.g., The Journey Begins" 
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={onInputChange} 
              placeholder="Describe this milestone of your story..." 
              rows={4} 
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="icon" className="text-sm font-medium">Icon</label>
            <Select value={formData.icon} onValueChange={onIconChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={onSave} className="gap-2">
            <Save size={16} />
            <span>Save Milestone</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MilestoneFormDialog;
