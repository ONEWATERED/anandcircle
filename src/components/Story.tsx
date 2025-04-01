
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import SocialMediaLinks from './profile/SocialMediaLinks';
import { toast } from 'sonner';
import { getUserProfileData } from '@/utils/profileImages';
import { motion } from 'framer-motion';

const Story = () => {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState(false);
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
  
  if (loading) {
    return (
      <div id="story" className="py-8 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-tech-dark text-white">
        <div className="text-center mb-8 md:mb-12">
          <Skeleton className="h-8 w-40 mx-auto mb-4 bg-tech-dark/50" />
          <Skeleton className="h-4 w-full max-w-3xl mx-auto bg-tech-dark/50" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative pl-8 border-l-2 border-[#0EA5E9]/30 pb-6">
                <Skeleton className="h-4 w-full mb-2 bg-tech-dark/50" />
                <Skeleton className="h-16 w-full bg-tech-dark/50" />
                <Skeleton className="h-3 w-20 mt-2 bg-tech-dark/50" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div id="story" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-tech-dark border-t border-[#0EA5E9]/10">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 text-gradient-tech">
            My Story
          </h2>
          <div className="w-20 h-1 bg-gradient-tech mx-auto mb-6"></div>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
            {profile.bio}
          </p>
        </div>
        
        <div className="w-full space-y-8">
          {profile.positions.length > 0 ? (
            profile.positions.map((position, index) => (
              <motion.div 
                key={position.id} 
                className="relative pl-8 border-l-2 border-[#0EA5E9]/30 pb-8 hover:border-[#0EA5E9] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-tech-dark border-2 border-[#0EA5E9] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#0EA5E9]"></div>
                </div>
                <div className="p-6 rounded-lg glass-panel shadow-neon-cyan hover:shadow-lg transition-all duration-300 border border-[#0EA5E9]/20">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {position.title}
                  </h3>
                  <p className="text-gray-300">
                    {position.description}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-10 px-6 border-2 border-dashed border-[#0EA5E9]/20 rounded-lg glass-panel">
              <p className="text-gray-400">Career milestones will appear here</p>
            </div>
          )}
          
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
        </div>
      </motion.div>
    </div>
  );
};

export default Story;
