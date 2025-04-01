
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getUserProfileData } from '@/utils/profileImages';
import { StoryMilestone } from '@/hooks/useStoryMilestones';

export interface StoryProfile {
  name: string;
  bio: string;
  positions: StoryMilestone[];
}

export interface SocialLinks {
  linkedIn: string;
  twitter: string;
  youtube: string;
  spotify: string;
  anandCircle: string;
}

export function useStory() {
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState(false);
  const [activeView, setActiveView] = useState('tiles'); // 'tiles', 'timeline', 'accordion', 'tabs'
  const [profile, setProfile] = useState<StoryProfile>({
    name: '',
    bio: '',
    positions: [],
  });
  
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    linkedIn: 'https://linkedin.com/in/hardeepanand',
    twitter: 'https://twitter.com/hardeepanand',
    youtube: 'https://youtube.com/@hardeepanand',
    spotify: 'https://open.spotify.com/user/hardeepanand',
    anandCircle: 'https://www.circleso.com'
  });
  
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setProfileError(false);
      
      // Get profile data from dashboard
      const userData = await getUserProfileData();
      
      // Fetch profile data
      const { data: profileData, error: profileError } = await supabase
        .from('personal_profile')
        .select('*')
        .eq('id', 'hardeep')
        .maybeSingle();
      
      if (profileError) {
        console.error('Error fetching profile:', profileError);
        setProfileError(true);
        
        // Set default values if profile fetch fails
        setProfile({
          name: 'Hardeep Anand',
          bio: 'From innovative startups to public service leadership, my journey has been defined by a commitment to leveraging technology for positive change.',
          positions: [],
        });
        return;
      }

      // Fetch story milestones for career positions
      const { data: milestones, error: milestonesError } = await supabase
        .from('story_milestones')
        .select('*')
        .order('order_position', { ascending: true });
      
      if (milestonesError) {
        console.error('Error fetching milestones:', milestonesError);
        toast.error('Failed to load career milestones');
      }
      
      // Update social links from dashboard data
      if (userData?.socialLinks) {
        setSocialLinks({
          linkedIn: userData.socialLinks.linkedIn || socialLinks.linkedIn,
          twitter: userData.socialLinks.twitter || socialLinks.twitter,
          youtube: userData.socialLinks.youtube || socialLinks.youtube,
          spotify: userData.socialLinks.spotify || socialLinks.spotify,
          anandCircle: userData.socialLinks.anandCircle || socialLinks.anandCircle
        });
      }
      
      // Set profile data
      setProfile({
        name: profileData?.name || 'Hardeep Anand',
        bio: profileData?.bio || 'From innovative startups to public service leadership, my journey has been defined by a commitment to leveraging technology for positive change.',
        positions: milestones || [],
      });
      
      console.log("Profile data loaded:", profileData);
      console.log("Career milestones loaded:", milestones);
    } catch (error) {
      console.error('Error in fetchProfileData:', error);
      setProfileError(true);
      
      // Set default values if something goes wrong
      setProfile({
        name: 'Hardeep Anand',
        bio: 'From innovative startups to public service leadership, my journey has been defined by a commitment to leveraging technology for positive change.',
        positions: [],
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProfileData();
  }, []);
  
  return {
    loading,
    profileError,
    profile,
    socialLinks,
    activeView,
    setActiveView,
    fetchProfileData
  };
}
