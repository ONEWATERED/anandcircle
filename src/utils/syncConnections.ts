
import { supabase } from "@/integrations/supabase/client";
import { defaultPeople } from "@/components/following/connectionUtils";
import { SocialLink } from "@/types/connections";

// Main function to sync all connections
export const syncAllConnections = async () => {
  try {
    console.log("Connection syncing has been disabled.");
    return {
      success: true,
      message: "Connection syncing has been disabled."
    };
  } catch (error) {
    console.error("Error in syncAllConnections:", error);
    return { success: false, message: "Failed to sync connections" };
  }
};
