
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PersonalProfile } from '@/types/thought-leaders';
import { useToast } from '@/components/ui/use-toast';

export const useProfileDashboard = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [frontendImageUrl, setFrontendImageUrl] = useState<string | null>(null);
  const [profile, setProfile] = useState<PersonalProfile>({
    id: 'hardeep',
    name: 'Hardeep Anand',
    bio: '',
    photo_url: null,
    resume_url: null,
    socialLinks: {
      linkedin: '',
      twitter: '',
      youtube: '',
      spotify: '',
      anandcircle: ''
    }
  });

  // Load profile data from Supabase and localStorage
  const loadProfileData = async () => {
    setIsLoading(true);
    try {
      // Get personal profile from Supabase
      const { data: profileData, error: profileError } = await supabase
        .from('personal_profile')
        .select('*')
        .eq('id', 'hardeep')
        .single();

      if (profileError) throw profileError;

      // Get social links
      const { data: socialLinksData, error: socialLinksError } = await supabase
        .from('personal_social_links')
        .select('*')
        .eq('profile_id', 'hardeep');

      if (socialLinksError) throw socialLinksError;

      // Create socialLinks object from array
      const socialLinks = {};
      
      socialLinksData.forEach(link => {
        socialLinks[link.platform] = link.url;
      });

      setProfile({
        id: profileData.id,
        name: profileData.name,
        bio: profileData.bio || '',
        photo_url: profileData.photo_url,
        resume_url: profileData.resume_url,
        socialLinks
      });
    } catch (error) {
      console.error('Error loading profile data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile data',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load frontend image from localStorage
  const loadFrontendImage = () => {
    try {
      const storedProfile = localStorage.getItem('personalProfile');
      if (storedProfile) {
        const profileData = JSON.parse(storedProfile);
        if (profileData.photo_url) {
          setFrontendImageUrl(profileData.photo_url);
        }
      }
    } catch (error) {
      console.error('Error loading frontend image:', error);
    }
  };

  // Update social link
  const updateSocialLink = (platform: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  // Save profile changes
  const saveProfile = async () => {
    try {
      setIsSaving(true);
      
      // Update profile data
      const { error: profileError } = await supabase
        .from('personal_profile')
        .update({
          name: profile.name,
          bio: profile.bio
        })
        .eq('id', 'hardeep');

      if (profileError) throw profileError;

      // Update social links
      if (profile.socialLinks) {
        // Delete existing links
        const { error: deleteError } = await supabase
          .from('personal_social_links')
          .delete()
          .eq('profile_id', 'hardeep');

        if (deleteError) throw deleteError;

        // Insert new links
        const linksToInsert = Object.entries(profile.socialLinks).map(([platform, url]) => ({
          profile_id: 'hardeep',
          platform,
          url: url || ''
        })).filter(link => link.url.trim() !== '');

        if (linksToInsert.length > 0) {
          const { error: insertError } = await supabase
            .from('personal_social_links')
            .insert(linksToInsert);

          if (insertError) throw insertError;
        }
      }
      
      toast({
        title: 'Success',
        description: 'Profile updated successfully.'
      });
      
      return true;
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile.',
        variant: 'destructive'
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    loadProfileData();
    loadFrontendImage();
  }, []);

  return {
    profile,
    setProfile,
    isLoading,
    isSaving,
    frontendImageUrl,
    setFrontendImageUrl,
    loadFrontendImage,
    loadProfileData,
    updateSocialLink,
    saveProfile,
    setIsSaving
  };
};
