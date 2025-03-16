// Database utilities
import { supabase } from "@/integrations/supabase/client";

// Check database connection
export const checkDatabaseConnection = async () => {
  try {
    // Try a simple query to verify connection
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      console.error("Database connection check failed:", error);
      return false;
    }
    
    console.log("Successfully connected to database");
    return true;
  } catch (error) {
    console.error("Database connection check failed:", error);
    return false;
  }
};

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
const updatePersonalSocialLinks = async (links: {
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

// For Dashboard.tsx imports - add these helper functions
export const uploadImageToDatabase = async (file: File) => {
  try {
    // Get the URL from uploadImageToStorage
    const imageUrl = await uploadImageToStorage(file, 'profile-images');
    
    // Save the URL to the profile
    if (imageUrl) {
      await saveProfileImage(imageUrl);
      
      // Also update personal_profile table for frontend sync
      await updatePersonalProfilePhoto(imageUrl);
    }
    
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image to database:", error);
    return null;
  }
};

// Helper function to update personal_profile photo_url
const updatePersonalProfilePhoto = async (imageUrl: string) => {
  try {
    const { error } = await supabase
      .from('personal_profile')
      .update({ photo_url: imageUrl })
      .eq('id', 'hardeep');
      
    if (error) {
      console.error("Error updating personal_profile photo:", error);
      return false;
    }
    
    console.log("Successfully updated personal_profile photo");
    return true;
  } catch (error) {
    console.error("Error in updatePersonalProfilePhoto:", error);
    return false;
  }
};

// Add function to store resume to database
export const saveResumeToDatabase = async (resumeUrl: string) => {
  try {
    // First check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      // Update profiles table - FIX: Only update profile_image_url and not resume_url
      // since resume_url is not a known property in the profiles table type
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          updated_at: new Date().toISOString() 
          // resume_url is removed as it's not in the profiles table schema
        })
        .eq('id', session.user.id);
        
      if (profileError) {
        console.error("Error updating profiles:", profileError);
      }
    }
    
    // Always update personal_profile table which does have resume_url field
    const { error } = await supabase
      .from('personal_profile')
      .update({ resume_url: resumeUrl })
      .eq('id', 'hardeep');
      
    if (error) {
      console.error("Error saving resume to personal_profile:", error);
      return false;
    }
    
    // Also save to localStorage as fallback
    try {
      localStorage.setItem('resumeUrl', resumeUrl);
    } catch (e) {
      console.warn("Could not save resume URL to localStorage:", e);
    }
    
    return true;
  } catch (error) {
    console.error("Error saving resume to database:", error);
    return false;
  }
};

// Import required functions from other modules
import { uploadImageToStorage } from './fileUtils';
import { saveProfileImage } from './profileImages';
