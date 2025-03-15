
// General file utilities
import { supabase } from "@/integrations/supabase/client";

// Helper for validation
export const isValidImageUrl = (url: string): boolean => {
  return !!url && typeof url === 'string' && url.trim() !== '';
};

// Convert uploaded file to data URL for storage
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Upload an image file to Supabase Storage
export const uploadImageToStorage = async (imageFile: File, personId?: string): Promise<string | null> => {
  try {
    // Always start by converting file to data URL for fallback
    const dataUrl = await fileToDataUrl(imageFile);
    
    // Attempt to upload to Supabase Storage if available
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      // Generate a unique file name
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      
      // Create a folder structure for better organization
      // If personId is provided, store in connections folder, else in profiles
      const folder = personId 
        ? `connections/${personId}` 
        : session?.user 
          ? `profiles/${session.user.id}` 
          : 'anonymous';
      
      const filePath = `${folder}/${fileName}`;
      
      // Upload to Supabase Storage
      const bucket = 'connection_images';
      
      // Upload file to appropriate bucket
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (error) {
        console.error(`Error uploading to ${bucket}:`, error);
        // Fall back to data URL since Supabase upload failed
        return dataUrl;
      }
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);
      
      // If this is a connection image and personId is provided, store in the connection_images table
      if (personId) {
        const { error: insError } = await supabase.rpc('store_connection_image', {
          p_person_id: personId,
          p_image_path: publicUrl
        });
        
        if (insError) {
          console.error("Error storing connection image:", insError);
        }
      }
      
      console.log("Image uploaded to Supabase Storage:", publicUrl);
      return publicUrl;
    } catch (error) {
      console.error("Failed to upload to Supabase, using data URL instead:", error);
      return dataUrl;
    }
  } catch (error) {
    console.error("Error in uploadImageToStorage:", error);
    return null;
  }
};
