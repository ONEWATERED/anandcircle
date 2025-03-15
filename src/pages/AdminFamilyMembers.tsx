
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { familyMembers, FamilyMember } from '@/data/familyData';
import { supabase } from '@/integrations/supabase/client';
import { getConnectionImage, saveConnectionImage } from '@/utils/connectionImages';
import { Edit, Trash2, Plus, Users, X, Check, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { uploadImageToStorage } from '@/utils/fileUtils';

export default function AdminFamilyMembers() {
  // Authentication
  const { isAuthenticated, isLoading: authLoading } = useAdminAuth();
  
  // State
  const [loading, setLoading] = useState(true);
  const [memberImages, setMemberImages] = useState<Record<string, string | null>>({});
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [editedMember, setEditedMember] = useState<FamilyMember | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  
  const { toast } = useToast();
  
  // Load family members data
  useEffect(() => {
    if (authLoading) return;
    
    if (!isAuthenticated) {
      return;
    }
    
    // Clone the data from the import
    setMembers([...familyMembers]);
    
    const fetchImages = async () => {
      try {
        const imagePromises = familyMembers.map(async (member) => {
          const imageUrl = await getConnectionImage(member.id);
          return { id: member.id, imageUrl };
        });
        
        const results = await Promise.all(imagePromises);
        
        const imageMap: Record<string, string | null> = {};
        results.forEach(result => {
          imageMap[result.id] = result.imageUrl;
        });
        
        setMemberImages(imageMap);
      } catch (error) {
        console.error("Error fetching member images:", error);
        toast({
          title: "Error loading images",
          description: "Could not load family member images",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchImages();
  }, [toast, isAuthenticated, authLoading]);
  
  const handleEdit = (memberId: string) => {
    const memberToEdit = members.find(m => m.id === memberId);
    if (memberToEdit) {
      setEditingMemberId(memberId);
      setEditedMember({...memberToEdit});
    }
  };
  
  const handleCancelEdit = () => {
    setEditingMemberId(null);
    setEditedMember(null);
  };
  
  const handleSaveEdit = async () => {
    if (!editedMember) return;
    
    try {
      // Update in local state
      setMembers(members.map(m => 
        m.id === editedMember.id ? editedMember : m
      ));
      
      // In a real app, you would save to a database here
      // For now, just show a success toast
      toast({
        title: "Member updated",
        description: `${editedMember.name}'s information has been updated.`,
      });
      
      // Reset editing state
      setEditingMemberId(null);
      setEditedMember(null);
    } catch (error) {
      console.error("Error updating member:", error);
      toast({
        title: "Update failed",
        description: "Could not update member information",
        variant: "destructive"
      });
    }
  };
  
  const handleInputChange = (field: keyof FamilyMember, value: any) => {
    if (!editedMember) return;
    setEditedMember({
      ...editedMember,
      [field]: value
    });
  };
  
  const handleDelete = (memberId: string) => {
    // In a real app, you would delete from the database
    // For now, just remove from the local state
    setMembers(members.filter(m => m.id !== memberId));
    
    toast({
      title: "Member deleted",
      description: "Family member has been removed",
    });
  };
  
  const handleAdd = () => {
    toast({
      title: "Add functionality",
      description: "Add functionality will be implemented soon",
    });
  };
  
  const handleUploadImage = (memberId: string) => {
    const memberToEdit = members.find(m => m.id === memberId);
    if (memberToEdit) {
      setEditedMember({...memberToEdit});
      setShowImageDialog(true);
    }
  };
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedMember) return;
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setIsUploading(true);
    
    try {
      // Upload file to storage
      const uploadedUrl = await uploadImageToStorage(file, editedMember.id);
      
      if (uploadedUrl) {
        // Save to connection images
        await saveConnectionImage(editedMember.id, uploadedUrl);
        
        // Update local state
        setMemberImages(prev => ({
          ...prev,
          [editedMember.id]: uploadedUrl
        }));
        
        toast({
          title: "Image uploaded successfully",
          description: `Image for ${editedMember.name} has been updated.`,
          duration: 3000,
        });
        
        // Close dialog
        setShowImageDialog(false);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading the image.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-6 w-6 border-2 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-2">Checking authentication...</span>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Family Members</h1>
          <p className="text-gray-500">Manage your family circle members</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Bio</TableHead>
              <TableHead>Social Links</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin h-6 w-6 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                    <span className="ml-2">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="relative group">
                      <Avatar>
                        <AvatarImage src={memberImages[member.id] || undefined} alt={member.name} />
                        <AvatarFallback style={{ backgroundColor: member.color }}>
                          {member.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-white border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleUploadImage(member.id)}
                      >
                        <Upload className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {editingMemberId === member.id ? (
                      <Input 
                        value={editedMember?.name || ''} 
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="max-w-[150px]"
                      />
                    ) : (
                      member.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingMemberId === member.id ? (
                      <Input 
                        value={editedMember?.role || ''} 
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        className="max-w-[150px]"
                      />
                    ) : (
                      member.role
                    )}
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {editingMemberId === member.id ? (
                      <Input 
                        value={editedMember?.bio || ''} 
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="max-w-[250px]"
                      />
                    ) : (
                      member.bio
                    )}
                  </TableCell>
                  <TableCell>
                    {member.socialLinks ? 
                      Object.keys(member.socialLinks).length : 
                      0} links
                  </TableCell>
                  <TableCell className="text-right">
                    {editingMemberId === member.id ? (
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={handleSaveEdit}
                        >
                          <Check className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleCancelEdit}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleEdit(member.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(member.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Image Upload Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Member Photo</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-20 w-20 border-2" style={{ borderColor: editedMember?.color || '#ccc' }}>
              <AvatarImage 
                src={editedMember ? memberImages[editedMember.id] || undefined : undefined} 
                alt={editedMember?.name || 'Member'} 
              />
              <AvatarFallback style={{ backgroundColor: editedMember?.color || '#ccc' }}>
                {editedMember?.name.substring(0, 2) || '??'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{editedMember?.name || 'Member'}</h3>
              <p className="text-sm text-gray-500">{editedMember?.role || 'Role'}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imageFile">Upload image</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
                {isUploading && (
                  <Upload className="h-4 w-4 animate-spin" />
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
