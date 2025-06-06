
import { supabase } from "@/integrations/supabase/client";
import { isValidImageUrl } from "../fileUtils";

// Get connection image from Supabase
export const getConnectionImage = async (personId: string): Promise<string | null> => {
  try {
    // Fallback image that we know exists
    const defaultFallbackImage = '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';

    // Call the function to get the image path
    const { data, error } = await supabase.rpc('get_connection_image', {
      p_person_id: personId
    });
    
    if (error) {
      console.error("Error getting connection image:", error);
      console.log("Using fallback for connection image due to error");
      return defaultFallbackImage;
    }
    
    // Check if data is valid and contains an image path
    if (data && data.length > 0 && data[0].image_path) {
      const imagePath = data[0].image_path;
      
      // Validate that the image exists and is accessible
      if (await isValidImageUrl(imagePath)) {
        return imagePath;
      } else {
        console.warn("Connection image is not accessible:", imagePath);
        console.log("Using fallback for connection image (accessibility issue)");
      }
    }
    
    // Check if there's a path in localStorage
    const localStorageKey = `connection_image_${personId}`;
    const localStorageImage = localStorage.getItem(localStorageKey);
    
    if (localStorageImage && await isValidImageUrl(localStorageImage)) {
      return localStorageImage;
    }
    
    return defaultFallbackImage;
  } catch (error) {
    console.error("Error getting connection image:", error);
    return '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
  }
};

// Save connection image to Supabase and localStorage
export const saveConnectionImage = async (personId: string, imageUrl: string): Promise<boolean> => {
  try {
    // Save to localStorage as fallback
    const localStorageKey = `connection_image_${personId}`;
    localStorage.setItem(localStorageKey, imageUrl);
    
    // Call the store_connection_image function
    const { error } = await supabase.rpc('store_connection_image', {
      p_person_id: personId,
      p_image_path: imageUrl
    });
    
    if (error) {
      console.error("Error saving connection image to database:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error saving connection image:", error);
    return false;
  }
};
