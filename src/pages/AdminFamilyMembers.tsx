
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
import { familyMembers } from '@/data/familyData';
import { supabase } from '@/integrations/supabase/client';
import { getConnectionImage } from '@/utils/connectionImages';
import { Edit, Trash2, Plus, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminFamilyMembers() {
  const [loading, setLoading] = useState(true);
  const [memberImages, setMemberImages] = useState<Record<string, string | null>>({});
  const { toast } = useToast();
  
  useEffect(() => {
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
  }, [toast]);
  
  const handleEdit = (memberId: string) => {
    toast({
      title: "Edit functionality",
      description: "Edit functionality will be implemented soon",
    });
  };
  
  const handleDelete = (memberId: string) => {
    toast({
      title: "Delete functionality",
      description: "Delete functionality will be implemented soon",
    });
  };
  
  const handleAdd = () => {
    toast({
      title: "Add functionality",
      description: "Add functionality will be implemented soon",
    });
  };
  
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
              familyMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={memberImages[member.id] || undefined} alt={member.name} />
                      <AvatarFallback style={{ backgroundColor: member.color }}>
                        {member.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{member.bio}</TableCell>
                  <TableCell>
                    {member.socialLinks ? 
                      Object.keys(member.socialLinks).length : 
                      0} links
                  </TableCell>
                  <TableCell className="text-right">
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
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
