
/**
 * Utilities for syncing profile data with Supabase
 */
import { supabase } from '@/integrations/supabase/client';
import { PersonalProfile } from '@/types/thought-leaders';
import { handleStorageError } from './errorHandling';
import { storeProfilePartsInLocalStorage } from './localStorage';

/**
 * Fetch profile data from Supabase
 */
export const fetchProfileData = async (): Promise<PersonalProfile | null> => {
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

    return personalProfile;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return null;
  }
};

/**
 * Save profile data to localStorage with error handling
 */
export const saveProfileToLocalStorage = (personalProfile: PersonalProfile, toast: any): boolean => {
  try {
    // Try to save full profile data first
    localStorage.setItem('personalProfile', JSON.stringify(personalProfile));
    console.log('Full profile successfully saved to localStorage');
    
    // Also save individual pieces as backup
    storeProfilePartsInLocalStorage(personalProfile);
    return true;
  } catch (storageError) {
    console.error('Error saving full profile to localStorage:', storageError);
    return handleStorageError(personalProfile, toast);
  }
};
