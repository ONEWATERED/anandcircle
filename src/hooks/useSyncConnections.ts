
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Connection, SocialLink } from '@/types/thought-leaders';
import { useToast } from '@/components/ui/use-toast';

export const useSyncConnections = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const { toast } = useToast();

  const syncConnectionsToFrontend = async () => {
    setIsLoading(true);
    try {
      // Get all connections from the database
      const { data: connectionsData, error: connectionsError } = await supabase
        .from('connections')
        .select('*')
        .order('category')
        .order('order_position', { nullsLast: true })
        .order('name');

      if (connectionsError) throw connectionsError;

      // Get all social links for the connections
      const { data: socialLinksData, error: socialLinksError } = await supabase
        .from('connection_social_links')
        .select('*');

      if (socialLinksError) throw socialLinksError;

      // Convert the data to the format expected by the frontend
      const connections: Connection[] = connectionsData.map(connection => {
        const connectionSocialLinks = socialLinksData
          .filter(link => link.connection_id === connection.id)
          .map(link => ({ 
            id: link.id,
            platform: link.platform as any, 
            url: link.url 
          }));
        
        return {
          id: connection.id,
          name: connection.name,
          role: connection.role,
          category: connection.category,
          bio: connection.bio,
          image_url: connection.image_url,
          special: connection.special,
          order_position: connection.order_position,
          socialLinks: connectionSocialLinks.length > 0 ? connectionSocialLinks : undefined,
          created_at: connection.created_at,
          updated_at: connection.updated_at
        };
      });

      // Save the data to localStorage for the frontend components to use
      localStorage.setItem('connections', JSON.stringify(connections));
      
      // Update the last synced time
      setLastSynced(new Date());
      
      toast({
        title: 'Sync Successful',
        description: 'Connections have been synchronized with the frontend'
      });
      
      return true;
    } catch (error) {
      console.error('Error syncing connections:', error);
      
      toast({
        title: 'Sync Failed',
        description: 'Failed to synchronize connections with the frontend',
        variant: 'destructive'
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    syncConnectionsToFrontend,
    isLoading,
    lastSynced
  };
};
