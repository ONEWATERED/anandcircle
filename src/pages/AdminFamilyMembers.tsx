import React, { useState, useEffect } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Sheet } from '@/components/ui/sheet';
import { familyMembers, FamilyMember } from '@/data/familyData';
import { getConnectionImage, saveConnectionImage } from '@/utils/connectionImages';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { uploadImageToStorage } from '@/utils/fileUtils';

import FamilyMembersHeader from '@/components/admin/family/FamilyMembersHeader';
import MemberTable from '@/components/admin/family/MemberTable';
import ImageUploadDialog from '@/components/admin/family/ImageUploadDialog';
import MemberFormSheet from '@/components/admin/family/MemberFormSheet';

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
  const [showMemberDialog, setShowMemberDialog] = useState(false);
  const [newSocialLink, setNewSocialLink] = useState({
    platform: 'twitter',
    url: ''
  });
  
  const { toast } = useToast();
  
  // Load family members data - keeping only the 4 actual family members
  useEffect(() => {
    if (authLoading) return;
    
    if (!isAuthenticated) {
      return;
    }
    
    // Clone the data from the import, but filter to only keep spouse, son, daughter, pet
    const familyOnly = familyMembers.filter(member => 
      ['spouse', 'son', 'daughter', 'spark'].includes(member.id)
    );
    
    setMembers(familyOnly);
    
    const fetchImages = async () => {
      try {
        const imagePromises = familyOnly.map(async (member) => {
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
      setShowMemberDialog(true);
    }
  };
  
  const handleCancelEdit = () => {
    setEditingMemberId(null);
    setEditedMember(null);
    setShowMemberDialog(false);
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
      setShowMemberDialog(false);
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
  
  // Handle social links
  const handleAddSocialLink = () => {
    if (!editedMember) return;
    if (!newSocialLink.url) {
      toast({
        title: "Missing URL",
        description: "Please enter a URL for the social link",
        variant: "destructive"
      });
      return;
    }
    
    // Create socialLinks if it doesn't exist
    if (!editedMember.socialLinks) {
      editedMember.socialLinks = {};
    }
    
    // Add the new social link
    const updatedSocialLinks = {
      ...editedMember.socialLinks,
      [newSocialLink.platform]: newSocialLink.url
    };
    
    // Update edited member
    setEditedMember({
      ...editedMember,
      socialLinks: updatedSocialLinks
    });
    
    // Reset form
    setNewSocialLink({
      platform: 'twitter',
      url: ''
    });
    
    toast({
      title: "Social link added",
      description: `Added ${newSocialLink.platform} link to ${editedMember.name}`
    });
  };
  
  const handleRemoveSocialLink = (platform: string) => {
    if (!editedMember || !editedMember.socialLinks) return;
    
    // Create a copy of the social links
    const updatedSocialLinks = { ...editedMember.socialLinks };
    
    // Remove the specified platform
    delete updatedSocialLinks[platform];
    
    // Update edited member
    setEditedMember({
      ...editedMember,
      socialLinks: updatedSocialLinks
    });
    
    toast({
      title: "Social link removed",
      description: `Removed ${platform} link from ${editedMember.name}`
    });
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
      <FamilyMembersHeader onAddMember={handleAdd} />
      
      <div className="rounded-md border">
        <MemberTable 
          members={members}
          memberImages={memberImages}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onUploadImage={handleUploadImage}
        />
      </div>
      
      {/* Image Upload Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <ImageUploadDialog 
          member={editedMember}
          imageUrl={editedMember ? memberImages[editedMember.id] : null}
          isUploading={isUploading}
          onFileChange={handleFileUpload}
        />
      </Dialog>
      
      {/* Comprehensive Member Edit Dialog */}
      <Sheet open={showMemberDialog} onOpenChange={setShowMemberDialog}>
        <MemberFormSheet 
          member={editedMember}
          imageUrl={editedMember ? memberImages[editedMember.id] : null}
          onInputChange={handleInputChange}
          onUploadImage={handleUploadImage}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          newSocialLink={newSocialLink}
          setNewSocialLink={setNewSocialLink}
          onAddSocialLink={handleAddSocialLink}
          onRemoveSocialLink={handleRemoveSocialLink}
        />
      </Sheet>
    </div>
  );
}
