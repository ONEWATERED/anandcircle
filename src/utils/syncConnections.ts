
import { supabase } from "@/integrations/supabase/client";
import { familyMembers } from "@/data/familyData";
import { defaultPeople } from "@/components/following/connectionUtils";
import { saveConnectionImage } from "./connectionImages";
import { SocialLink } from "@/types/thought-leaders";

// Function to sync family members data
export const syncFamilyMembersWithDatabase = async () => {
  try {
    console.log("Starting to sync family members with database...");
    
    // For each family member, ensure there's a connection image entry
    for (const member of familyMembers) {
      // Try to find a corresponding person in the defaultPeople array
      const personMatch = defaultPeople.find(p => p.id === member.id);
      
      if (personMatch && personMatch.image && !personMatch.image.includes('/placeholder.svg')) {
        // If we found a match with an image, save the connection image
        await saveConnectionImage(member.id, personMatch.image);
        console.log(`Updated image for family member: ${member.name}`);
      } else if (member.photoUrl) {
        // If there's no match but the family member has a photoUrl, use that
        await saveConnectionImage(member.id, member.photoUrl);
        console.log(`Updated image for family member using photoUrl: ${member.name}`);
      }
      
      // Update social links if available
      if (member.socialLinks) {
        const socialLinks: SocialLink[] = Object.entries(member.socialLinks).map(([platform, url]) => ({
          platform: platform as 'instagram' | 'youtube' | 'twitter',
          url: url
        }));
        
        // Find the corresponding person in defaultPeople and update their social links
        const personIndex = defaultPeople.findIndex(p => p.id === member.id);
        if (personIndex !== -1) {
          const updatedPeople = [...defaultPeople];
          updatedPeople[personIndex] = {
            ...updatedPeople[personIndex],
            socialLinks
          };
          
          // Save updated people array to localStorage
          localStorage.setItem('connections', JSON.stringify(updatedPeople));
          console.log(`Updated social links for: ${member.name}`);
        }
      }
    }
    
    return { success: true, message: "Family members synced successfully" };
  } catch (error) {
    console.error("Error syncing family members:", error);
    return { success: false, message: "Failed to sync family members" };
  }
};

// Function to sync thought leaders data
export const syncThoughtLeadersWithDatabase = async () => {
  try {
    console.log("Starting to sync thought leaders with database...");
    
    // Get only the thought leaders (non-family members)
    const thoughtLeaders = defaultPeople.filter(p => p.category !== 'family');
    
    // For each thought leader, ensure there's a connection image entry
    for (const leader of thoughtLeaders) {
      if (leader.image && !leader.image.includes('/placeholder.svg')) {
        // Save the connection image
        await saveConnectionImage(leader.id, leader.image);
        console.log(`Updated image for thought leader: ${leader.name}`);
      }
    }
    
    // Update connections in the database to ensure all thought leaders exist
    for (const leader of thoughtLeaders) {
      const { data, error } = await supabase
        .from('connections')
        .select('id')
        .eq('id', leader.id)
        .single();
        
      if (error || !data) {
        // If connection doesn't exist in DB, create it
        const { error: insertError } = await supabase
          .from('connections')
          .insert({
            id: leader.id,
            name: leader.name,
            role: leader.role,
            category: leader.category,
            bio: leader.relationship,
            image_url: leader.image,
            special: leader.special || false
          });
          
        if (insertError) {
          console.error(`Error inserting ${leader.name}:`, insertError);
        } else {
          console.log(`Added thought leader to database: ${leader.name}`);
        }
      }
    }
    
    return { success: true, message: "Thought leaders synced successfully" };
  } catch (error) {
    console.error("Error syncing thought leaders:", error);
    return { success: false, message: "Failed to sync thought leaders" };
  }
};

// Main function to sync all connections
export const syncAllConnections = async () => {
  try {
    const familyResult = await syncFamilyMembersWithDatabase();
    const thoughtLeadersResult = await syncThoughtLeadersWithDatabase();
    
    console.log("Sync results:", { familyResult, thoughtLeadersResult });
    
    return {
      success: familyResult.success && thoughtLeadersResult.success,
      message: `Family members: ${familyResult.message}, Thought leaders: ${thoughtLeadersResult.message}`
    };
  } catch (error) {
    console.error("Error in syncAllConnections:", error);
    return { success: false, message: "Failed to sync connections" };
  }
};
