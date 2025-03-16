
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

      if (profileError) {
        console.error('Error fetching personal profile:', profileError);
        throw profileError;
      }

      // Get all social links for the profile
      const { data: socialLinksData, error: socialLinksError } = await supabase
        .from('personal_social_links')
        .select('*')
        .eq('profile_id', 'hardeep');

      if (socialLinksError) {
        console.error('Error fetching social links:', socialLinksError);
        throw socialLinksError;
      }

      // Create socialLinks object from array
      const socialLinks = {};
      
      socialLinksData.forEach(link => {
        socialLinks[link.platform] = link.url;
      });

      // Convert the data to the format expected by the frontend
      const personalProfile: PersonalProfile = {
        id: profileData.id,
        name: profileData.name,
        bio: profileData.bio || '',
        photo_url: profileData.photo_url,
        resume_url: profileData.resume_url,
        socialLinks,
        created_at: profileData.created_at,
        updated_at: profileData.updated_at
      };

      // Store in localStorage with error handling
      try {
        // Try to save full profile data first
        localStorage.setItem('personalProfile', JSON.stringify(personalProfile));
        console.log('Full profile successfully saved to localStorage');
        
        // Also save individual pieces as backup
        storeProfilePartsInLocalStorage(personalProfile);
        
        // Update the last synced time
        setLastSynced(new Date());
        
        toast({
          title: 'Sync Successful',
          description: 'Personal profile has been synchronized with the frontend'
        });
        
        return true;
      } catch (storageError) {
        console.error('Error saving full profile to localStorage:', storageError);
        return handleStorageError(personalProfile, toast);
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

  // Helper function to store profile parts individually
  const storeProfilePartsInLocalStorage = (profile: PersonalProfile) => {
    try {
      // Save critical elements individually
      if (profile.photo_url) {
        localStorage.setItem('profileImageUrl', profile.photo_url);
      }
      if (profile.resume_url) {
        localStorage.setItem('resumeUrl', profile.resume_url);
      }
      
      // Save social links individually
      if (profile.socialLinks) {
        Object.entries(profile.socialLinks).forEach(([platform, url]) => {
          const key = platformToStorageKey(platform);
          if (key) {
            localStorage.setItem(key, url as string);
          }
        });
      }
    } catch (e) {
      console.error('Error storing profile parts:', e);
    }
  };

  // Helper to convert platform names to localStorage keys
  const platformToStorageKey = (platform: string): string | null => {
    const map: Record<string, string> = {
      'linkedin': 'linkedInUrl',
      'twitter': 'twitterUrl',
      'youtube': 'youtubeUrl',
      'spotify': 'spotifyUrl',
      'anandcircle': 'anandCircleUrl'
    };
    return map[platform.toLowerCase()] || null;
  };

  // Handle localStorage storage errors with multiple fallback strategies
  const handleStorageError = (profile: PersonalProfile, toast: any): boolean => {
    // First try: Clear some localStorage items to make space
    try {
      // Remove any large items that aren't critical
      localStorage.removeItem('connections');
      localStorage.removeItem('familyMembers');
      localStorage.removeItem('thoughtLeaders');
      
      // Save minimal profile data
      const minimalProfile = {
        id: profile.id,
        name: profile.name,
        photo_url: profile.photo_url,
        resume_url: profile.resume_url
      };
      
      localStorage.setItem('personalProfile', JSON.stringify(minimalProfile));
      
      // Store critical pieces individually
      storeProfilePartsInLocalStorage(profile);
      
      setLastSynced(new Date());
      
      toast({
        title: 'Partial Sync Complete',
        description: 'Only essential profile data was synced due to storage limitations'
      });
      
      sonnerToast.success('Profile data partially synced to frontend');
      return true;
    } catch (secondError) {
      console.error('Second attempt to save profile data failed:', secondError);
      
      // Final attempt: Just save the profile image URL
      try {
        clearAllLocalStorageExcept(['profileImageUrl', 'resumeUrl']);
        
        if (profile.photo_url) {
          localStorage.setItem('profileImageUrl', profile.photo_url);
        }
        if (profile.resume_url) {
          localStorage.setItem('resumeUrl', profile.resume_url);
        }
        
        // Try to save at least one social link
        if (profile.socialLinks && profile.socialLinks.linkedin) {
          localStorage.setItem('linkedInUrl', profile.socialLinks.linkedin as string);
        }
        
        setLastSynced(new Date());
        
        toast({
          title: 'Minimal Sync Complete',
          description: 'Only critical data was synced due to severe storage limitations',
        });
        return true;
      } catch (finalError) {
        console.error('Could not save even minimal data:', finalError);
        return false;
      }
    }
  };

  // Helper to clear all localStorage except for specified keys
  const clearAllLocalStorageExcept = (keysToKeep: string[]) => {
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && !keysToKeep.includes(key)) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
  };

  return {
    syncPersonalProfileToFrontend,
    isLoading,
    lastSynced
  };
};
