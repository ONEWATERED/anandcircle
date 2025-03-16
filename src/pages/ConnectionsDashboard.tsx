import React, { useState, useEffect } from 'react';
import { useSyncConnections } from '@/hooks/useSyncConnections';
import { Connection, SocialLink } from '@/types/thought-leaders';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Plus, RefreshCw, Save, Trash2, Upload, User, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { uploadImageToStorage } from '@/utils/fileUtils';

const ConnectionsDashboard = () => {
  const { syncConnectionsToFrontend, isLoading, lastSynced } = useSyncConnections();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [editingConnection, setEditingConnection] = useState<Connection | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = async () => {
    try {
      const { data, error } = await supabase
        .from('connections')
        .select('*')
        .order('order_position', { nullsFirst: false })
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
    if (!editingConnection || !editingConnection.name || !editingConnection.role) {
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
          bio: editingConnection.bio,
          image_url: editingConnection.image_url,
          special: editingConnection.special,
          order_position: editingConnection.order_position || 0,
          category: editingConnection.category
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
            Manage your connections and professional network.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={syncConnectionsToFrontend} 
            variant="outline"
            disabled={isLoading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
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
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex items-center space-x-2 bg-muted p-2 rounded-md hover:bg-muted/80 transition-colors">
                      <Upload className="h-4 w-4" />
                      <span>Upload Image</span>
                    </div>
                    <Input
                      id="image-upload"
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
                    <Label htmlFor="role">Role *</Label>
                    <Input
                      id="role"
                      value={editingConnection.role}
                      onChange={(e) => setEditingConnection({
                        ...editingConnection,
                        role: e.target.value
                      })}
                      placeholder="e.g. CEO, Manager, Consultant"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={editingConnection.category}
                    onChange={(e) => setEditingConnection({
                      ...editingConnection,
                      category: e.target.value
                    })}
                  >
                    <option value="business">Business</option>
                    <option value="personal">Personal</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={editingConnection.bio || ''}
                    onChange={(e) => setEditingConnection({
                      ...editingConnection,
                      bio: e.target.value
                    })}
                    rows={4}
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

      {/* List of Connections */}
      {connections.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No connections found. Add your first connection.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => (
            <Card key={connection.id} className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-primary/5 to-primary/10 flex items-center justify-center">
                <Avatar className="h-24 w-24 border-2 border-primary/30">
                  <AvatarImage src={connection.image_url} />
                  <AvatarFallback className="bg-primary/20">
                    {connection.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{connection.name}</h3>
                  <p className="text-sm text-muted-foreground">{connection.role}</p>
                  
                  {connection.bio && (
                    <p className="mt-2 text-sm italic">
                      "{connection.bio.length > 100 ? connection.bio.substring(0, 100) + '...' : connection.bio}"
                    </p>
                  )}
                  
                  {connection.socialLinks && connection.socialLinks.length > 0 && (
                    <div className="mt-2 flex justify-center gap-2">
                      {connection.socialLinks.map((link, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {link.platform}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center mt-4 space-x-2">
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
      )}
    </div>
  );
};

export default ConnectionsDashboard;
