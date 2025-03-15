
// Module for handling connection (family/people) images
import { supabase } from "@/integrations/supabase/client";

/**
 * Retrieves a connection image from Supabase or localStorage
 * @param personId The ID of the person whose image we're fetching
 * @returns URL of the image or null if not found
 */
export const getConnectionImage = async (personId: string): Promise<string | null> => {
  try {
    console.log(`Getting connection image for person: ${personId}`);
    
    // Try to get from Supabase connection_images first
    const { data, error } = await supabase
      .rpc('get_connection_image', { p_person_id: personId });
    
    if (error) {
      console.error("Error fetching connection image from Supabase:", error);
      // If Supabase fails, try localStorage
      const localImage = localStorage.getItem(`connection_image_${personId}`);
      console.log(`Retrieved image from localStorage for ${personId}:`, localImage ? "Found" : "Not found");
      return localImage;
    }
    
    // Check if we got a valid image path from Supabase
    if (data && data.length > 0 && data[0].image_path) {
      const imagePath = data[0].image_path;
      console.log(`Retrieved connection image from Supabase for ${personId}:`, imagePath);
      
      // Update localStorage for offline access
      localStorage.setItem(`connection_image_${personId}`, imagePath);
      
      return imagePath;
    }
    
    // If not in Supabase, try localStorage
    const localImage = localStorage.getItem(`connection_image_${personId}`);
    console.log(`Fallback to localStorage for ${personId}:`, localImage ? "Found" : "Not found");
    
    return localImage;
  } catch (error) {
    console.error(`Error getting connection image for ${personId}:`, error);
    
    // Final fallback to localStorage
    try {
      const localImage = localStorage.getItem(`connection_image_${personId}`);
      return localImage;
    } catch (e) {
      return null;
    }
  }
};

/**
 * Saves a connection image URL to Supabase and localStorage
 * @param personId The ID of the person whose image we're saving
 * @param url The image URL to save
 */
export const saveConnectionImage = async (personId: string, url: string): Promise<void> => {
  try {
    console.log(`Saving connection image for ${personId}:`, url);
    
    // Save to Supabase
    const { error } = await supabase
      .rpc('store_connection_image', { 
        p_person_id: personId,
        p_image_path: url
      });
    
    if (error) {
      console.error(`Error saving connection image to Supabase for ${personId}:`, error);
    } else {
      console.log(`Connection image saved to Supabase for ${personId}`);
    }
    
    // Always save to localStorage as fallback
    localStorage.setItem(`connection_image_${personId}`, url);
  } catch (error) {
    console.error(`Error saving connection image for ${personId}:`, error);
    
    // Try localStorage as final fallback
    try {
      localStorage.setItem(`connection_image_${personId}`, url);
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  }
};
