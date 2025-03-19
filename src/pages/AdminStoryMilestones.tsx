
import React, { useState } from 'react';
import { useStoryMilestones, StoryMilestone } from '@/hooks/useStoryMilestones';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import MilestoneCard from '@/components/admin/MilestoneCard';
import MilestoneFormDialog from '@/components/admin/MilestoneFormDialog';
import DeleteMilestoneDialog from '@/components/admin/DeleteMilestoneDialog';
import EmptyMilestones from '@/components/admin/EmptyMilestones';
import MilestonesLoading from '@/components/admin/MilestonesLoading';
import MilestonesError from '@/components/admin/MilestonesError';

export default function AdminStoryMilestones() {
  const { milestones, loading, error, addMilestone, updateMilestone, deleteMilestone, reorderMilestones } = useStoryMilestones();
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<string | null>(null);
  const [editingMilestone, setEditingMilestone] = useState<StoryMilestone | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'GraduationCap',
    order_position: 1
  });
  
  const iconOptions = [
    { value: 'GraduationCap', label: 'Education (GraduationCap)' },
    { value: 'Briefcase', label: 'Work (Briefcase)' },
    { value: 'Award', label: 'Achievement (Award)' },
    { value: 'Droplets', label: 'Water (Droplets)' },
    { value: 'Globe', label: 'Global (Globe)' },
    { value: 'Star', label: 'Excellence (Star)' },
    { value: 'Shield', label: 'Leadership (Shield)' },
    { value: 'Lightbulb', label: 'Innovation (Lightbulb)' }
  ];
  
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'GraduationCap',
      order_position: milestones.length + 1
    });
    setEditingMilestone(null);
  };
  
  const handleOpenDialog = (milestone?: StoryMilestone) => {
    if (milestone) {
      setEditingMilestone(milestone);
      setFormData({
        title: milestone.title,
        description: milestone.description,
        icon: milestone.icon,
        order_position: milestone.order_position
      });
    } else {
      resetForm();
    }
    setOpenDialog(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleIconChange = (value: string) => {
    setFormData(prev => ({ ...prev, icon: value }));
  };
  
  const handleSaveMilestone = async () => {
    try {
      if (!formData.title || !formData.description) {
        toast({
          title: "Missing Information",
          description: "Please provide a title and description for the milestone.",
          variant: "destructive"
        });
        return;
      }
      
      let success = false;
      
      if (editingMilestone) {
        success = await updateMilestone(editingMilestone.id, formData);
        if (success) {
          toast({
            title: "Milestone Updated",
            description: "Your story milestone has been updated successfully."
          });
        }
      } else {
        const newMilestone = await addMilestone(formData);
        success = !!newMilestone;
        if (success) {
          toast({
            title: "Milestone Added",
            description: "New story milestone has been added successfully."
          });
        }
      }
      
      if (success) {
        setOpenDialog(false);
        resetForm();
      } else {
        toast({
          title: "Operation Failed",
          description: "There was a problem saving the milestone. Please try again.",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Error saving milestone:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleDeleteMilestone = async () => {
    if (!openDeleteDialog) return;
    
    try {
      const success = await deleteMilestone(openDeleteDialog);
      if (success) {
        toast({
          title: "Milestone Deleted",
          description: "The milestone has been removed from your story."
        });
        setOpenDeleteDialog(null);
      } else {
        toast({
          title: "Deletion Failed",
          description: "There was a problem deleting the milestone. Please try again.",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Error deleting milestone:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleReorderMilestone = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = milestones.findIndex(m => m.id === id);
    if (
      (direction === 'up' && currentIndex <= 0) || 
      (direction === 'down' && currentIndex >= milestones.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const reorderedMilestones = [...milestones];
    const [movedItem] = reorderedMilestones.splice(currentIndex, 1);
    reorderedMilestones.splice(newIndex, 0, movedItem);
    
    try {
      const success = await reorderMilestones(reorderedMilestones.map(m => m.id));
      if (success) {
        toast({
          title: "Order Updated",
          description: "The order of your story milestones has been updated."
        });
      } else {
        toast({
          title: "Reordering Failed",
          description: "There was a problem updating the order. Please try again.",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Error reordering milestones:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Story Milestones</h1>
        <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
          <Plus size={16} />
          <span>Add Milestone</span>
        </Button>
      </div>
      
      {error && <MilestonesError />}
      
      {loading ? (
        <MilestonesLoading />
      ) : (
        <div className="grid gap-4">
          {milestones.length === 0 ? (
            <EmptyMilestones onAddFirst={() => handleOpenDialog()} />
          ) : (
            milestones.map((milestone, index) => (
              <MilestoneCard 
                key={milestone.id}
                milestone={milestone}
                onEdit={handleOpenDialog}
                onDelete={(id) => setOpenDeleteDialog(id)}
                onReorder={handleReorderMilestone}
                isFirst={index === 0}
                isLast={index === milestones.length - 1}
              />
            ))
          )}
        </div>
      )}
      
      <MilestoneFormDialog 
        open={openDialog}
        onOpenChange={setOpenDialog}
        formData={formData}
        onInputChange={handleInputChange}
        onIconChange={handleIconChange}
        onSave={handleSaveMilestone}
        isEditing={!!editingMilestone}
        iconOptions={iconOptions}
      />
      
      <DeleteMilestoneDialog 
        open={!!openDeleteDialog}
        onOpenChange={() => setOpenDeleteDialog(null)}
        onConfirm={handleDeleteMilestone}
      />
    </div>
  );
}
