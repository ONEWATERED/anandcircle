import React, { useState } from 'react';
import { useStoryMilestones, StoryMilestone } from '@/hooks/useStoryMilestones';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Save, ArrowUp, ArrowDown, Trash2, Edit, AlertTriangle } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogClose
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

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
  
  const handleDeleteMilestone = async (id: string) => {
    try {
      const success = await deleteMilestone(id);
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
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-700">
          <AlertTriangle className="w-5 h-5 mt-0.5" />
          <div>
            <h3 className="font-medium">Failed to load milestones</h3>
            <p className="text-sm opacity-80">There was an error loading your story milestones. Please try refreshing the page.</p>
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-primary/70" />
          <span className="ml-3 text-lg text-muted-foreground">Loading story milestones...</span>
        </div>
      ) : (
        <div className="grid gap-4">
          {milestones.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <h3 className="text-lg font-medium text-gray-600 mb-2">No milestones yet</h3>
              <p className="text-muted-foreground mb-4">Add your first story milestone to get started.</p>
              <Button onClick={() => handleOpenDialog()} variant="outline" className="gap-2">
                <Plus size={16} />
                <span>Add First Milestone</span>
              </Button>
            </div>
          ) : (
            milestones.map(milestone => (
              <Card key={milestone.id} className="relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-primary/50`} />
                
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
                      onClick={() => handleReorderMilestone(milestone.id, 'up')}
                      disabled={milestone.order_position <= 1}
                    >
                      <ArrowUp size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleReorderMilestone(milestone.id, 'down')}
                      disabled={milestone.order_position >= milestones.length}
                    >
                      <ArrowDown size={16} />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleOpenDialog(milestone)}
                    >
                      <Edit size={14} />
                      <span>Edit</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => setOpenDeleteDialog(milestone.id)}
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingMilestone ? 'Edit Milestone' : 'Add New Milestone'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                placeholder="e.g., The Journey Begins" 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                placeholder="Describe this milestone of your story..." 
                rows={4} 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="icon" className="text-sm font-medium">Icon</label>
              <Select value={formData.icon} onValueChange={handleIconChange}>
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
            <Button onClick={handleSaveMilestone} className="gap-2">
              <Save size={16} />
              <span>Save Milestone</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={!!openDeleteDialog} onOpenChange={() => setOpenDeleteDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this milestone from your story. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => openDeleteDialog && handleDeleteMilestone(openDeleteDialog)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
