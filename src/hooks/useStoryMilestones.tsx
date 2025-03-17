
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
      const { data, error } = await supabase
        .from('story_milestones')
        .insert([milestone])
        .select();
      
      if (error) {
        console.error('Error adding milestone:', error);
        setError(error);
        return null;
      }
      
      await fetchMilestones();
      return data?.[0] || null;
    } catch (err) {
      console.error('Error in addMilestone:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    }
  };

  const updateMilestone = async (id: string, updates: Partial<Omit<StoryMilestone, 'id' | 'created_at' | 'updated_at'>>) => {
    try {
      const { error } = await supabase
        .from('story_milestones')
        .update(updates)
        .eq('id', id);
      
      if (error) {
        console.error('Error updating milestone:', error);
        setError(error);
        return false;
      }
      
      await fetchMilestones();
      return true;
    } catch (err) {
      console.error('Error in updateMilestone:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      return false;
    }
  };

  const deleteMilestone = async (id: string) => {
    try {
      const { error } = await supabase
        .from('story_milestones')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting milestone:', error);
        setError(error);
        return false;
      }
      
      await fetchMilestones();
      return true;
    } catch (err) {
      console.error('Error in deleteMilestone:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      return false;
    }
  };

  const reorderMilestones = async (reorderedIds: string[]) => {
    try {
      // Update each milestone with its new position
      const updates = reorderedIds.map((id, index) => {
        return supabase
          .from('story_milestones')
          .update({ order_position: index + 1 })
          .eq('id', id);
      });
      
      await Promise.all(updates);
      await fetchMilestones();
      return true;
    } catch (err) {
      console.error('Error in reorderMilestones:', err);
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
