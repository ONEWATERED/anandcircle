
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save, Check, Users, Linkedin, Twitter, Youtube, Music } from 'lucide-react';
import { toast } from 'sonner';
import { ensureHttpProtocol } from '@/utils/databaseConnection';
import { supabase } from '@/integrations/supabase/client';

export interface SocialLinksFormValues {
  linkedInUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  spotifyUrl: string;
  anandCircleUrl: string;
}

interface SocialLinksSectionProps {
  initialValues: SocialLinksFormValues;
}

const SocialLinksSection: React.FC<SocialLinksSectionProps> = ({ initialValues }) => {
  const [isSaving, setIsSaving] = useState(false);
  
  const socialLinksForm = useForm<SocialLinksFormValues>({
    defaultValues: initialValues
  });
  
  const validateUrl = (url: string) => {
    if (!url) return true; // Empty URLs are allowed
    try {
      new URL(ensureHttpProtocol(url));
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const handleSocialLinkChange = async () => {
    const data = socialLinksForm.getValues();
    
    // Validate URLs before auto-saving
    if (!validateUrl(data.linkedInUrl) || 
        !validateUrl(data.twitterUrl) || 
        !validateUrl(data.youtubeUrl) || 
        !validateUrl(data.spotifyUrl)) {
      return;
    }
    
    await saveSocialLinks({
      linkedIn: data.linkedInUrl,
      twitter: data.twitterUrl,
      youtube: data.youtubeUrl,
      spotify: data.spotifyUrl,
      anandCircle: data.anandCircleUrl
    });
  };

  const onSocialLinksSubmit = async (data: SocialLinksFormValues) => {
    // Validate all URLs
    if (!validateUrl(data.linkedInUrl) || 
        !validateUrl(data.twitterUrl) || 
        !validateUrl(data.youtubeUrl) || 
        !validateUrl(data.spotifyUrl)) {
      toast.error('Please correct invalid URLs');
      return;
    }
    
    setIsSaving(true);
    
    try {
      const result = await saveSocialLinks({
        linkedIn: data.linkedInUrl,
        twitter: data.twitterUrl,
        youtube: data.youtubeUrl,
        spotify: data.spotifyUrl,
        anandCircle: data.anandCircleUrl
      });
      
      if (result) {
        toast.success('Social links updated successfully!');
      } else {
        toast.error('Failed to update social links');
      }
    } catch (error) {
      console.error('Error saving social links:', error);
      toast.error('Failed to update social links');
    } finally {
      setIsSaving(false);
    }
  };

  // Function to save social links to database and localStorage
  const saveSocialLinks = async (links: {
    linkedIn: string;
    twitter: string;
    youtube: string;
    spotify: string;
    anandCircle: string;
  }) => {
    const success = {
      database: false,
      localStorage: false
    };

    try {
      // First check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // User is authenticated, save to Supabase first
        try {
          // Prepare the social links for insertion with validated URLs
          const socialLinksToInsert = [
            { user_id: session.user.id, platform: 'linkedin', url: ensureHttpProtocol(links.linkedIn) },
            { user_id: session.user.id, platform: 'twitter', url: ensureHttpProtocol(links.twitter) },
            { user_id: session.user.id, platform: 'youtube', url: ensureHttpProtocol(links.youtube) },
            { user_id: session.user.id, platform: 'spotify', url: ensureHttpProtocol(links.spotify) },
            { user_id: session.user.id, platform: 'anandcircle', url: links.anandCircle }
          ];
          
          // Delete existing links for this user
          await supabase
            .from('social_links')
            .delete()
            .eq('user_id', session.user.id);
          
          // Insert new links
          const { error } = await supabase
            .from('social_links')
            .insert(socialLinksToInsert);
            
          if (error) {
            console.error("Error saving social links to Supabase:", error);
          } else {
            console.log("Social links saved to Supabase");
            success.database = true;
            
            // Also update personal_social_links for profile sync
            await updatePersonalSocialLinks(links);
          }
        } catch (dbError) {
          console.error("Database error saving social links:", dbError);
        }
      } else {
        console.log("User not authenticated, trying to save to personal_social_links");
        // Try to save to personal_social_links as fallback
        const result = await updatePersonalSocialLinks(links);
        success.database = result;
      }
      
      // Always save to localStorage as fallback
      try {
        // Save links individually to avoid quota issues
        Object.entries(links).forEach(([key, value]) => {
          try {
            localStorage.setItem(`${key}Url`, value);
          } catch (e) {
            console.warn(`Could not save ${key} to localStorage:`, e);
          }
        });
        success.localStorage = true;
      } catch (error) {
        console.error("Error saving links to localStorage:", error);
      }
      
      return success.database || success.localStorage;
    } catch (error) {
      console.error("Error in saveSocialLinks:", error);
      return false;
    }
  };
  
  // Helper function to update personal_social_links table
  const updatePersonalSocialLinks = async (links: {
    linkedIn: string;
    twitter: string;
    youtube: string;
    spotify: string;
    anandCircle: string;
  }) => {
    try {
      // Convert to platform format used in database with validated URLs
      const platformLinks = [
        { profile_id: 'hardeep', platform: 'linkedin', url: ensureHttpProtocol(links.linkedIn) },
        { profile_id: 'hardeep', platform: 'twitter', url: ensureHttpProtocol(links.twitter) },
        { profile_id: 'hardeep', platform: 'youtube', url: ensureHttpProtocol(links.youtube) },
        { profile_id: 'hardeep', platform: 'spotify', url: ensureHttpProtocol(links.spotify) },
        { profile_id: 'hardeep', platform: 'anandcircle', url: links.anandCircle }
      ];
      
      // Delete existing links
      await supabase
        .from('personal_social_links')
        .delete()
        .eq('profile_id', 'hardeep');
      
      // Insert new links
      const { error } = await supabase
        .from('personal_social_links')
        .insert(platformLinks);
        
      if (error) {
        console.error("Error updating personal_social_links:", error);
        return false;
      }
      
      console.log("Successfully updated personal_social_links");
      return true;
    } catch (error) {
      console.error("Error in updatePersonalSocialLinks:", error);
      return false;
    }
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <h2 className="text-xl font-display font-semibold mb-4 flex items-center">
        <Users className="mr-2" size={20} />
        Social Links
      </h2>
      
      <Form {...socialLinksForm}>
        <form onChange={handleSocialLinkChange} onSubmit={socialLinksForm.handleSubmit(onSocialLinksSubmit)} className="space-y-4">
          <FormField
            control={socialLinksForm.control}
            name="linkedInUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Linkedin className="mr-2" size={16} />
                  LinkedIn URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://linkedin.com/in/yourprofile"
                    {...field}
                    className={!validateUrl(field.value) ? "border-red-500" : ""}
                  />
                </FormControl>
                {!validateUrl(field.value) && (
                  <FormMessage>Please enter a valid URL</FormMessage>
                )}
              </FormItem>
            )}
          />
          
          <FormField
            control={socialLinksForm.control}
            name="twitterUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Twitter className="mr-2" size={16} />
                  Twitter URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://twitter.com/yourhandle"
                    {...field}
                    className={!validateUrl(field.value) ? "border-red-500" : ""}
                  />
                </FormControl>
                {!validateUrl(field.value) && (
                  <FormMessage>Please enter a valid URL</FormMessage>
                )}
              </FormItem>
            )}
          />
          
          <FormField
            control={socialLinksForm.control}
            name="youtubeUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Youtube className="mr-2" size={16} />
                  YouTube URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://youtube.com/@youraccount"
                    {...field}
                    className={!validateUrl(field.value) ? "border-red-500" : ""}
                  />
                </FormControl>
                {!validateUrl(field.value) && (
                  <FormMessage>Please enter a valid URL</FormMessage>
                )}
              </FormItem>
            )}
          />
          
          <FormField
            control={socialLinksForm.control}
            name="spotifyUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Music className="mr-2" size={16} />
                  Spotify URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://open.spotify.com/user/youraccount"
                    {...field}
                    className={!validateUrl(field.value) ? "border-red-500" : ""}
                  />
                </FormControl>
                {!validateUrl(field.value) && (
                  <FormMessage>Please enter a valid URL</FormMessage>
                )}
              </FormItem>
            )}
          />
          
          <FormField
            control={socialLinksForm.control}
            name="anandCircleUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Users className="mr-2" size={16} />
                  ANAND Circle URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="#anand-circle"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <Button type="submit" className="mt-4" disabled={isSaving}>
            {isSaving ? (
              <>
                <span className="animate-spin mr-2">⟳</span>
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save All Social Links
              </>
            )}
          </Button>
          
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <Check className="text-green-500 mr-2" size={16} />
            <span>Valid changes are automatically saved</span>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SocialLinksSection;
