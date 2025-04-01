
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { toast as sonnerToast } from 'sonner';
import { fetchProfileData, saveProfileToLocalStorage } from '@/utils/profileSync/supabaseSync';

export const useSyncPersonalProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const { toast } = useToast();

  const syncPersonalProfileToFrontend = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Get personal profile from the database
      const personalProfile = await fetchProfileData();
      
      if (!personalProfile) {
        throw new Error('Failed to fetch profile data');
      }

      // Store in localStorage with error handling
      const saveSuccess = saveProfileToLocalStorage(personalProfile, toast);
      
      if (saveSuccess) {
        // Update the last synced time
        setLastSynced(new Date());
        
        toast({
          title: 'Sync Successful',
          description: 'Personal profile has been synchronized with the frontend'
        });
      } else {
        throw new Error('Failed to save profile data to localStorage');
      }
    } catch (error) {
      console.error('Error syncing personal profile:', error);
      
      toast({
        title: 'Sync Failed',
        description: 'Failed to synchronize personal profile with the frontend',
        variant: 'destructive'
      });
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
