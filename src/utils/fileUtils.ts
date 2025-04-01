
import { supabase } from "@/integrations/supabase/client";

export const isValidImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error("Error checking image URL:", error);
    return false;
  }
};

export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error('Failed to convert file to data URL'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const uploadImageToStorage = async (file: File, folder: string): Promise<string | null> => {
  try {
    console.log(`Uploading ${file.name} to storage/${folder}`);
    
    // Create a unique file name to avoid collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    
    // Check if bucket exists and create it if needed
    try {
      const { data: bucketExists } = await supabase.storage.getBucket(folder);
      
      if (!bucketExists) {
        console.log(`Creating new storage bucket: ${folder}`);
        const { error: bucketError } = await supabase.storage.createBucket(folder, {
          public: true
        });
        
        if (bucketError) {
          console.error('Error creating bucket:', bucketError);
          // Continue anyway, the bucket might already exist
        }
      }
    } catch (bucketError) {
      console.log('Creating new storage bucket:', folder);
      // Try to create bucket anyway, if getBucket fails
      try {
        await supabase.storage.createBucket(folder, {
          public: true
        });
      } catch (createError) {
        console.error('Error creating bucket:', createError);
        // Continue anyway, the bucket might already exist
      }
    }
    
    // Upload file
    const { error: uploadError } = await supabase.storage
      .from(folder)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });
      
    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return null;
    }
    
    // Get public URL
    const { data } = supabase.storage
      .from(folder)
      .getPublicUrl(fileName);
      
    return data.publicUrl;
  } catch (error) {
    console.error('Error in uploadImageToStorage:', error);
    return null;
  }
};
