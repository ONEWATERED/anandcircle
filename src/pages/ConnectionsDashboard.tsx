
import React, { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { useConnections } from '@/hooks/useConnections';
import { Person } from '@/types/connections';
import { useToast } from '@/hooks/use-toast';
import { syncAllConnections } from '@/utils/syncConnections';
import ConnectionsDashboardHeader from '@/components/connections/ConnectionsDashboardHeader';
import ConnectionsLoader from '@/components/connections/ConnectionsLoader';
import ConnectionsCategoryTabs from '@/components/connections/ConnectionsCategoryTabs';
import { uploadImageToStorage } from '@/utils/fileUtils';
import { saveConnectionImage } from '@/utils/imageLoader';

const ConnectionsDashboard = () => {
  const { 
    connections, 
    isLoading, 
    addConnection, 
    updateConnection, 
    deleteConnection, 
    setConnections 
  } = useConnections();
  const [editingConnection, setEditingConnection] = useState<Person | null>(null);
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();
  
  // Filter connections based on the selected category
  const filteredConnections = activeCategoryTab === 'all' 
    ? connections 
    : connections.filter(conn => conn.category === activeCategoryTab);
  
  // Handle image upload for connection
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, personId: string) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      toast({
        title: 'Uploading image',
        description: 'Please wait while we upload the image...'
      });
      
      // Upload the image file
      const imageUrl = await uploadImageToStorage(file, `connection-${personId}`);
      
      if (imageUrl) {
        // Save connection image to the database
        await saveConnectionImage(personId, imageUrl);
        
        // Update the connection in the local state
        const updatedConnections = connections.map(conn => {
          if (conn.id === personId) {
            return { ...conn, image: imageUrl };
          }
          return conn;
        });
        
        setConnections(updatedConnections);
        
        toast({
          title: 'Success',
          description: 'Image uploaded successfully!'
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload image.',
        variant: 'destructive'
      });
    }
  };
  
  const handleSyncConnections = async () => {
    setIsSyncing(true);
    try {
      const result = await syncAllConnections();
      
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Connections synced successfully with database!'
        });
      } else {
        toast({
          title: 'Warning',
          description: result.message,
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error syncing connections:', error);
      toast({
        title: 'Error',
        description: 'Failed to sync connections with database.',
        variant: 'destructive'
      });
    } finally {
      setIsSyncing(false);
    }
  };
  
  // Edit connection
  const handleEditConnection = (connection: Person) => {
    setEditingConnection(connection);
  };
  
  // Save edited connection
  const handleSaveEdit = () => {
    if (editingConnection) {
      updateConnection(editingConnection);
      setEditingConnection(null);
    }
  };
  
  // Cancel editing
  const handleCancelEdit = () => {
    setEditingConnection(null);
  };
  
  // Delete connection
  const handleDeleteConnection = (id: string) => {
    if (window.confirm('Are you sure you want to delete this connection?')) {
      deleteConnection(id);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col space-y-8">
          <ConnectionsDashboardHeader 
            onSyncConnections={handleSyncConnections} 
            isSyncing={isSyncing} 
          />
          
          {isLoading ? (
            <ConnectionsLoader />
          ) : (
            <ConnectionsCategoryTabs 
              connections={connections}
              activeCategoryTab={activeCategoryTab}
              setActiveCategoryTab={setActiveCategoryTab}
              filteredConnections={filteredConnections}
              editingConnection={editingConnection}
              onEditConnection={handleEditConnection}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              onDeleteConnection={handleDeleteConnection}
              onImageUpload={handleImageUpload}
              addConnection={addConnection}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ConnectionsDashboard;
