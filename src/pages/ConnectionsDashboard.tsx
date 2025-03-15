
import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Person } from '@/types/connections';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload,
  Image as ImageIcon,
  Network,
  Loader2
} from 'lucide-react';
import { uploadImageToStorage } from '@/utils/fileUtils';
import { getConnectionImage, saveConnectionImage } from '@/utils/connectionImages';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define the category type to match the Person type
type PersonCategory = 'family' | 'politics' | 'business' | 'health' | 'learning' | 'unprofessional' | 'recommended';

const ConnectionsDashboard = () => {
  const { isAuthenticated, isLoading: authLoading } = useAdminAuth('/admin/login');
  const [connections, setConnections] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingConnection, setEditingConnection] = useState<Person | null>(null);
  const [newConnection, setNewConnection] = useState<Partial<Person>>({
    name: '',
    role: '',
    category: 'business' as PersonCategory,
    relationship: '',
    special: false
  });
  const { toast } = useToast();
  
  // Load connections from localStorage or default data
  useEffect(() => {
    const loadConnections = async () => {
      setIsLoading(true);
      try {
        // First check localStorage
        const savedConnections = localStorage.getItem('connections');
        if (savedConnections) {
          try {
            const parsedConnections = JSON.parse(savedConnections);
            if (Array.isArray(parsedConnections) && parsedConnections.length > 0) {
              setConnections(parsedConnections);
              console.log('Loaded connections from localStorage:', parsedConnections.length);
            }
          } catch (error) {
            console.error('Error parsing connections data:', error);
            // Fall back to people array from FollowingSection if available
            const defaultConnections = await loadDefaultConnections();
            setConnections(defaultConnections);
          }
        } else {
          // Fall back to people array from FollowingSection if available
          const defaultConnections = await loadDefaultConnections();
          setConnections(defaultConnections);
        }
      } catch (error) {
        console.error('Error loading connections:', error);
        toast({
          title: 'Error',
          description: 'Failed to load connections data.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadConnections();
  }, [toast]);
  
  // Load default connections from imported module
  const loadDefaultConnections = async () => {
    try {
      // Dynamic import to avoid circular dependencies
      const module = await import('@/components/FollowingSection');
      if (module.people && Array.isArray(module.people)) {
        console.log('Loaded connections from FollowingSection:', module.people.length);
        return module.people;
      }
      return [];
    } catch (error) {
      console.error('Error loading default connections:', error);
      return [];
    }
  };
  
  // Save connections to localStorage
  const saveConnections = (updatedConnections: Person[]) => {
    try {
      localStorage.setItem('connections', JSON.stringify(updatedConnections));
      toast({
        title: 'Success',
        description: 'Connections saved successfully.',
      });
    } catch (error) {
      console.error('Error saving connections:', error);
      toast({
        title: 'Error',
        description: 'Failed to save connections data.',
        variant: 'destructive'
      });
    }
  };
  
  // Handle adding a new connection
  const handleAddConnection = () => {
    if (!newConnection.name || !newConnection.role || !newConnection.category) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }
    
    const id = newConnection.name.toLowerCase().replace(/\s+/g, '-');
    const newConnectionData: Person = {
      id,
      name: newConnection.name,
      role: newConnection.role,
      category: newConnection.category as PersonCategory,
      image: newConnection.image || '/placeholder.svg',
      special: newConnection.special || false,
      relationship: newConnection.relationship || '',
      socialLinks: newConnection.socialLinks || [],
      order: connections.length + 1
    };
    
    const updatedConnections = [...connections, newConnectionData];
    setConnections(updatedConnections);
    saveConnections(updatedConnections);
    
    // Reset the form
    setNewConnection({
      name: '',
      role: '',
      category: 'business' as PersonCategory,
      relationship: '',
      special: false
    });
  };
  
  // Handle editing a connection
  const handleEditConnection = (connection: Person) => {
    setEditingConnection(connection);
  };
  
  // Handle saving edited connection
  const handleSaveEdit = () => {
    if (!editingConnection) return;
    
    const updatedConnections = connections.map(conn => 
      conn.id === editingConnection.id ? editingConnection : conn
    );
    
    setConnections(updatedConnections);
    saveConnections(updatedConnections);
    setEditingConnection(null);
  };
  
  // Handle deleting a connection
  const handleDeleteConnection = (id: string) => {
    const updatedConnections = connections.filter(conn => conn.id !== id);
    setConnections(updatedConnections);
    saveConnections(updatedConnections);
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
        // Update the new connection form
        setNewConnection({
          ...newConnection,
          image: imageUrl
        });
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
        setConnections(updatedConnections);
        saveConnections(updatedConnections);
      }
      
      toast({
        title: 'Success',
        description: 'Image uploaded successfully.',
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: 'Error',
        description: 'Failed to upload image.',
        variant: 'destructive'
      });
    }
  };
  
  // Render loading state
  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {connections.map(connection => (
              <Card key={connection.id} className="overflow-hidden">
                {editingConnection && editingConnection.id === connection.id ? (
                  // Editing mode
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Edit Connection</h3>
                      <div className="space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={handleSaveEdit}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setEditingConnection(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-center mb-4">
                        <div className="relative">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={editingConnection.image || '/placeholder.svg'} alt={editingConnection.name} />
                            <AvatarFallback>
                              {editingConnection.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                            onClick={() => {
                              const input = document.getElementById(`edit-image-${connection.id}`);
                              input?.click();
                            }}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                          <Input
                            id={`edit-image-${connection.id}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, editingConnection.id)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`edit-name-${connection.id}`}>Name</Label>
                        <Input
                          id={`edit-name-${connection.id}`}
                          value={editingConnection.name}
                          onChange={(e) => setEditingConnection({
                            ...editingConnection,
                            name: e.target.value
                          })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`edit-role-${connection.id}`}>Role</Label>
                        <Input
                          id={`edit-role-${connection.id}`}
                          value={editingConnection.role}
                          onChange={(e) => setEditingConnection({
                            ...editingConnection,
                            role: e.target.value
                          })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`edit-category-${connection.id}`}>Category</Label>
                        <Select 
                          value={editingConnection.category}
                          onValueChange={(value: PersonCategory) => setEditingConnection({
                            ...editingConnection,
                            category: value
                          })}
                        >
                          <SelectTrigger id={`edit-category-${connection.id}`}>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="family">Family</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="politics">Politics</SelectItem>
                            <SelectItem value="health">Health</SelectItem>
                            <SelectItem value="learning">Learning</SelectItem>
                            <SelectItem value="unprofessional">Edgy</SelectItem>
                            <SelectItem value="recommended">Recommended</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`edit-relationship-${connection.id}`}>Relationship</Label>
                        <Input
                          id={`edit-relationship-${connection.id}`}
                          value={editingConnection.relationship || ''}
                          onChange={(e) => setEditingConnection({
                            ...editingConnection,
                            relationship: e.target.value
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`edit-special-${connection.id}`}
                          checked={editingConnection.special || false}
                          onChange={(e) => setEditingConnection({
                            ...editingConnection,
                            special: e.target.checked
                          })}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor={`edit-special-${connection.id}`}>Special Connection</Label>
                      </div>
                    </div>
                  </CardContent>
                ) : (
                  // View mode
                  <>
                    <div 
                      className="h-48 bg-slate-100 flex items-center justify-center relative"
                      style={{ 
                        backgroundImage: connection.image ? `url(${connection.image})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {!connection.image && (
                        <div className="flex flex-col items-center justify-center text-slate-400">
                          <ImageIcon size={48} />
                          <span className="mt-2">No image</span>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs">
                        {connection.role}
                      </div>
                      {connection.special && (
                        <div className="absolute bottom-2 left-2 bg-pink-100 text-pink-800 rounded-full px-2 py-1 text-xs flex items-center">
                          <span>Special</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">{connection.name}</h3>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full capitalize">{connection.category}</span>
                      </div>
                      {connection.relationship && (
                        <p className="text-sm text-muted-foreground italic">
                          "{connection.relationship.substring(0, 100)}{connection.relationship.length > 100 ? '...' : ''}"
                        </p>
                      )}
                      <div className="flex mt-2">
                        {connection.socialLinks && connection.socialLinks.length > 0 && (
                          <span className="text-xs text-muted-foreground">
                            {connection.socialLinks.length} social links
                          </span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleEditConnection(connection)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteConnection(connection.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="add" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Connection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={newConnection.image || '/placeholder.svg'} alt="New connection" />
                    <AvatarFallback>
                      {newConnection.name ? newConnection.name.substring(0, 2) : 'NC'}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                    onClick={() => {
                      const input = document.getElementById('new-connection-image');
                      input?.click();
                    }}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                  <Input
                    id="new-connection-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const id = newConnection.name?.toLowerCase().replace(/\s+/g, '-') || 'temp-id';
                      handleImageUpload(e, id, true);
                    }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-name">Name</Label>
                  <Input
                    id="new-name"
                    value={newConnection.name}
                    onChange={(e) => setNewConnection({
                      ...newConnection,
                      name: e.target.value
                    })}
                    placeholder="Enter name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-role">Role</Label>
                  <Input
                    id="new-role"
                    value={newConnection.role}
                    onChange={(e) => setNewConnection({
                      ...newConnection,
                      role: e.target.value
                    })}
                    placeholder="Enter role"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-category">Category</Label>
                <Select 
                  value={newConnection.category as PersonCategory}
                  onValueChange={(value: PersonCategory) => setNewConnection({
                    ...newConnection,
                    category: value
                  })}
                >
                  <SelectTrigger id="new-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="family">Family</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="politics">Politics</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="learning">Learning</SelectItem>
                    <SelectItem value="unprofessional">Edgy</SelectItem>
                    <SelectItem value="recommended">Recommended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-relationship">Relationship</Label>
                <Input
                  id="new-relationship"
                  value={newConnection.relationship || ''}
                  onChange={(e) => setNewConnection({
                    ...newConnection,
                    relationship: e.target.value
                  })}
                  placeholder="Describe the relationship"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="new-special"
                  checked={newConnection.special || false}
                  onChange={(e) => setNewConnection({
                    ...newConnection,
                    special: e.target.checked
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="new-special">Special Connection</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleAddConnection}
                className="ml-auto flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add Connection</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConnectionsDashboard;
