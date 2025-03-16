
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PersonalProfile } from '@/types/thought-leaders';
import { useToast } from '@/components/ui/use-toast';
import { toast as sonnerToast } from 'sonner';

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

      // Clear some localStorage items to make space
      try {
        // Remove any large items that aren't critical
        localStorage.removeItem('connections');
        localStorage.removeItem('familyMembers');
        localStorage.removeItem('thoughtLeaders');
      } catch (e) {
        console.log('Could not clear localStorage items:', e);
      }

      try {
        // Try to save full profile data first
        localStorage.setItem('personalProfile', JSON.stringify(personalProfile));
        console.log('Full profile successfully saved to localStorage');
        
        // Also save individual pieces in case we need them later
        if (personalProfile.photo_url) {
          localStorage.setItem('profileImageUrl', personalProfile.photo_url);
        }
        if (personalProfile.resume_url) {
          localStorage.setItem('resumeUrl', personalProfile.resume_url);
        }
        
        // Update the last synced time
        setLastSynced(new Date());
        
        toast({
          title: 'Sync Successful',
          description: 'Personal profile has been synchronized with the frontend'
        });
        
        return true;
      } catch (storageError) {
        console.error('Error saving full profile to localStorage:', storageError);
        
        // Try to save minimal data after clearing more space
        try {
          // Clear even more localStorage items
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key !== 'profileImageUrl' && key !== 'resumeUrl') {
              localStorage.removeItem(key);
            }
          }
          
          // Save minimal profile data
          const minimalProfile = {
            id: personalProfile.id,
            name: personalProfile.name,
            photo_url: personalProfile.photo_url,
            resume_url: personalProfile.resume_url
          };
          
          localStorage.setItem('personalProfile', JSON.stringify(minimalProfile));
          
          // Save critical elements individually
          if (personalProfile.photo_url) {
            localStorage.setItem('profileImageUrl', personalProfile.photo_url);
          }
          if (personalProfile.resume_url) {
            localStorage.setItem('resumeUrl', personalProfile.resume_url);
          }
          
          // Also save social links individually
          if (personalProfile.socialLinks) {
            Object.entries(personalProfile.socialLinks).forEach(([platform, url]) => {
              localStorage.setItem(`${platform}Url`, url as string);
            });
          }
          
          setLastSynced(new Date());
          
          toast({
            title: 'Partial Sync Complete',
            description: 'Only essential profile data was synced due to storage limitations',
            variant: 'default'
          });
          
          sonnerToast.success('Profile data partially synced to frontend');
          return true;
        } catch (finalError) {
          console.error('Final attempt to save profile data failed:', finalError);
          
          // One last attempt with absolute minimum data
          try {
            if (personalProfile.photo_url) {
              localStorage.setItem('profileImageUrl', personalProfile.photo_url);
              toast({
                title: 'Minimal Sync Complete',
                description: 'Only profile image was synced due to severe storage limitations',
              });
              setLastSynced(new Date());
              return true;
            }
          } catch (e) {
            console.error('Could not save even minimal data:', e);
          }
          
          throw new Error('Could not save profile data to localStorage after multiple attempts');
        }
      }
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
