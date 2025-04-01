
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getUserProfileData } from '@/utils/profileImages';
import { motion } from 'framer-motion';
import SocialMediaLinks from './profile/SocialMediaLinks';
import StoryLoading from './story/StoryLoading';
import StoryViewSelector from './story/StoryViewSelector';
import TimelineView from './story/TimelineView';
import TilesView from './story/TilesView';
import AccordionView from './story/AccordionView';
import TabsView from './story/TabsView';

const Story = () => {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState(false);
  const [activeView, setActiveView] = useState('tiles'); // 'tiles', 'timeline', 'accordion', 'tabs'
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    positions: [],
  });
  
  const [socialLinks, setSocialLinks] = useState({
    linkedIn: 'https://linkedin.com/in/hardeepanand',
    twitter: 'https://twitter.com/hardeepanand',
    youtube: 'https://youtube.com/@hardeepanand',
    spotify: 'https://open.spotify.com/user/hardeepanand',
    anandCircle: 'https://www.circleso.com'
  });
  
  useEffect(() => {
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
    
    fetchProfileData();
  }, []);
  
  // Loading state
  if (loading) {
    return <StoryLoading />;
  }
  
  // Render the selected view components based on active view
  const renderActiveView = () => {
    switch (activeView) {
      case 'timeline':
        return <TimelineView positions={profile.positions} />;
      case 'tiles':
        return <TilesView positions={profile.positions} />;
      case 'accordion':
        return <AccordionView positions={profile.positions} />;
      case 'tabs':
        return <TabsView positions={profile.positions} isMobile={isMobile} />;
      default:
        return <TilesView positions={profile.positions} />; // Default to tiles view
    }
  };
  
  return (
    <div id="story" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-tech-dark border-t border-[#0EA5E9]/10">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 text-gradient-tech">
            My Story
          </h2>
          <div className="w-20 h-1 bg-gradient-tech mx-auto mb-6"></div>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            {profile.bio}
          </p>
          
          {/* View selector component */}
          <StoryViewSelector activeView={activeView} setActiveView={setActiveView} />
        </div>
        
        {/* Render the selected view */}
        <div className="mb-10">
          {renderActiveView()}
        </div>
        
        {/* Social Media Links */}
        <div className="pt-8 flex justify-center">
          <div className="max-w-md w-full">
            <h4 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider text-center">Connect With Me</h4>
            <SocialMediaLinks 
              links={socialLinks} 
              iconColor="text-white" 
              hoverColor="hover:text-[#0EA5E9]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Story;
