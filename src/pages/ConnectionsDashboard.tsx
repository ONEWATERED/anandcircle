
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { useConnections } from '@/hooks/useConnections';
import { Person } from '@/types/connections';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConnectionList from '@/components/connections/ConnectionList';
import NewConnectionForm from '@/components/connections/NewConnectionForm';
import { uploadImageToStorage } from '@/utils/fileUtils';
import { saveConnectionImage } from '@/utils/imageLoader';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, RefreshCw, Users, Heart, Activity, Flag, Briefcase } from 'lucide-react';
import { syncAllConnections } from '@/utils/syncConnections';

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
  
  // Group by category for display
  const familyConnections = connections.filter(conn => conn.category === 'family');
  const businessConnections = connections.filter(conn => conn.category === 'business');
  const healthConnections = connections.filter(conn => conn.category === 'health');
  const politicsConnections = connections.filter(conn => conn.category === 'politics');
  
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Manage Connections</h1>
              <p className="text-muted-foreground">
                Add, edit, or remove people in your network
              </p>
            </div>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleSyncConnections}
              disabled={isSyncing}
            >
              {isSyncing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              <span>Sync Connections</span>
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <Tabs defaultValue="all" onValueChange={setActiveCategoryTab}>
              <TabsList className="grid grid-cols-5 w-full max-w-3xl mx-auto">
                <TabsTrigger value="all" className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>All ({connections.length})</span>
                </TabsTrigger>
                <TabsTrigger value="family" className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>Family ({familyConnections.length})</span>
                </TabsTrigger>
                <TabsTrigger value="business" className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>Business ({businessConnections.length})</span>
                </TabsTrigger>
                <TabsTrigger value="health" className="flex items-center gap-1">
                  <Activity className="h-4 w-4" />
                  <span>Health ({healthConnections.length})</span>
                </TabsTrigger>
                <TabsTrigger value="politics" className="flex items-center gap-1">
                  <Flag className="h-4 w-4" />
                  <span>Politics ({politicsConnections.length})</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1">
                  <NewConnectionForm 
                    onAddConnection={addConnection}
                    onImageUpload={handleImageUpload}
                  />
                </div>
                
                <div className="col-span-1 md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {activeCategoryTab === 'all' 
                          ? 'All Connections' 
                          : `${activeCategoryTab.charAt(0).toUpperCase() + activeCategoryTab.slice(1)} Connections`}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ConnectionList
                        connections={filteredConnections}
                        editingConnection={editingConnection}
                        onEdit={handleEditConnection}
                        onSaveEdit={handleSaveEdit}
                        onCancelEdit={handleCancelEdit}
                        onDelete={handleDeleteConnection}
                        onImageUpload={handleImageUpload}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Tabs>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ConnectionsDashboard;
