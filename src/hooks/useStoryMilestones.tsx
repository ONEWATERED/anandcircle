
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface StoryMilestone {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_position: number;
  created_at: string;
  updated_at: string;
}

export function useStoryMilestones() {
  const [milestones, setMilestones] = useState<StoryMilestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchMilestones();
  }, []);

  const fetchMilestones = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching story milestones...');
      const { data, error } = await supabase
        .from('story_milestones')
        .select('*')
        .order('order_position', { ascending: true });
      
      if (error) {
        console.error('Error fetching story milestones:', error);
        setError(error);
        return;
      }
      
      console.log('Fetched milestones:', data);
      setMilestones(data || []);
    } catch (err) {
      console.error('Error in fetchMilestones:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  const addMilestone = async (milestone: Omit<StoryMilestone, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('Adding milestone:', milestone);
      const { data, error } = await supabase
        .from('story_milestones')
        .insert([milestone])
        .select();
      
      if (error) {
        console.error('Error adding milestone:', error);
        toast.error(`Failed to add milestone: ${error.message}`);
        setError(error);
        return null;
      }
      
      toast.success('Milestone added successfully');
      await fetchMilestones();
      return data?.[0] || null;
    } catch (err) {
      console.error('Error in addMilestone:', err);
      toast.error('An unexpected error occurred while adding the milestone');
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    }
  };

  const updateMilestone = async (id: string, updates: Partial<Omit<StoryMilestone, 'id' | 'created_at' | 'updated_at'>>) => {
    try {
      console.log('Updating milestone:', id, updates);
      const { error } = await supabase
        .from('story_milestones')
        .update(updates)
        .eq('id', id);
      
      if (error) {
        console.error('Error updating milestone:', error);
        toast.error(`Failed to update milestone: ${error.message}`);
        setError(error);
        return false;
      }
      
      toast.success('Milestone updated successfully');
      await fetchMilestones();
      return true;
    } catch (err) {
      console.error('Error in updateMilestone:', err);
      toast.error('An unexpected error occurred while updating the milestone');
      setError(err instanceof Error ? err : new Error(String(err)));
      return false;
    }
  };

  const deleteMilestone = async (id: string) => {
    try {
      console.log('Deleting milestone:', id);
      const { error } = await supabase
        .from('story_milestones')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting milestone:', error);
        toast.error(`Failed to delete milestone: ${error.message}`);
        setError(error);
        return false;
      }
      
      toast.success('Milestone deleted successfully');
      await fetchMilestones();
      return true;
    } catch (err) {
      console.error('Error in deleteMilestone:', err);
      toast.error('An unexpected error occurred while deleting the milestone');
      setError(err instanceof Error ? err : new Error(String(err)));
      return false;
    }
  };

  const reorderMilestones = async (reorderedIds: string[]) => {
    try {
      console.log('Reordering milestones:', reorderedIds);
      // Update each milestone with its new position
      const updates = reorderedIds.map((id, index) => {
        return supabase
          .from('story_milestones')
          .update({ order_position: index + 1 })
          .eq('id', id);
      });
      
      await Promise.all(updates);
      toast.success('Milestone order updated successfully');
      await fetchMilestones();
      return true;
    } catch (err) {
      console.error('Error in reorderMilestones:', err);
      toast.error('An unexpected error occurred while reordering milestones');
      setError(err instanceof Error ? err : new Error(String(err)));
      return false;
    }
  };

  return {
    milestones,
    loading,
    error,
    fetchMilestones,
    addMilestone,
    updateMilestone,
    deleteMilestone,
    reorderMilestones
  };
}
