
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Save social links to Supabase and localStorage
export const saveSocialLinks = async (socialLinks: {
  linkedIn: string;
  twitter: string;
  youtube: string;
  spotify: string;
  anandCircle: string;
}): Promise<boolean> => {
  try {
    // Save to localStorage as fallback
    localStorage.setItem('linkedInUrl', socialLinks.linkedIn);
    localStorage.setItem('twitterUrl', socialLinks.twitter);
    localStorage.setItem('youtubeUrl', socialLinks.youtube);
    localStorage.setItem('spotifyUrl', socialLinks.spotify);
    localStorage.setItem('anandCircleUrl', socialLinks.anandCircle);
    
    // Try to update personal_social_links for hardeep profile
    await updatePersonalSocialLinks(socialLinks);
    
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      // User is authenticated, save to social_links table
      // First, delete existing links for this user
      const { error: deleteError } = await supabase
        .from('social_links')
        .delete()
        .eq('user_id', session.user.id);
      
      if (deleteError) {
        console.error("Error deleting existing social links:", deleteError);
      }
      
      // Then insert new links
      const linksToInsert = [
        { user_id: session.user.id, platform: 'linkedIn', url: socialLinks.linkedIn },
        { user_id: session.user.id, platform: 'twitter', url: socialLinks.twitter },
        { user_id: session.user.id, platform: 'youtube', url: socialLinks.youtube },
        { user_id: session.user.id, platform: 'spotify', url: socialLinks.spotify },
        { user_id: session.user.id, platform: 'anandCircle', url: socialLinks.anandCircle }
      ].filter(link => link.url.trim() !== '');
      
      if (linksToInsert.length > 0) {
        const { error: insertError } = await supabase
          .from('social_links')
          .insert(linksToInsert);
        
        if (insertError) {
          console.error("Error inserting social links:", insertError);
          return false;
        }
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error saving social links:", error);
    return false;
  }
};

// Helper function to update personal_social_links table
export const updatePersonalSocialLinks = async (socialLinks: {
  linkedIn: string;
  twitter: string;
  youtube: string;
  spotify: string;
  anandCircle: string;
}): Promise<boolean> => {
  try {
    // First, delete existing links
    const { error: deleteError } = await supabase
      .from('personal_social_links')
      .delete()
      .eq('profile_id', 'hardeep');
    
    if (deleteError) {
      console.error("Error deleting existing personal social links:", deleteError);
    }
    
    // Then insert new links
    const linksToInsert = [
      { profile_id: 'hardeep', platform: 'linkedin', url: socialLinks.linkedIn },
      { profile_id: 'hardeep', platform: 'twitter', url: socialLinks.twitter },
      { profile_id: 'hardeep', platform: 'youtube', url: socialLinks.youtube },
      { profile_id: 'hardeep', platform: 'spotify', url: socialLinks.spotify },
      { profile_id: 'hardeep', platform: 'anandcircle', url: socialLinks.anandCircle }
    ].filter(link => link.url.trim() !== '');
    
    if (linksToInsert.length > 0) {
      const { error: insertError } = await supabase
        .from('personal_social_links')
        .insert(linksToInsert);
      
      if (insertError) {
        console.error("Error inserting personal social links:", insertError);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error updating personal social links:", error);
    return false;
  }
};
