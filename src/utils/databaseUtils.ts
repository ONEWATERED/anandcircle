
// Database utilities
import { supabase } from "@/integrations/supabase/client";

// Check database connection
export const checkDatabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    return !error;
  } catch (error) {
    console.error("Database connection check failed:", error);
    return false;
  }
};

// Save social links
export const saveSocialLinks = async (links: {
  linkedIn: string;
  twitter: string;
  youtube: string;
  spotify: string;
  anandCircle: string;
}) => {
  try {
    // First check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      // Try to save to Supabase if user is authenticated
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: session.user.id,
          social_links: links,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        });
        
      if (error) {
        console.error("Error saving social links to Supabase:", error);
      }
    }
    
    // Always save to localStorage as fallback
    Object.entries(links).forEach(([key, value]) => {
      localStorage.setItem(`${key}Url`, value);
    });
    
    return true;
  } catch (error) {
    console.error("Error saving social links:", error);
    return false;
  }
};

// For Dashboard.tsx imports - add these helper functions
export const uploadImageToDatabase = async (file: File) => {
  try {
    // Get the URL from uploadImageToStorage
    const imageUrl = await uploadImageToStorage(file);
    
    // Save the URL to the profile
    if (imageUrl) {
      await saveProfileImage(imageUrl);
    }
    
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image to database:", error);
    return null;
  }
};

// Import required functions from other modules
import { uploadImageToStorage } from './fileUtils';
import { saveProfileImage } from './profileImages';
