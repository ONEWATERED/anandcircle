
/**
 * Utilities for handling storage errors during profile sync
 */
import { clearAllLocalStorageExcept, storeProfilePartsInLocalStorage } from './localStorage';
import { toast as sonnerToast } from 'sonner';

/**
 * Handle localStorage storage errors with multiple fallback strategies
 */
export const handleStorageError = (profile: any, toast: any): boolean => {
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
