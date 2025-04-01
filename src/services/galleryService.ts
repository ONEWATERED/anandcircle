
import { supabase } from "@/integrations/supabase/client";
import { GalleryItem } from "@/components/ai-gallery/gallery-data";
import { toast } from "sonner";

// Fetch all gallery images or filter by category
export const fetchGalleryImages = async (category?: string): Promise<GalleryItem[]> => {
  try {
    let query = supabase.from('gallery_images').select('*');
    
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
    return data.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      category: item.category,
      url: item.url || '',
      icon: item.icon_name,
      imagePath: item.image_path || null
    }));
  } catch (error) {
    console.error("Error in fetchGalleryImages:", error);
    toast.error("Failed to load gallery images");
    return [];
  }
};

// Upload a new gallery image
export const uploadGalleryImage = async (file: File, item: Omit<GalleryItem, 'id' | 'imagePath'>): Promise<boolean> => {
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
    
    // Insert the gallery item into the database
    const { error: insertError } = await supabase.from('gallery_images').insert({
      title: item.title,
      description: item.description,
      category: item.category,
      url: item.url || null,
      icon_name: item.icon,
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
