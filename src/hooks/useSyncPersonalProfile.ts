
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PersonalProfile } from '@/types/thought-leaders';
import { useToast } from '@/components/ui/use-toast';

export const useSyncPersonalProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const { toast } = useToast();

  const syncPersonalProfileToFrontend = async () => {
    setIsLoading(true);
    try {
      // Get personal profile from the database
      const { data: profileData, error: profileError } = await supabase
        .from('personal_profile')
        .select('*')
        .eq('id', 'hardeep')
        .single();

      if (profileError) throw profileError;

      // Get all social links for the profile
      const { data: socialLinksData, error: socialLinksError } = await supabase
        .from('personal_social_links')
        .select('*')
        .eq('profile_id', 'hardeep');

      if (socialLinksError) throw socialLinksError;

      // Create socialLinks object from array
      const socialLinks = {};
      
      socialLinksData.forEach(link => {
        socialLinks[link.platform] = link.url;
      });

      // Convert the data to the format expected by the frontend
      const personalProfile: PersonalProfile = {
        id: profileData.id,
        name: profileData.name,
        bio: profileData.bio,
        photo_url: profileData.photo_url,
        resume_url: profileData.resume_url,
        socialLinks,
        created_at: profileData.created_at,
        updated_at: profileData.updated_at
      };

      // Save the data to localStorage for the frontend components to use
      localStorage.setItem('personalProfile', JSON.stringify(personalProfile));
      
      // Update the last synced time
      setLastSynced(new Date());
      
      toast({
        title: 'Sync Successful',
        description: 'Personal profile has been synchronized with the frontend'
      });
      
      return true;
    } catch (error) {
      console.error('Error syncing personal profile:', error);
      
      toast({
        title: 'Sync Failed',
        description: 'Failed to synchronize personal profile with the frontend',
        variant: 'destructive'
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    syncPersonalProfileToFrontend,
    isLoading,
    lastSynced
  };
};
