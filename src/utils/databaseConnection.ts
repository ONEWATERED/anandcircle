
import { supabase } from "@/integrations/supabase/client";

// Check database connection
export const checkDatabaseConnection = async () => {
  try {
    // First, try to query the story_milestones table which now has public access
    const { data: milestonesData, error: milestonesError } = await supabase
      .from('story_milestones')
      .select('count')
      .limit(1);
    
    if (!milestonesError) {
      console.log("Successfully connected to database via story_milestones");
      return true;
    }
    
    // Fall back to profiles if story_milestones query fails
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error("Database connection check failed:", error);
      return false;
    }
    
    console.log("Successfully connected to database");
    return true;
  } catch (error) {
    console.error("Database connection check failed:", error);
    return false;
  }
};

// Utility function to ensure URLs have proper protocol
export const ensureHttpProtocol = (url: string | null): string => {
  if (!url) return '';
  
  if (url.startsWith('#') || 
      url.startsWith('/') || 
      url.startsWith('http://') || 
      url.startsWith('https://')) {
    return url;
  }
  
  return `https://${url}`;
};
