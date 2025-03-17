import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Connection, SocialLink } from '@/types/thought-leaders';
import { useSyncConnections } from './useSyncConnections';

export const useAdminConnections = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const { toast } = useToast();
  const { syncConnectionsToFrontend } = useSyncConnections();

  useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('connections')
        .select('*')
        .order('category')
        .order('order_position', { nullsFirst: false })
        .order('name');

      if (error) throw error;

      const { data: socialLinksData, error: socialLinksError } = await supabase
        .from('connection_social_links')
        .select('*');

      if (socialLinksError) throw socialLinksError;

      const connectionsWithLinks = data.map(connection => {
        const links = socialLinksData
          .filter(link => link.connection_id === connection.id)
          .map(link => ({
            id: link.id,
            platform: link.platform as 'instagram' | 'youtube' | 'twitter' | 'linkedin' | 'facebook' | 'spotify' | 'anandcircle',
            url: link.url
          }));

        return {
          ...connection,
          socialLinks: links.length > 0 ? links : undefined
        };
      });

      setConnections(connectionsWithLinks);
    } catch (error) {
      console.error('Error loading connections:', error);
      toast({
        title: 'Error',
        description: 'Failed to load connections data',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addConnection = async (connection: Partial<Connection>) => {
    try {
      if (!connection.name || !connection.role || !connection.category) {
        toast({
          title: 'Error',
          description: 'Name, role, and category are required fields',
          variant: 'destructive'
        });
        return false;
      }
      
      const id = `connection-${Date.now()}`;
      
      const { error } = await supabase
        .from('connections')
        .insert({
          id,
          name: connection.name,
          role: connection.role,
          category: connection.category,
          special: connection.special || false,
          bio: connection.bio || null,
          image_url: connection.image_url || null,
          order_position: connection.order_position || null
        });

      if (error) throw error;

      if (connection.socialLinks && connection.socialLinks.length > 0) {
        const socialLinksToInsert = connection.socialLinks.map(link => ({
          connection_id: id,
          platform: link.platform,
          url: link.url
        }));

        const { error: linksError } = await supabase
          .from('connection_social_links')
          .insert(socialLinksToInsert);

        if (linksError) throw linksError;
      }

      await syncConnectionsToFrontend();
      
      await loadConnections();
      
      toast({
        title: 'Success',
        description: 'Connection added successfully'
      });
      
      return true;
    } catch (error) {
      console.error('Error adding connection:', error);
      toast({
        title: 'Error',
        description: 'Failed to add connection',
        variant: 'destructive'
      });
      return false;
    }
  };

  const updateConnection = async (connection: Connection) => {
    try {
      const { error } = await supabase
        .from('connections')
        .update({
          name: connection.name,
          role: connection.role,
          category: connection.category,
          special: connection.special || false,
          bio: connection.bio || null,
          image_url: connection.image_url || null,
          order_position: connection.order_position || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', connection.id);

      if (error) throw error;

      const { error: deleteError } = await supabase
        .from('connection_social_links')
        .delete()
        .eq('connection_id', connection.id);

      if (deleteError) throw deleteError;

      if (connection.socialLinks && connection.socialLinks.length > 0) {
        const socialLinksToInsert = connection.socialLinks.map(link => ({
          connection_id: connection.id,
          platform: link.platform,
          url: link.url
        }));

        const { error: linksError } = await supabase
          .from('connection_social_links')
          .insert(socialLinksToInsert);

        if (linksError) throw linksError;
      }

      await syncConnectionsToFrontend();
      
      await loadConnections();
      
      toast({
        title: 'Success',
        description: 'Connection updated successfully'
      });
      
      return true;
    } catch (error) {
      console.error('Error updating connection:', error);
      toast({
        title: 'Error',
        description: 'Failed to update connection',
        variant: 'destructive'
      });
      return false;
    }
  };

  const deleteConnection = async (id: string) => {
    try {
      const { error: linksError } = await supabase
        .from('connection_social_links')
        .delete()
        .eq('connection_id', id);

      if (linksError) throw linksError;

      const { error } = await supabase
        .from('connections')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await syncConnectionsToFrontend();
      
      await loadConnections();
      
      if (selectedConnection && selectedConnection.id === id) {
        setSelectedConnection(null);
      }
      
      toast({
        title: 'Success',
        description: 'Connection deleted successfully'
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting connection:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete connection',
        variant: 'destructive'
      });
      return false;
    }
  };

  const uploadConnectionImage = async (file: File, connectionId: string) => {
    try {
      if (!file) return null;
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${connectionId}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('connection-images')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      const { data: publicUrlData } = supabase.storage
        .from('connection-images')
        .getPublicUrl(fileName);
      
      const imageUrl = publicUrlData.publicUrl;
      
      const { error: updateError } = await supabase
        .from('connections')
        .update({ image_url: imageUrl })
        .eq('id', connectionId);
      
      if (updateError) throw updateError;
      
      const { error: imageError } = await supabase
        .rpc('store_connection_image', { 
          p_person_id: connectionId,
          p_image_path: imageUrl
        });
      
      if (imageError) {
        console.error('Error storing image in connection_images table:', imageError);
      }
      
      await syncConnectionsToFrontend();
      
      await loadConnections();
      
      toast({
        title: 'Success',
        description: 'Image uploaded successfully'
      });
      
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive'
      });
      return null;
    }
  };

  return {
    connections,
    isLoading,
    selectedConnection,
    setSelectedConnection,
    addConnection,
    updateConnection,
    deleteConnection,
    uploadConnectionImage,
    loadConnections
  };
};
