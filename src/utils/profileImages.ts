
// Module for profile image management
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
        // Don't return early, try localStorage fallback
      }
      
      if (profile?.profile_image_url) {
        console.log("Retrieved profile image from Supabase:", profile.profile_image_url);
        // Also update localStorage for offline access
        localStorage.setItem('profileImageUrl', profile.profile_image_url);
        return profile.profile_image_url;
      }
    }
    
    // Fallback to localStorage if no profile found or user not authenticated
    const profileImage = localStorage.getItem('profileImageUrl');
    console.log("Retrieved profile image from localStorage:", profileImage);
    
    if (profileImage) {
      return profileImage;
    }
    
    // Return default image if none is found
    return '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
  } catch (error) {
    console.error("Error getting profile image:", error);
    
    // Final fallback to localStorage or default
    try {
      const profileImage = localStorage.getItem('profileImageUrl');
      return profileImage || '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
    } catch (e) {
      return '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
    }
  }
};

// Added this function to satisfy import in ProfileImage component
export const getUserProfileData = async () => {
  // Get the profile image URL
  const imageUrl = await getProfileImage();
  
  // Get social links from localStorage or from Supabase if authenticated
  let socialLinks = {
    linkedIn: localStorage.getItem('linkedInUrl') || 'https://linkedin.com/in/hardeepanand',
    twitter: localStorage.getItem('twitterUrl') || 'https://twitter.com/hardeepanand',
    youtube: localStorage.getItem('youtubeUrl') || 'https://youtube.com/@hardeepanand',
    spotify: localStorage.getItem('spotifyUrl') || 'https://open.spotify.com/user/hardeepanand',
    anandCircle: localStorage.getItem('anandCircleUrl') || '#anand-circle'
  };
  
  // Try to get social links from Supabase if user is authenticated
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('social_links')
        .eq('id', session.user.id)
        .single();
      
      if (!error && profile?.social_links) {
        socialLinks = {
          ...socialLinks,
          ...profile.social_links
        };
      }
    }
  } catch (error) {
    console.error("Error fetching social links from Supabase:", error);
  }
  
  return { imageUrl, socialLinks };
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
        toast.error("Failed to save profile image to database");
      } else {
        console.log("Profile image saved to Supabase");
        toast.success("Profile image saved to database");
      }
    } else {
      console.log("User not authenticated, saving to localStorage only");
    }
    
    // Always save to localStorage as fallback
    localStorage.setItem('profileImageUrl', url);
  } catch (error) {
    console.error("Error saving profile image:", error);
    toast.error("Failed to save profile image");
    
    // Try localStorage as final fallback
    try {
      localStorage.setItem('profileImageUrl', url);
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  }
};
