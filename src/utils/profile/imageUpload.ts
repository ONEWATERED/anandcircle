
import { supabase } from "@/integrations/supabase/client";
import { uploadImageToStorage } from '../fileUtils';
import { updatePersonalProfilePhoto } from './profileUpdate';

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

// Import from existing module
import { saveProfileImage } from './profileImage';
