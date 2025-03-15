// This utility handles loading and saving profile images 
import { supabase } from "@/integrations/supabase/client";

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
export const uploadImageToStorage = async (imageFile: File): Promise<string | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      throw new Error("User not authenticated");
    }
    
    // Create a unique file name
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${session.user.id}/${fileName}`;
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('profile_images')
      .upload(filePath, imageFile, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) {
      throw error;
    }
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('profile_images')
      .getPublicUrl(data.path);
    
    // Save this URL to the profile
    await saveProfileImage(publicUrl);
    
    return publicUrl;
  } catch (error) {
    console.error("Error uploading image to Supabase Storage:", error);
    return null;
  }
};

// Clear profile image from storage
export const clearProfileImage = async (): Promise<void> => {
  // Remove from localStorage
  localStorage.removeItem('profileImageUrl');
  
  // Check if user is authenticated and update Supabase
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user) {
    const { error } = await supabase
      .from('profiles')
      .update({ profile_image_url: null, updated_at: new Date().toISOString() })
      .eq('id', session.user.id);
    
    if (error) {
      console.error("Error clearing profile image in Supabase:", error);
    }
  }
};

// Check if an image URL is valid
export const isValidImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('Content-Type');
    return response.ok && contentType ? contentType.startsWith('image/') : false;
  } catch (error) {
    console.error('Error validating image URL:', error);
    return false;
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

// Create a function to handle database uploads
export const uploadImageToDatabase = async (imageFile: File): Promise<string> => {
  try {
    // First try to upload to Supabase Storage
    const storageUrl = await uploadImageToStorage(imageFile);
    
    if (storageUrl) {
      return storageUrl;
    }
    
    // Fallback to data URL if storage upload fails
    const dataUrl = await fileToDataUrl(imageFile);
    await saveProfileImage(dataUrl);
    return dataUrl;
  } catch (error) {
    console.error("Error uploading image to database:", error);
    throw error;
  }
};

// Check if Supabase connection is working
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.from('profiles').select('id').limit(1);
    return !error;
  } catch (error) {
    console.error("Error checking database connection:", error);
    return false;
  }
};

// Get all user profile data including social links
export const getUserProfileData = async () => {
  try {
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      // Get profile and social links from Supabase
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('profile_image_url')
        .eq('id', session.user.id)
        .single();
      
      if (profileError && profileError.code !== 'PGRST116') {
        console.error("Error fetching profile:", profileError);
      }
      
      const { data: socialLinks, error: linksError } = await supabase
        .from('social_links')
        .select('platform, url')
        .eq('user_id', session.user.id);
      
      if (linksError) {
        console.error("Error fetching social links:", linksError);
      }
      
      // If we got data from Supabase, format and return it
      if (profile || (socialLinks && socialLinks.length > 0)) {
        const formattedLinks: Record<string, string> = {};
        
        if (socialLinks) {
          socialLinks.forEach(link => {
            formattedLinks[link.platform] = link.url;
          });
        }
        
        return {
          profileImage: profile?.profile_image_url,
          socialLinks: {
            linkedIn: formattedLinks['linkedIn'] || 'https://linkedin.com/in/hardeepanand',
            twitter: formattedLinks['twitter'] || 'https://twitter.com/hardeepanand',
            youtube: formattedLinks['youtube'] || 'https://youtube.com/@hardeepanand',
            spotify: formattedLinks['spotify'] || 'https://open.spotify.com/user/hardeepanand',
            anandCircle: formattedLinks['anandCircle'] || '#anand-circle'
          }
        };
      }
    }
    
    // Fallback to localStorage
    const profileImage = localStorage.getItem('profileImageUrl');
    const linkedInUrl = localStorage.getItem('linkedInUrl') || 'https://linkedin.com/in/hardeepanand';
    const twitterUrl = localStorage.getItem('twitterUrl') || 'https://twitter.com/hardeepanand';
    const youtubeUrl = localStorage.getItem('youtubeUrl') || 'https://youtube.com/@hardeepanand';
    const spotifyUrl = localStorage.getItem('spotifyUrl') || 'https://open.spotify.com/user/hardeepanand';
    const anandCircleUrl = localStorage.getItem('anandCircleUrl') || '#anand-circle';
    
    return {
      profileImage,
      socialLinks: {
        linkedIn: linkedInUrl,
        twitter: twitterUrl,
        youtube: youtubeUrl,
        spotify: spotifyUrl,
        anandCircle: anandCircleUrl
      }
    };
  } catch (error) {
    console.error("Error getting user profile data:", error);
    return null;
  }
};

// Save user social media links
export const saveSocialLinks = async (links: {
  linkedIn?: string;
  twitter?: string;
  youtube?: string;
  spotify?: string;
  anandCircle?: string;
}): Promise<void> => {
  try {
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      // Save to Supabase
      // First ensure there's a profile for this user
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: session.user.id,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        });
      
      if (profileError) {
        console.error("Error ensuring profile exists:", profileError);
      }
      
      // Now save each social link individually
      for (const [platform, url] of Object.entries(links)) {
        if (!url) continue;
        
        // Fix: Use correct format for the upsert operation
        const { error } = await supabase
          .from('social_links')
          .upsert({
            user_id: session.user.id,
            platform,
            url,
            updated_at: new Date().toISOString()
          }, {
            onConflict: ['user_id', 'platform']
          });
        
        if (error) {
          console.error(`Error saving ${platform} link:`, error);
        }
      }
    }
    
    // Save each link to localStorage as fallback
    if (links.linkedIn) localStorage.setItem('linkedInUrl', links.linkedIn);
    if (links.twitter) localStorage.setItem('twitterUrl', links.twitter);
    if (links.youtube) localStorage.setItem('youtubeUrl', links.youtube);
    if (links.spotify) localStorage.setItem('spotifyUrl', links.spotify);
    if (links.anandCircle) localStorage.setItem('anandCircleUrl', links.anandCircle);
  } catch (error) {
    console.error("Error saving social links:", error);
  }
};
