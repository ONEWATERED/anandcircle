
// This utility handles loading and saving profile images 
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Get profile image URL from Supabase or localStorage fallback
export const getProfileImage = async (): Promise<string | null> => {
  try {
    // First check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      // User is authenticated, try to get profile from Supabase
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('profile_image_url')
        .eq('id', session.user.id)
        .single();
      
      if (error) {
        console.error("Error fetching profile from Supabase:", error);
      }
      
      if (profile?.profile_image_url) {
        console.log("Retrieved profile image from Supabase:", profile.profile_image_url);
        return profile.profile_image_url;
      }
    }
    
    // Fallback to localStorage if no profile found or user not authenticated
    const profileImage = localStorage.getItem('profileImageUrl');
    console.log("Retrieved profile image from storage:", profileImage);
    
    if (profileImage) {
      return profileImage;
    }
    
    // Return default image if none is found
    return '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
  } catch (error) {
    console.error("Error getting profile image:", error);
    return '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
  }
};

// Save profile image URL to Supabase and localStorage fallback
export const saveProfileImage = async (url: string): Promise<void> => {
  try {
    console.log("Saving profile image:", url);
    
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      // User is authenticated, save to Supabase
      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert({
          id: session.user.id,
          profile_image_url: url,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        });
      
      if (upsertError) {
        console.error("Error saving profile to Supabase:", upsertError);
      } else {
        console.log("Profile image saved to Supabase");
      }
    }
    
    // Always save to localStorage as fallback
    localStorage.setItem('profileImageUrl', url);
  } catch (error) {
    console.error("Error saving profile image:", error);
  }
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
      
      // Upload to Supabase Storage in the connection_images bucket
      const bucket = personId ? 'connection_images' : 'profile_images';
      
      // Check if bucket exists, if not create it (this is a fallback)
      try {
        const { data: buckets } = await supabase.storage.listBuckets();
        const bucketExists = buckets?.some(b => b.name === bucket);
        
        if (!bucketExists) {
          // Attempt to create the bucket
          await supabase.storage.createBucket(bucket, {
            public: true
          });
        }
      } catch (bucketError) {
        console.error(`Error checking/creating ${bucket} bucket:`, bucketError);
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
      
      // If this is a connection image, save the relationship to the database
      if (personId) {
        const { error: relationError } = await supabase
          .from('connection_images')
          .upsert({
            person_id: personId,
            image_path: publicUrl,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'person_id'
          });
        
        if (relationError) {
          console.error("Error saving connection image relationship:", relationError);
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

// Convert uploaded file to data URL for storage
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Get connection image from Supabase or localStorage
export const getConnectionImage = async (personId: string): Promise<string | null> => {
  try {
    // First try to get from connection_images table
    const { data: connectionImage, error } = await supabase
      .from('connection_images')
      .select('image_path')
      .eq('person_id', personId)
      .maybeSingle();
    
    if (error) {
      console.error("Error fetching connection image:", error);
    }
    
    if (connectionImage?.image_path) {
      return connectionImage.image_path;
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
    return null;
  }
};
