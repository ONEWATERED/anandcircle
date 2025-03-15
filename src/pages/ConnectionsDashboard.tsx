
import React, { useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Person } from '@/types/connections';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getConnectionImage, saveConnectionImage } from '@/utils/connectionImages';
import { uploadImageToStorage } from '@/utils/fileUtils';
import { useConnections } from '@/hooks/useConnections';
import ConnectionList from '@/components/connections/ConnectionList';
import NewConnectionForm from '@/components/connections/NewConnectionForm';

const ConnectionsDashboard = () => {
  const { isAuthenticated, isLoading: authLoading } = useAdminAuth('/admin/login');
  const { connections, isLoading, addConnection, updateConnection, deleteConnection } = useConnections();
  const [editingConnection, setEditingConnection] = useState<Person | null>(null);
  const { toast } = useToast();
  
  // Handle editing a connection
  const handleEditConnection = (connection: Person) => {
    setEditingConnection(connection);
  };
  
  // Handle saving edited connection
  const handleSaveEdit = () => {
    if (!editingConnection) return;
    updateConnection(editingConnection);
    setEditingConnection(null);
  };
  
  // Handle adding a new connection
  const handleAddConnection = (newConnectionData: Partial<Person>) => {
    addConnection(newConnectionData);
  };
  
  // Handle image upload for a connection
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>, 
    personId: string,
    isNewConnection: boolean = false
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      toast({
        title: 'Uploading',
        description: 'Uploading image...',
      });
      
      // Upload image to storage
      const imageUrl = await uploadImageToStorage(file, personId);
      
      if (!imageUrl) {
        throw new Error("Failed to upload image");
      }
      
      // Save connection image reference
      await saveConnectionImage(personId, imageUrl);
      
      if (isNewConnection) {
        // The image URL will be picked up when the new connection is created
        return imageUrl;
      } else if (editingConnection && editingConnection.id === personId) {
        // Update the editing connection
        setEditingConnection({
          ...editingConnection,
          image: imageUrl
        });
      } else {
        // Update the connections list
        const updatedConnections = connections.map(conn => 
          conn.id === personId ? { ...conn, image: imageUrl } : conn
        );
        
        // Use the updateConnection function for each affected connection
        const affectedConnection = updatedConnections.find(conn => conn.id === personId);
        if (affectedConnection) {
          updateConnection(affectedConnection);
        }
      }
      
      toast({
        title: 'Success',
        description: 'Image uploaded successfully.',
      });
      
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: 'Error',
        description: 'Failed to upload image.',
        variant: 'destructive'
      });
      return null;
    }
  };
  
  // Render loading state
  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }
  
  // Redirect handled by the hook
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Connections Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your connections and relationships from this dashboard.
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Connections</TabsTrigger>
          <TabsTrigger value="add">Add New Connection</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <ConnectionList
            connections={connections}
            editingConnection={editingConnection}
            onEdit={handleEditConnection}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={() => setEditingConnection(null)}
            onDelete={deleteConnection}
            onImageUpload={handleImageUpload}
          />
        </TabsContent>
        
        <TabsContent value="add" className="space-y-6">
          <NewConnectionForm
            onAddConnection={handleAddConnection}
            onImageUpload={handleImageUpload}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConnectionsDashboard;
