
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, Loader2, Brain } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useConnections } from '@/hooks/useConnections';
import { Person } from '@/types/connections';
import ConnectionsCategoryTabs from '@/components/connections/ConnectionsCategoryTabs';
import ConnectionsDashboardHeader from '@/components/connections/ConnectionsDashboardHeader';
import { useSyncThoughtLeaders } from '@/hooks/useSyncThoughtLeaders';

const ConnectionsDashboard = () => {
  const { connections, isLoading, addConnection, updateConnection, deleteConnection } = useConnections();
  const [search, setSearch] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  const [editingConnection, setEditingConnection] = useState<Person | null>(null);
  const [filteredConnections, setFilteredConnections] = useState<Person[]>([]);
  const { syncThoughtLeadersToFrontend, isLoading: isSyncing } = useSyncThoughtLeaders();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Filter connections based on search and active tab
  useEffect(() => {
    let filtered = [...connections];
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        connection => 
          connection.name.toLowerCase().includes(searchLower) || 
          connection.role.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply category filter
    if (activeCategoryTab !== 'all') {
      filtered = filtered.filter(connection => connection.category === activeCategoryTab);
    }
    
    setFilteredConnections(filtered);
  }, [connections, search, activeCategoryTab]);

  // Edit a connection
  const handleEditConnection = (connection: Person) => {
    setEditingConnection(connection);
  };
  
  // Save edited connection
  const handleSaveEdit = () => {
    if (editingConnection) {
      updateConnection(editingConnection);
      setEditingConnection(null);
      toast({
        title: "Connection Updated",
        description: `${editingConnection.name} has been updated successfully.`
      });
    }
  };
  
  // Cancel editing
  const handleCancelEdit = () => {
    setEditingConnection(null);
  };
  
  // Delete a connection
  const handleDeleteConnection = (id: string) => {
    const connectionToDelete = connections.find(c => c.id === id);
    if (connectionToDelete) {
      if (confirm(`Are you sure you want to delete ${connectionToDelete.name}?`)) {
        deleteConnection(id);
        toast({
          title: "Connection Deleted",
          description: `${connectionToDelete.name} has been removed from your connections.`
        });
      }
    }
  };
  
  // Image upload for a connection
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, personId: string) => {
    // This is handled in the EditConnectionForm component using fileUtils
  };
  
  // Sync with the thought leaders database
  const handleSyncConnections = async () => {
    const success = await syncThoughtLeadersToFrontend();
    if (success) {
      toast({
        title: "Sync Complete",
        description: "Your connections have been synchronized with the thought leaders database."
      });
    }
  };

  return (
    <div className="container max-w-7xl mx-auto py-6">
      <div className="flex flex-col space-y-6">
        <ConnectionsDashboardHeader 
          onSyncConnections={handleSyncConnections} 
          isSyncing={isSyncing}
        />
        
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search connections..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <Button
            onClick={() => navigate('/admin/thought-leaders')}
            className="flex items-center gap-2"
          >
            <Brain className="h-4 w-4" />
            <span>Manage Thought Leaders</span>
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Connections</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConnectionsDashboard;
