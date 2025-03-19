
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import SocialMediaLinks from './profile/SocialMediaLinks';
import { toast } from 'sonner';
import { getUserProfileData } from '@/utils/profileImages';

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
      <div id="story" className="py-8 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <Skeleton className="h-8 w-40 mx-auto mb-4" />
          <Skeleton className="h-4 w-full max-w-3xl mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative pl-8 border-l-2 border-gray-300 pb-6">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-3 w-20 mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div id="story" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
            My Story
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary/70 to-secondary mx-auto mb-6"></div>
          <p className="text-base md:text-lg text-slate-700 max-w-3xl mx-auto">
            {profile.bio}
          </p>
        </div>
        
        <div className="w-full space-y-8">
          {profile.positions.length > 0 ? (
            profile.positions.map((position, index) => (
              <div 
                key={position.id} 
                className="relative pl-8 border-l-2 border-primary/30 pb-8 hover:border-primary transition-colors"
              >
                <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div className="p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {position.title}
                  </h3>
                  <p className="text-slate-700">
                    {position.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 px-6 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-500">Career milestones will appear here</p>
            </div>
          )}
          
          {/* Social Media Links */}
          <div className="pt-8 flex justify-center">
            <div className="max-w-md w-full">
              <h4 className="text-sm font-medium text-slate-500 mb-3 uppercase tracking-wider text-center">Connect With Me</h4>
              <SocialMediaLinks links={socialLinks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
