
// Profile data management module
import { supabase } from "@/integrations/supabase/client";
import { ProfileData } from './types';
import { getProfileImage } from './profileImage';
import { ensureHttpProtocol } from '../database/databaseUtils';

// Get user profile data
export const getUserProfileData = async (): Promise<ProfileData> => {
  // Get bio from localStorage
  const bio = localStorage.getItem('userBio') || '';
  
  // Get social links from localStorage as default values
  let socialLinks = {
    linkedIn: localStorage.getItem('linkedInUrl') || 'https://linkedin.com/in/hardeepanand',
    twitter: localStorage.getItem('twitterUrl') || 'https://x.com/HardeepAnandd',
    youtube: localStorage.getItem('youtubeUrl') || 'https://youtube.com/@hardeepanand',
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

// Re-export the ProfileData type
export type { ProfileData };
