
// File utilities for the application
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

// Check if an image URL is accessible
export const isValidImageUrl = async (url: string): Promise<boolean> => {
  // External URLs can be problematic to validate due to CORS
  if (url.startsWith('http') && !url.includes(window.location.hostname)) {
    console.log("Skipping validation for external URL:", url);
    return true; // Assume external URLs are valid to avoid CORS issues
  }
  
  try {
    // For local or relative URLs, we can check if they exist
    const response = await fetch(url, { method: 'HEAD' });
    
    if (!response.ok) {
      console.warn(`Image URL validation failed for ${url}: ${response.status} ${response.statusText}`);
      return false;
    }
    
    // Extra check for content type to confirm it's an image
    const contentType = response.headers.get('content-type');
    if (contentType && !contentType.startsWith('image/')) {
      console.warn(`URL exists but is not an image: ${url}, type: ${contentType}`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error validating image URL ${url}:`, error);
    return false;
  }
};

// Convert a file to a data URL for preview
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Upload an image to Supabase storage
export const uploadImageToStorage = async (
  file: File, 
  bucketName: string = 'uploads'
): Promise<string | null> => {
  try {
    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    // Upload to Supabase Storage
    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
      
    if (error) {
      throw error;
    }
    
    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase
      .storage
      .from(bucketName)
      .getPublicUrl(data.path);
      
    console.log("File uploaded successfully:", publicUrl);
    return publicUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    toast.error("Failed to upload file");
    return null;
  }
};
