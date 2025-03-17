
import { supabase } from "@/integrations/supabase/client";

// Save social links - improved to ensure database storage
export const saveSocialLinks = async (links: {
  linkedIn: string;
  twitter: string;
  youtube: string;
  spotify: string;
  anandCircle: string;
}) => {
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
        // Prepare the social links for insertion
        const socialLinksToInsert = [
          { user_id: session.user.id, platform: 'linkedin', url: links.linkedIn },
          { user_id: session.user.id, platform: 'twitter', url: links.twitter },
          { user_id: session.user.id, platform: 'youtube', url: links.youtube },
          { user_id: session.user.id, platform: 'spotify', url: links.spotify },
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
      Object.entries(links).forEach(([key, value]) => {
        try {
          localStorage.setItem(`${key}Url`, value);
        } catch (e) {
          console.warn(`Could not save ${key} to localStorage:`, e);
        }
      });
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
export const updatePersonalSocialLinks = async (links: {
  linkedIn: string;
  twitter: string;
  youtube: string;
  spotify: string;
  anandCircle: string;
}) => {
  try {
    // Convert to platform format used in database
    const platformLinks = [
      { profile_id: 'hardeep', platform: 'linkedin', url: links.linkedIn },
      { profile_id: 'hardeep', platform: 'twitter', url: links.twitter },
      { profile_id: 'hardeep', platform: 'youtube', url: links.youtube },
      { profile_id: 'hardeep', platform: 'spotify', url: links.spotify },
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
