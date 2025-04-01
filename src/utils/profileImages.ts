
// Module for profile image management
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getHardeepProfileImage } from "./databaseConnection";
import { isValidImageUrl } from "./fileUtils";

// Define the profile data interface
export interface ProfileData {
  bio?: string;
  photoUrl?: string;
  socialLinks?: {
    linkedIn: string;
    twitter: string;
    youtube: string;
    spotify: string;
    anandCircle: string;
  };
}

// Get profile image from Supabase or localStorage
export const getProfileImage = async (): Promise<string | null> => {
  try {
    console.log("Getting profile image");
    
    // Guaranteed default that we know exists
    const defaultImage = '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
    
    // Try to get from Hardeep profile first
    const hardeepImageUrl = await getHardeepProfileImage();
    if (hardeepImageUrl) {
      console.log("Retrieved Hardeep profile image:", hardeepImageUrl);
      
      // Validate that the image exists and is accessible
      if (await isValidImageUrl(hardeepImageUrl)) {
        return hardeepImageUrl;
      } else {
        console.warn("Hardeep profile image is not accessible:", hardeepImageUrl);
      }
    }
    
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      // User is authenticated, get profile image from Supabase profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('profile_image_url')
        .eq('id', session.user.id)
        .single();
      
      if (error) {
        console.error("Error fetching profile image from Supabase:", error);
      } else if (data?.profile_image_url) {
        console.log("Retrieved profile image from profiles table:", data.profile_image_url);
        
        // Validate that the image exists and is accessible
        if (await isValidImageUrl(data.profile_image_url)) {
          return data.profile_image_url;
        } else {
          console.warn("Profile image from database is not accessible:", data.profile_image_url);
        }
      }
    }
    
    // As a final fallback, try to get from localStorage
    const localStorageImage = localStorage.getItem('profileImageUrl');
    if (localStorageImage) {
      console.log("Retrieved profile image from localStorage:", localStorageImage);
      
      // Validate that the image exists and is accessible
      if (await isValidImageUrl(localStorageImage)) {
        return localStorageImage;
      } else {
        console.warn("localStorage profile image is not accessible:", localStorageImage);
      }
    }
    
    // If all else fails, return the default image
    console.log("Using default profile image as fallback");
    return defaultImage;
  } catch (error) {
    console.error("Error getting profile image:", error);
    return '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png'; // Guaranteed fallback
  }
};

// Get user profile data without images
export const getUserProfileData = async (): Promise<ProfileData> => {
  // Get bio from localStorage
  const bio = localStorage.getItem('userBio') || '';
  
  // Get social links from localStorage as default values
  let socialLinks = {
    linkedIn: localStorage.getItem('linkedInUrl') || 'https://linkedin.com/in/hardeepanand',
    twitter: localStorage.getItem('twitterUrl') || 'https://twitter.com/hardeepanand',
    youtube: localStorage.getItem('youtubeUrl') || 'https://youtube.com/@hardeepanand',
    spotify: localStorage.getItem('spotifyUrl') || 'https://open.spotify.com/user/hardeepanand',
    anandCircle: localStorage.getItem('anandCircleUrl') || '#anand-circle'
  };
  
  // Get profile image
  let photoUrl = await getProfileImage();
  
  // Try to get social links from Supabase if user is authenticated
  try {
    // Get personal profile social links
    const { data: socialLinksData, error } = await supabase
      .from('personal_social_links')
      .select('platform, url')
      .eq('profile_id', 'hardeep');
    
    if (!error && socialLinksData && socialLinksData.length > 0) {
      // Convert the array of social links to our expected format
      const socialLinksMap: Record<string, string> = {};
      
      socialLinksData.forEach(link => {
        // Map platform names to our expected keys
        const platformMap: Record<string, keyof typeof socialLinks> = {
          'linkedin': 'linkedIn',
          'twitter': 'twitter',
          'youtube': 'youtube',
          'spotify': 'spotify',
          'anandcircle': 'anandCircle'
        };
        
        const key = platformMap[link.platform.toLowerCase()] || link.platform.toLowerCase();
        if (key in socialLinks) {
          socialLinksMap[key] = link.url;
        }
      });
      
      // Update our socialLinks object with the values from the database
      socialLinks = {
        ...socialLinks,
        ...socialLinksMap
      };
    }
  } catch (error) {
    console.error("Error fetching social links from Supabase:", error);
  }
  
  return { bio, socialLinks, photoUrl };
};

// Save profile image URL to Supabase and localStorage fallback
export const saveProfileImage = async (url: string): Promise<void> => {
  try {
    console.log("Saving profile image:", url);
    
    // First, try to save to personal_profile table
    const { error: personalProfileError } = await supabase
      .from('personal_profile')
      .update({ photo_url: url })
      .eq('id', 'hardeep');
    
    if (personalProfileError) {
      console.error("Error saving to personal_profile:", personalProfileError);
      // Continue to try other methods
    } else {
      console.log("Profile image saved to personal_profile table");
    }
    
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
  } catch (error) {
    console.error("Error saving profile image:", error);
    toast.error("Failed to save profile image");
  }
};
