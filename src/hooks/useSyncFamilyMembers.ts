
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FamilyMember, SocialLink } from '@/types/thought-leaders';
import { useToast } from '@/components/ui/use-toast';

export const useSyncFamilyMembers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const { toast } = useToast();

  const syncFamilyMembersToFrontend = async () => {
    setIsLoading(true);
    try {
      // Get all family members from the database
      const { data: membersData, error: membersError } = await supabase
        .from('family_members')
        .select('*')
        .order('order_position', { nullsFirst: false })
        .order('name');

      if (membersError) throw membersError;

      // Get all social links for the family members
      const { data: socialLinksData, error: socialLinksError } = await supabase
        .from('family_social_links')
        .select('*');

      if (socialLinksError) throw socialLinksError;

      // Convert the data to the format expected by the frontend
      const familyMembers: FamilyMember[] = membersData.map(member => {
        const memberSocialLinks = socialLinksData
          .filter(link => link.family_member_id === member.id)
          .map(link => ({ 
            id: link.id,
            platform: link.platform as any, 
            url: link.url 
          }));
        
        return {
          id: member.id,
          name: member.name,
          role: member.role,
          bio: member.bio,
          photo_url: member.photo_url,
          order_position: member.order_position,
          socialLinks: memberSocialLinks.length > 0 ? memberSocialLinks : undefined,
          created_at: member.created_at,
          updated_at: member.updated_at
        };
      });

      // Save the data to localStorage for the frontend components to use
      localStorage.setItem('familyMembers', JSON.stringify(familyMembers));
      
      // Update the last synced time
      setLastSynced(new Date());
      
      toast({
        title: 'Sync Successful',
        description: 'Family members have been synchronized with the frontend'
      });
      
      return true;
    } catch (error) {
      console.error('Error syncing family members:', error);
      
      toast({
        title: 'Sync Failed',
        description: 'Failed to synchronize family members with the frontend',
        variant: 'destructive'
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    syncFamilyMembersToFrontend,
    isLoading,
    lastSynced
  };
};
