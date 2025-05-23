// Module for profile image management
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getHardeepProfileImage } from "../databaseConnection";
import { isValidImageUrl } from "../fileUtils";

// Get profile image from Supabase or localStorage
export const getProfileImage = async (): Promise<string | null> => {
  try {
    console.log("Getting profile image");
    
    // Guaranteed default that we know exists
    const defaultImage = '/lovable-uploads/profile_pic.png';
    
    // Try to get from Hardeep profile first
    const hardeepImageUrl = await getHardeepProfileImage();
    if (hardeepImageUrl) {
      console.log("Retrieved Hardeep profile image:", hardeepImageUrl);
      
      // Validate that the image exists and is accessible
      if (await isValidImageUrl(hardeepImageUrl)) {
        return hardeepImageUrl;
      } else {
        console.warn("Hardeep profile image is not accessible:", hardeepImageUrl);
      }
    }
    
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      // User is authenticated, get profile image from Supabase profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('profile_image_url')
        .eq('id', session.user.id)
        .single();
      
      if (error) {
        console.error("Error fetching profile image from Supabase:", error);
      } else if (data?.profile_image_url) {
        console.log("Retrieved profile image from profiles table:", data.profile_image_url);
        
        // Validate that the image exists and is accessible
        if (await isValidImageUrl(data.profile_image_url)) {
          return data.profile_image_url;
        } else {
          console.warn("Profile image from database is not accessible:", data.profile_image_url);
        }
      }
    }
    
    // As a final fallback, try to get from localStorage
    const localStorageImage = localStorage.getItem('profileImageUrl');
    if (localStorageImage) {
      console.log("Retrieved profile image from localStorage:", localStorageImage);
      
      // Validate that the image exists and is accessible
      if (await isValidImageUrl(localStorageImage)) {
        return localStorageImage;
      } else {
        console.warn("localStorage profile image is not accessible:", localStorageImage);
      }
    }
    
    // If all else fails, return the default image
    console.log("Using default profile image as fallback");
    return defaultImage;
  } catch (error) {
    console.error("Error getting profile image:", error);
    return '/lovable-uploads/profile_pic.png'; // Guaranteed fallback
  }
};

// Save profile image URL to Supabase and localStorage fallback
export const saveProfileImage = async (url: string): Promise<void> => {
  try {
    console.log("Saving profile image:", url);
    
    // First, try to save to personal_profile table
    const { error: personalProfileError } = await supabase
      .from('personal_profile')
      .update({ photo_url: url })
      .eq('id', 'hardeep');
    
    if (personalProfileError) {
      console.error("Error saving to personal_profile:", personalProfileError);
      // Continue to try other methods
    } else {
      console.log("Profile image saved to personal_profile table");
    }
    
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      // User is authenticated, save to Supabase
      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert({
          id: session.user.id,
          profile_image_url: url,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        });
      
      if (upsertError) {
        console.error("Error saving profile to Supabase:", upsertError);
        toast.error("Failed to save profile image to database");
      } else {
        console.log("Profile image saved to Supabase");
        toast.success("Profile image saved to database");
      }
    } else {
      console.log("User not authenticated, saving to localStorage only");
    }
    
    // Always try to save to localStorage as well
    try {
      localStorage.setItem('profileImageUrl', url);
    } catch (e) {
      console.error("Error saving to localStorage:", e);
    }
  } catch (error) {
    console.error("Error saving profile image:", error);
    toast.error("Failed to save profile image");
  }
};
