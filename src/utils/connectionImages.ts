
// Module for connection images management
import { supabase } from "@/integrations/supabase/client";
import { fileToDataUrl } from "./fileUtils";

// Get connection image from Supabase or localStorage
export const getConnectionImage = async (personId: string): Promise<string | null> => {
  try {
    // Try to fetch image using RPC function
    const { data, error } = await supabase.rpc('get_connection_image', {
      p_person_id: personId as any
    });
    
    if (error) {
      console.error("Error fetching connection image:", error);
      // Don't return early, try localStorage fallback
    }
    
    if (data && Array.isArray(data) && data.length > 0 && data[0]?.image_path) {
      return data[0].image_path;
    }
    
    // Fallback to localStorage
    const key = `connection_image_${personId}`;
    const localImage = localStorage.getItem(key);
    
    if (localImage) {
      return localImage;
    }
    
    return null;
  } catch (error) {
    console.error("Error getting connection image:", error);
    
    // Final fallback to localStorage
    try {
      const key = `connection_image_${personId}`;
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }
};

// Upload an image specifically for a connection
export const uploadConnectionImage = async (imageFile: File, personId: string): Promise<string | null> => {
  try {
    // Always start by converting file to data URL for fallback
    const dataUrl = await fileToDataUrl(imageFile);
    
    // Attempt to upload to Supabase Storage if available
    try {
      // Generate a unique file name
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      
      // Create a folder structure for connections
      const folder = `connections/${personId}`;
      const filePath = `${folder}/${fileName}`;
      
      // Upload to connection_images bucket
      const bucket = 'connection_images';
      
      // Check if the bucket exists, if not create it
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(b => b.name === bucket);
      
      if (!bucketExists) {
        console.log("Creating new storage bucket:", bucket);
        const { error: createError } = await supabase.storage.createBucket(bucket, {
          public: true,
          fileSizeLimit: 5242880 // 5MB
        });
        
        if (createError) {
          console.error("Error creating bucket:", createError);
          return dataUrl; // Fallback to data URL
        }
      }
      
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
      
      // Store the connection in a separate table using a custom SQL procedure
      const { error: insError } = await supabase.rpc('store_connection_image', {
        p_person_id: personId as any,
        p_image_path: publicUrl as any
      });
      
      if (insError) {
        console.error("Error storing connection image:", insError);
      }
      
      console.log("Connection image uploaded to Supabase Storage:", publicUrl);
      
      // Also save to localStorage as backup
      localStorage.setItem(`connection_image_${personId}`, publicUrl);
      
      return publicUrl;
    } catch (error) {
      console.error("Failed to upload to Supabase, using data URL instead:", error);
      // Fallback to localStorage
      localStorage.setItem(`connection_image_${personId}`, dataUrl);
      return dataUrl;
    }
  } catch (error) {
    console.error("Error in uploadConnectionImage:", error);
    return null;
  }
};
