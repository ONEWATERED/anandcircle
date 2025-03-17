
import { supabase } from "@/integrations/supabase/client";

// Check database connection
export const checkDatabaseConnection = async () => {
  try {
    // Try a simple query to verify connection
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    
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
