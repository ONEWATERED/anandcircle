import { supabase } from "@/integrations/supabase/client";
import { GalleryItem } from "@/components/ai-gallery/gallery-data";
import { toast } from "sonner";
import { 
  Brain, CloudRain, FileDigit, Waves, Droplets, HeartPulse,
  LucideIcon 
} from 'lucide-react';

// Helper function to get the appropriate icon component for a given icon name
const getIconByName = (iconName: string): LucideIcon => {
  switch (iconName) {
    case 'Brain': return Brain;
    case 'CloudRain': return CloudRain;
    case 'FileDigit': return FileDigit;
    case 'Waves': return Waves;
    case 'Droplets': return Droplets;
    case 'HeartPulse': return HeartPulse;
    default: return Brain;
  }
};

// Fetch all gallery images or filter by category
export const fetchGalleryImages = async (category?: string): Promise<GalleryItem[]> => {
  try {
    // Use 'any' type temporarily to bypass TypeScript errors
    // This will be fixed when the Supabase types are regenerated
    let query = supabase.from('gallery_images').select('*') as any;
    
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching gallery images:", error);
      toast.error("Failed to load gallery images");
      return [];
    }
    
    // Transform database data to match the GalleryItem interface
    return data.map((item: any) => ({
      id: Number(item.id.split('-')[0]) || Math.floor(Math.random() * 1000), // Convert UUID to number ID
      title: item.title,
      description: item.description,
      category: item.category,
      url: item.url || '',
      icon: getIconByName(item.icon_name),
      imagePath: item.image_path || null
    }));
  } catch (error) {
    console.error("Error in fetchGalleryImages:", error);
    toast.error("Failed to load gallery images");
    return [];
  }
};

// Upload a new gallery image
export const uploadGalleryImage = async ({file, title, description, category, icon_name, url}: {
  file: File;
  title: string;
  description: string;
  category: string;
  icon_name: string;
  url?: string;
}): Promise<boolean> => {
  try {
    // Upload the image to storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('gallery-images')
      .upload(filePath, file);
      
    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      toast.error("Failed to upload image");
      return false;
    }
    
    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from('gallery-images')
      .getPublicUrl(filePath);
      
    const imagePath = publicUrlData.publicUrl;
    
    // Insert the gallery item into the database using 'any' type temporarily
    const { error: insertError } = await (supabase.from('gallery_images') as any).insert({
      title,
      description,
      category,
      url: url || null,
      icon_name: icon_name || 'Brain', // Store icon name as string
      image_path: imagePath
    });
    
    if (insertError) {
      console.error("Error inserting gallery item:", insertError);
      toast.error("Failed to save gallery item");
      return false;
    }
    
    toast.success("Gallery item added successfully!");
    return true;
  } catch (error) {
    console.error("Error in uploadGalleryImage:", error);
    toast.error("Failed to upload gallery item");
    return false;
  }
};

// Update an existing gallery image
export const updateGalleryImage = async ({id, file, title, description, category, icon_name, url}: {
  id: string;
  file: File | null;
  title: string;
  description: string;
  category: string;
  icon_name: string;
  url?: string;
}): Promise<boolean> => {
  try {
    let imagePath = null;
    
    // Only upload a new image if a file is provided
    if (file) {
      // Upload the image to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(filePath, file);
        
      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        toast.error("Failed to upload new image");
        return false;
      }
      
      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(filePath);
        
      imagePath = publicUrlData.publicUrl;
    }
    
    // Update data object based on whether a new image was uploaded
    const updateData: any = {
      title,
      description,
      category,
      url: url || null,
      icon_name: icon_name || 'Brain', // Store icon name as string
    };
    
    // Only include image_path if a new image was uploaded
    if (imagePath) {
      updateData.image_path = imagePath;
    }
    
    // Update the gallery item in the database
    const { error: updateError } = await (supabase.from('gallery_images') as any).update(updateData)
      .eq('id', id);
    
    if (updateError) {
      console.error("Error updating gallery item:", updateError);
      toast.error("Failed to update gallery item");
      return false;
    }
    
    toast.success("Gallery item updated successfully!");
    return true;
  } catch (error) {
    console.error("Error in updateGalleryImage:", error);
    toast.error("Failed to update gallery item");
    return false;
  }
};

// Delete a gallery image
export const deleteGalleryImage = async (id: string): Promise<boolean> => {
  try {
    // Get the image path first to delete from storage
    const { data: imageData, error: fetchError } = await (supabase.from('gallery_images') as any)
      .select('image_path')
      .eq('id', id)
      .single();
    
    if (fetchError) {
      console.error("Error fetching image to delete:", fetchError);
      toast.error("Failed to delete image");
      return false;
    }
    
    // Delete the image from the database
    const { error: deleteError } = await (supabase.from('gallery_images') as any)
      .delete()
      .eq('id', id);
      
    if (deleteError) {
      console.error("Error deleting gallery item:", deleteError);
      toast.error("Failed to delete image");
      return false;
    }
    
    // If there's an image path, delete from storage too
    if (imageData?.image_path) {
      // Extract filename from the URL
      const urlParts = imageData.image_path.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      const { error: storageError } = await supabase.storage
        .from('gallery-images')
        .remove([fileName]);
        
      if (storageError) {
        console.error("Error deleting image from storage:", storageError);
        // Continue anyway since the database record is deleted
      }
    }
    
    toast.success("Gallery item deleted successfully!");
    return true;
  } catch (error) {
    console.error("Error in deleteGalleryImage:", error);
    toast.error("Failed to delete gallery item");
    return false;
  }
};
