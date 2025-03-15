
import { supabase } from "@/integrations/supabase/client";
import { familyMembers } from "@/data/familyData";
import { people } from "@/components/FollowingSection";
import { saveConnectionImage } from "./connectionImages";

// Function to sync family members data
export const syncFamilyMembersWithDatabase = async () => {
  try {
    console.log("Starting to sync family members with database...");
    
    // For each family member, ensure there's a connection image entry
    for (const member of familyMembers) {
      // Try to find a corresponding person in the people array
      const personMatch = people.find(p => p.id === member.id);
      
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
        const socialLinks = Object.entries(member.socialLinks).map(([platform, url]) => ({
          platform,
          url
        }));
        
        // Find the corresponding person and update their social links
        const personIndex = people.findIndex(p => p.id === member.id);
        if (personIndex !== -1) {
          const updatedPeople = [...people];
          updatedPeople[personIndex] = {
            ...updatedPeople[personIndex],
            socialLinks: socialLinks.map(link => ({
              platform: link.platform as 'instagram' | 'youtube' | 'twitter',
              url: link.url
            }))
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
    const thoughtLeaders = people.filter(p => p.category !== 'family');
    
    // For each thought leader, ensure there's a connection image entry
    for (const leader of thoughtLeaders) {
      if (leader.image && !leader.image.includes('/placeholder.svg')) {
        // Save the connection image
        await saveConnectionImage(leader.id, leader.image);
        console.log(`Updated image for thought leader: ${leader.name}`);
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
