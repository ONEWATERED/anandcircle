
import React, { useState, useEffect } from 'react';
import { useSyncConnections } from '@/hooks/useSyncConnections';
import { Connection, SocialLink } from '@/types/thought-leaders';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Plus,
  RefreshCw,
  Save,
  Trash2,
  Upload,
  User,
  X,
  Heart,
  Briefcase,
  Activity,
  Flag,
  GraduationCap,
  ThumbsUp,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { uploadImageToStorage } from '@/utils/fileUtils';

const ConnectionsDashboard = () => {
  const { syncConnectionsToFrontend, isLoading: isSyncing, lastSynced } = useSyncConnections();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [editingConnection, setEditingConnection] = useState<Connection | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = async () => {
    try {
      const { data, error } = await supabase
        .from('connections')
        .select('*')
        .order('category')
        .order('order_position', { nullsLast: true })
        .order('name');

      if (error) throw error;

      // Get social links for each connection
      const { data: socialLinks, error: socialLinksError } = await supabase
        .from('connection_social_links')
        .select('*');

      if (socialLinksError) throw socialLinksError;

      const connectionsWithLinks = data.map(connection => {
        const connectionSocialLinks = socialLinks
          .filter(link => link.connection_id === connection.id)
          .map(link => ({
            id: link.id,
            platform: link.platform as any,
            url: link.url
          }));

        return {
          ...connection,
          socialLinks: connectionSocialLinks.length > 0 ? connectionSocialLinks : []
        };
      });

      setConnections(connectionsWithLinks);
    } catch (error) {
      console.error('Error loading connections:', error);
      toast({
        title: 'Error',
        description: 'Failed to load connections',
        variant: 'destructive'
      });
    }
  };

  const getFilteredConnections = () => {
    if (activeTab === 'all') return connections;
    return connections.filter(c => c.category === activeTab);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'family':
        return <Heart className="h-4 w-4" />;
      case 'business':
        return <Briefcase className="h-4 w-4" />;
      case 'health':
        return <Activity className="h-4 w-4" />;
      case 'politics':
        return <Flag className="h-4 w-4" />;
      case 'learning':
        return <GraduationCap className="h-4 w-4" />;
      case 'recommended':
        return <ThumbsUp className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleEditConnection = (connection: Connection) => {
    setEditingConnection({
      ...connection,
      socialLinks: connection.socialLinks || []
    });
  };

  const handleCancelEdit = () => {
    setEditingConnection(null);
  };

  const handleSaveConnection = async () => {
    if (!editingConnection || !editingConnection.name || !editingConnection.role || !editingConnection.category) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    setIsSaving(true);
    try {
      // Update or insert connection
      const { error } = await supabase
        .from('connections')
        .upsert({
          id: editingConnection.id,
          name: editingConnection.name,
          role: editingConnection.role,
          category: editingConnection.category,
          bio: editingConnection.bio,
          image_url: editingConnection.image_url,
          special: editingConnection.special || false,
          order_position: editingConnection.order_position || 0
        });

      if (error) throw error;

      // Handle social links
      if (editingConnection.socialLinks && editingConnection.socialLinks.length > 0) {
        // Delete existing links first
        const { error: deleteError } = await supabase
          .from('connection_social_links')
          .delete()
          .eq('connection_id', editingConnection.id);

        if (deleteError) throw deleteError;

        // Insert new links
        const linksToInsert = editingConnection.socialLinks.map(link => ({
          connection_id: editingConnection.id,
          platform: link.platform,
          url: link.url
        }));

        const { error: insertError } = await supabase
          .from('connection_social_links')
          .insert(linksToInsert);

        if (insertError) throw insertError;
      }

      // Refresh the data
      loadConnections();
      syncConnectionsToFrontend();
      setEditingConnection(null);

      toast({
        title: 'Success',
        description: 'Connection saved successfully'
      });
    } catch (error) {
      console.error('Error saving connection:', error);
      toast({
        title: 'Error',
        description: 'Failed to save connection',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingConnection) return;

    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsSaving(true);
      const imageUrl = await uploadImageToStorage(file, 'connections');
      
      if (imageUrl) {
        setEditingConnection(prev => prev ? {...prev, image_url: imageUrl} : null);
        
        toast({
          title: 'Success',
          description: 'Image uploaded successfully'
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConnection = async (connectionId: string) => {
    if (!confirm('Are you sure you want to delete this connection?')) return;

    try {
      // Delete will cascade to social links due to foreign key constraints
      const { error } = await supabase
        .from('connections')
        .delete()
        .eq('id', connectionId);

      if (error) throw error;

      loadConnections();
      syncConnectionsToFrontend();

      toast({
        title: 'Success',
        description: 'Connection deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting connection:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete connection',
        variant: 'destructive'
      });
    }
  };

  const handleAddSocialLink = () => {
    if (!editingConnection) return;
    
    setEditingConnection({
      ...editingConnection,
      socialLinks: [
        ...(editingConnection.socialLinks || []),
        { platform: 'instagram', url: '' }
      ]
    });
  };

  const handleRemoveSocialLink = (index: number) => {
    if (!editingConnection || !editingConnection.socialLinks) return;
    
    const newLinks = [...editingConnection.socialLinks];
    newLinks.splice(index, 1);
    
    setEditingConnection({
      ...editingConnection,
      socialLinks: newLinks
    });
  };

  const handleUpdateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    if (!editingConnection || !editingConnection.socialLinks) return;
    
    const newLinks = [...editingConnection.socialLinks];
    newLinks[index] = {
      ...newLinks[index],
      [field]: value
    };
    
    setEditingConnection({
      ...editingConnection,
      socialLinks: newLinks
    });
  };

  const handleAddNewConnection = () => {
    const newConnection: Connection = {
      id: `connection-${Date.now()}`,
      name: '',
      role: '',
      category: 'business',
      special: false,
      order_position: connections.length + 1,
      socialLinks: []
    };
    setEditingConnection(newConnection);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Connections</h1>
          <p className="text-muted-foreground">
            Manage your non-family connections, thought leaders, and inspirations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={syncConnectionsToFrontend} 
            variant="outline"
            disabled={isSyncing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            Sync to Frontend
          </Button>
          {lastSynced && (
            <span className="text-xs text-muted-foreground">
              Last synced: {lastSynced.toLocaleTimeString()}
            </span>
          )}
          <Button onClick={handleAddNewConnection}>
            <Plus className="mr-2 h-4 w-4" />
            Add Connection
          </Button>
        </div>
      </div>

      {/* Editing Card */}
      {editingConnection && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {editingConnection.id.startsWith('connection-') ? 'Add' : 'Edit'} Connection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={editingConnection.image_url} />
                    <AvatarFallback>
                      <User className="h-16 w-16 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <Label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="flex items-center space-x-2 bg-muted p-2 rounded-md hover:bg-muted/80 transition-colors">
                      <Upload className="h-4 w-4" />
                      <span>Upload Photo</span>
                    </div>
                    <Input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={isSaving}
                    />
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="id">ID (used internally)</Label>
                  <Input
                    id="id"
                    value={editingConnection.id}
                    readOnly
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={editingConnection.category}
                    onChange={(e) => setEditingConnection({
                      ...editingConnection,
                      category: e.target.value
                    })}
                  >
                    <option value="business">Business</option>
                    <option value="health">Health</option>
                    <option value="politics">Politics</option>
                    <option value="learning">Learning</option>
                    <option value="recommended">Recommended</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="special"
                    checked={editingConnection.special || false}
                    onCheckedChange={(checked) => setEditingConnection({
                      ...editingConnection,
                      special: checked
                    })}
                  />
                  <Label htmlFor="special">Mark as special connection</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={editingConnection.order_position || 0}
                    onChange={(e) => setEditingConnection({
                      ...editingConnection,
                      order_position: parseInt(e.target.value) || 0
                    })}
                  />
                </div>
              </div>

              <div className="space-y-4 md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={editingConnection.name}
                      onChange={(e) => setEditingConnection({
                        ...editingConnection,
                        name: e.target.value
                      })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role/Position *</Label>
                    <Input
                      id="role"
                      value={editingConnection.role}
                      onChange={(e) => setEditingConnection({
                        ...editingConnection,
                        role: e.target.value
                      })}
                      placeholder="e.g. Entrepreneur, Author, etc."
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio/Relationship</Label>
                  <Textarea
                    id="bio"
                    value={editingConnection.bio || ''}
                    onChange={(e) => setEditingConnection({
                      ...editingConnection,
                      bio: e.target.value
                    })}
                    rows={4}
                    placeholder="Describe your relationship or why they inspire you"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Social Media Links</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={handleAddSocialLink}
                    >
                      <Plus size={16} className="mr-1" />
                      Add Link
                    </Button>
                  </div>
                  
                  {editingConnection.socialLinks && editingConnection.socialLinks.map((link, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={link.platform}
                        onChange={(e) => handleUpdateSocialLink(index, 'platform', e.target.value as any)}
                      >
                        <option value="instagram">Instagram</option>
                        <option value="twitter">Twitter</option>
                        <option value="youtube">YouTube</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="facebook">Facebook</option>
                        <option value="spotify">Spotify</option>
                      </select>
                      
                      <Input
                        value={link.url}
                        onChange={(e) => handleUpdateSocialLink(index, 'url', e.target.value)}
                        placeholder={`https://${link.platform}.com/...`}
                      />
                      
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveSocialLink(index)}
                      >
                        <X size={16} className="text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-2">
              <Button variant="outline" onClick={handleCancelEdit} disabled={isSaving}>
                Cancel
              </Button>
              <Button onClick={handleSaveConnection} disabled={isSaving}>
                {isSaving && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Connections Tabs and List */}
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="business" className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            <span>Business</span>
          </TabsTrigger>
          <TabsTrigger value="health" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            <span>Health</span>
          </TabsTrigger>
          <TabsTrigger value="politics" className="flex items-center gap-1">
            <Flag className="h-4 w-4" />
            <span>Politics</span>
          </TabsTrigger>
          <TabsTrigger value="learning" className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4" />
            <span>Learning</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {renderConnectionsList(getFilteredConnections())}
        </TabsContent>
        <TabsContent value="business" className="mt-0">
          {renderConnectionsList(getFilteredConnections())}
        </TabsContent>
        <TabsContent value="health" className="mt-0">
          {renderConnectionsList(getFilteredConnections())}
        </TabsContent>
        <TabsContent value="politics" className="mt-0">
          {renderConnectionsList(getFilteredConnections())}
        </TabsContent>
        <TabsContent value="learning" className="mt-0">
          {renderConnectionsList(getFilteredConnections())}
        </TabsContent>
      </Tabs>
    </div>
  );

  function renderConnectionsList(filteredConnections: Connection[]) {
    if (filteredConnections.length === 0) {
      return (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No connections found in this category. Add your first connection.</p>
        </Card>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConnections.map((connection) => (
          <Card key={connection.id} className="overflow-hidden">
            <div 
              className="h-48 flex items-center justify-center relative"
              style={{ 
                backgroundImage: connection.image_url ? `url(${connection.image_url})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {!connection.image_url && (
                <Avatar className="h-24 w-24">
                  <AvatarFallback>
                    {connection.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs">
                {connection.role}
              </div>
              {connection.special && (
                <div className="absolute bottom-2 left-2 bg-pink-100 text-pink-800 rounded-full px-2 py-1 text-xs flex items-center">
                  <Heart className="h-3 w-3 mr-1" />
                  <span>Special</span>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{connection.name}</h3>
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-xs capitalize">
                  {getCategoryIcon(connection.category)}
                  <span>{connection.category}</span>
                </div>
              </div>
              
              {connection.bio && (
                <p className="text-sm text-muted-foreground italic">
                  "{connection.bio.substring(0, 100)}{connection.bio.length > 100 ? '...' : ''}"
                </p>
              )}
              
              {connection.socialLinks && connection.socialLinks.length > 0 && (
                <div className="mt-2 flex gap-2">
                  {connection.socialLinks.map((link, i) => (
                    <div key={i} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {link.platform}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex justify-end mt-4 space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleEditConnection(connection)}>
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={() => handleDeleteConnection(connection.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
};

export default ConnectionsDashboard;
