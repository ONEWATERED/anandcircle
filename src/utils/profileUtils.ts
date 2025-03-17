
import { supabase } from "@/integrations/supabase/client";
import { uploadImageToStorage } from './fileUtils';

// Upload image to database
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
export const updatePersonalProfilePhoto = async (imageUrl: string) => {
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

// Import from existing module
import { saveProfileImage } from './profileImages';
