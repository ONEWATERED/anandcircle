
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Connection } from '@/types/thought-leaders';
import { useToast } from '@/components/ui/use-toast';

export const useSyncThoughtLeaders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const { toast } = useToast();

  const syncThoughtLeadersToFrontend = async () => {
    setIsLoading(true);
    try {
      // Get all connections from the database instead of thought_leaders
      const { data: leadersData, error: leadersError } = await supabase
        .from('connections')
        .select('*')
        .order('category')
        .order('order_position', { nullsFirst: false })
        .order('name');

      if (leadersError) throw leadersError;

      // Get all social links for the connections
      const { data: socialLinksData, error: socialLinksError } = await supabase
        .from('connection_social_links')
        .select('*');

      if (socialLinksError) throw socialLinksError;

      // Convert the data to the format expected by the frontend
      const connections = leadersData.map(leader => {
        const leaderSocialLinks = socialLinksData
          .filter(link => link.connection_id === leader.id)
          .map(link => ({ 
            platform: link.platform as 'instagram' | 'youtube' | 'twitter', 
            url: link.url 
          }));
        
        return {
          id: leader.id,
          name: leader.name,
          role: leader.role,
          category: leader.category,
          image: leader.image_url,
          special: leader.special,
          bio: leader.bio,
          socialLinks: leaderSocialLinks.length > 0 ? leaderSocialLinks : undefined,
          order: leader.order_position
        };
      });

      // Save the data to localStorage for the frontend components to use
      localStorage.setItem('connections', JSON.stringify(connections));
      
      // Update the last synced time
      setLastSynced(new Date());
      
      toast({
        title: 'Sync Successful',
        description: 'Thought leaders have been synchronized with the frontend'
      });
      
      return true;
    } catch (error) {
      console.error('Error syncing thought leaders:', error);
      
      toast({
        title: 'Sync Failed',
        description: 'Failed to synchronize thought leaders with the frontend',
        variant: 'destructive'
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    syncThoughtLeadersToFrontend,
    isLoading,
    lastSynced
  };
};
