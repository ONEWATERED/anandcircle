import React, { useState, useEffect } from 'react';
import { useSyncFamilyMembers } from '@/hooks/useSyncFamilyMembers';
import { FamilyMember, SocialLink } from '@/types/thought-leaders';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Plus, RefreshCw, Save, Trash2, Upload, User, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { uploadImageToStorage } from '@/utils/fileUtils';

const FamilyMembersDashboard = () => {
  const { syncFamilyMembersToFrontend, isLoading, lastSynced } = useSyncFamilyMembers();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    loadFamilyMembers();
  }, []);

  const loadFamilyMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('family_members')
        .select('*')
        .order('order_position', { nullsFirst: false })
        .order('name');

      if (error) throw error;

      const { data: socialLinks, error: socialLinksError } = await supabase
        .from('family_social_links')
        .select('*');

      if (socialLinksError) throw socialLinksError;

      const membersWithLinks = data.map(member => {
        const memberSocialLinks = socialLinks
          .filter(link => link.family_member_id === member.id)
          .map(link => ({
            id: link.id,
            platform: link.platform as any,
            url: link.url
          }));

        return {
          ...member,
          socialLinks: memberSocialLinks.length > 0 ? memberSocialLinks : []
        };
      });

      setFamilyMembers(membersWithLinks);
    } catch (error) {
      console.error('Error loading family members:', error);
      toast({
        title: 'Error',
        description: 'Failed to load family members',
        variant: 'destructive'
      });
    }
  };

  const handleEditMember = (member: FamilyMember) => {
    setEditingMember({
      ...member,
      socialLinks: member.socialLinks || []
    });
  };

  const handleCancelEdit = () => {
    setEditingMember(null);
  };

  const handleSaveMember = async () => {
    if (!editingMember || !editingMember.name || !editingMember.role) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('family_members')
        .upsert({
          id: editingMember.id,
          name: editingMember.name,
          role: editingMember.role,
          bio: editingMember.bio,
          photo_url: editingMember.photo_url,
          order_position: editingMember.order_position || 0
        });

      if (error) throw error;

      if (editingMember.socialLinks && editingMember.socialLinks.length > 0) {
        const { error: deleteError } = await supabase
          .from('family_social_links')
          .delete()
          .eq('family_member_id', editingMember.id);

        if (deleteError) throw deleteError;

        const linksToInsert = editingMember.socialLinks.map(link => ({
          family_member_id: editingMember.id,
          platform: link.platform,
          url: link.url
        }));

        const { error: insertError } = await supabase
          .from('family_social_links')
          .insert(linksToInsert);

        if (insertError) throw insertError;
      }

      loadFamilyMembers();
      syncFamilyMembersToFrontend();
      setEditingMember(null);

      toast({
        title: 'Success',
        description: 'Family member saved successfully'
      });
    } catch (error) {
      console.error('Error saving family member:', error);
      toast({
        title: 'Error',
        description: 'Failed to save family member',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingMember) return;

    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsSaving(true);
      const photoUrl = await uploadImageToStorage(file, 'family-members');
      
      if (photoUrl) {
        setEditingMember(prev => prev ? {...prev, photo_url: photoUrl} : null);
        
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

  const handleDeleteMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to delete this family member?')) return;

    try {
      const { error } = await supabase
        .from('family_members')
        .delete()
        .eq('id', memberId);

      if (error) throw error;

      loadFamilyMembers();
      syncFamilyMembersToFrontend();

      toast({
        title: 'Success',
        description: 'Family member deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting family member:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete family member',
        variant: 'destructive'
      });
    }
  };

  const handleAddSocialLink = () => {
    if (!editingMember) return;
    
    setEditingMember({
      ...editingMember,
      socialLinks: [
        ...(editingMember.socialLinks || []),
        { platform: 'instagram', url: '' }
      ]
    });
  };

  const handleRemoveSocialLink = (index: number) => {
    if (!editingMember || !editingMember.socialLinks) return;
    
    const newLinks = [...editingMember.socialLinks];
    newLinks.splice(index, 1);
    
    setEditingMember({
      ...editingMember,
      socialLinks: newLinks
    });
  };

  const handleUpdateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    if (!editingMember || !editingMember.socialLinks) return;
    
    const newLinks = [...editingMember.socialLinks];
    newLinks[index] = {
      ...newLinks[index],
      [field]: value
    };
    
    setEditingMember({
      ...editingMember,
      socialLinks: newLinks
    });
  };

  const handleAddNewMember = () => {
    const newMember: FamilyMember = {
      id: `family-${Date.now()}`,
      name: '',
      role: '',
      order_position: familyMembers.length + 1,
      socialLinks: []
    };
    setEditingMember(newMember);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Family Members</h1>
          <p className="text-muted-foreground">
            Manage your family members that appear in the family circle.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={syncFamilyMembersToFrontend} 
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
          <Button onClick={handleAddNewMember}>
            <Plus className="mr-2 h-4 w-4" />
            Add Family Member
          </Button>
        </div>
      </div>

      {editingMember && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {editingMember.id.startsWith('family-') ? 'Add' : 'Edit'} Family Member
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={editingMember.photo_url} />
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
                    value={editingMember.id}
                    readOnly
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={editingMember.order_position || 0}
                    onChange={(e) => setEditingMember({
                      ...editingMember,
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
                      value={editingMember.name}
                      onChange={(e) => setEditingMember({
                        ...editingMember,
                        name: e.target.value
                      })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <Input
                      id="role"
                      value={editingMember.role}
                      onChange={(e) => setEditingMember({
                        ...editingMember,
                        role: e.target.value
                      })}
                      placeholder="e.g. Wife, Son, Daughter, Pet"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={editingMember.bio || ''}
                    onChange={(e) => setEditingMember({
                      ...editingMember,
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
                  
                  {editingMember.socialLinks && editingMember.socialLinks.map((link, index) => (
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
              <Button onClick={handleSaveMember} disabled={isSaving}>
                {isSaving && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {familyMembers.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No family members found. Add your first family member.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {familyMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-primary/5 to-primary/10 flex items-center justify-center">
                <Avatar className="h-24 w-24 border-2 border-primary/30">
                  <AvatarImage src={member.photo_url} />
                  <AvatarFallback className="bg-primary/20">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  
                  {member.bio && (
                    <p className="mt-2 text-sm italic">
                      "{member.bio.length > 100 ? member.bio.substring(0, 100) + '...' : member.bio}"
                    </p>
                  )}
                  
                  {member.socialLinks && member.socialLinks.length > 0 && (
                    <div className="mt-2 flex justify-center gap-2">
                      {member.socialLinks.map((link, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {link.platform}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center mt-4 space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditMember(member)}>
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    onClick={() => handleDeleteMember(member.id)}
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

export default FamilyMembersDashboard;
