
import { supabase } from '@/integrations/supabase/client';
import { ensureHttpProtocol } from '@/utils/databaseConnection';

export interface SocialLinksData {
  linkedIn: string;
  twitter: string;
  youtube: string;
  spotify: string; // Keep for backward compatibility
  anandCircle: string;
}

export const validateUrl = (url: string): boolean => {
  if (!url) return true; // Empty URLs are allowed
  try {
    new URL(ensureHttpProtocol(url));
    return true;
  } catch (e) {
    return false;
  }
};

// Function to save social links to database and localStorage
export const saveSocialLinks = async (links: SocialLinksData) => {
  const success = {
    database: false,
    localStorage: false
  };

  try {
    // First check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      // User is authenticated, save to Supabase first
      try {
        // Prepare the social links for insertion with validated URLs
        const socialLinksToInsert = [
          { user_id: session.user.id, platform: 'linkedin', url: ensureHttpProtocol(links.linkedIn) },
          { user_id: session.user.id, platform: 'twitter', url: ensureHttpProtocol(links.twitter) },
          { user_id: session.user.id, platform: 'youtube', url: ensureHttpProtocol(links.youtube) },
          // Spotify link is no longer saved
          { user_id: session.user.id, platform: 'anandcircle', url: links.anandCircle }
        ];
        
        // Delete existing links for this user
        await supabase
          .from('social_links')
          .delete()
          .eq('user_id', session.user.id);
        
        // Insert new links
        const { error } = await supabase
          .from('social_links')
          .insert(socialLinksToInsert);
          
        if (error) {
          console.error("Error saving social links to Supabase:", error);
        } else {
          console.log("Social links saved to Supabase");
          success.database = true;
          
          // Also update personal_social_links for profile sync
          await updatePersonalSocialLinks(links);
        }
      } catch (dbError) {
        console.error("Database error saving social links:", dbError);
      }
    } else {
      console.log("User not authenticated, trying to save to personal_social_links");
      // Try to save to personal_social_links as fallback
      const result = await updatePersonalSocialLinks(links);
      success.database = result;
    }
    
    // Always save to localStorage as fallback
    try {
      // Save links individually to avoid quota issues
      localStorage.setItem('linkedInUrl', links.linkedIn);
      localStorage.setItem('twitterUrl', links.twitter);
      localStorage.setItem('youtubeUrl', links.youtube);
      // No longer saving Spotify to localStorage
      localStorage.setItem('anandCircleUrl', links.anandCircle);
      success.localStorage = true;
    } catch (error) {
      console.error("Error saving links to localStorage:", error);
    }
    
    return success.database || success.localStorage;
  } catch (error) {
    console.error("Error in saveSocialLinks:", error);
    return false;
  }
};

// Helper function to update personal_social_links table
export const updatePersonalSocialLinks = async (links: SocialLinksData) => {
  try {
    // Convert to platform format used in database with validated URLs
    const platformLinks = [
      { profile_id: 'hardeep', platform: 'linkedin', url: ensureHttpProtocol(links.linkedIn) },
      { profile_id: 'hardeep', platform: 'twitter', url: ensureHttpProtocol(links.twitter) },
      { profile_id: 'hardeep', platform: 'youtube', url: ensureHttpProtocol(links.youtube) },
      // Spotify link is no longer saved
      { profile_id: 'hardeep', platform: 'anandcircle', url: links.anandCircle }
    ];
    
    // Delete existing links
    await supabase
      .from('personal_social_links')
      .delete()
      .eq('profile_id', 'hardeep');
    
    // Insert new links
    const { error } = await supabase
      .from('personal_social_links')
      .insert(platformLinks);
      
    if (error) {
      console.error("Error updating personal_social_links:", error);
      return false;
    }
    
    console.log("Successfully updated personal_social_links");
    return true;
  } catch (error) {
    console.error("Error in updatePersonalSocialLinks:", error);
    return false;
  }
};
