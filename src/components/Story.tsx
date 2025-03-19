
import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import SocialMediaLinks from './profile/SocialMediaLinks';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { getProfileImage, getUserProfileData } from '@/utils/profileImages';

const Story = () => {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    photo_url: '',
    positions: [],
  });
  
  const [socialLinks, setSocialLinks] = useState({
    linkedIn: 'https://linkedin.com/in/hardeepanand',
    twitter: 'https://twitter.com/hardeepanand',
    youtube: 'https://youtube.com/@hardeepanand',
    spotify: 'https://open.spotify.com/user/hardeepanand',
    anandCircle: 'https://www.circleso.com'
  });
  
  // Helper function to get milestone icon
  const getMilestoneIcon = (iconName) => {
    return <CheckCircle2 className="h-5 w-5 text-primary" />;
  };
  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setProfileError(false);
        
        // Get profile image and data from dashboard
        const imageUrl = await getProfileImage();
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
            photo_url: imageUrl || '/lovable-uploads/be1654f2-fca6-4e4d-995d-8a3f49df9249.png',
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
          photo_url: imageUrl || profileData?.photo_url || '/lovable-uploads/be1654f2-fca6-4e4d-995d-8a3f49df9249.png',
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
          photo_url: '/lovable-uploads/be1654f2-fca6-4e4d-995d-8a3f49df9249.png',
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
          <div className="space-y-6">
            <Skeleton className="h-80 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div id="story" className="py-8 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-normal tracking-tight text-black sm:text-4xl mb-2">
          My Story
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
          {profile.bio}
        </p>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="w-full max-w-3xl space-y-6">
          {profile.positions.length > 0 ? (
            profile.positions.map((position, index) => (
              <div 
                key={position.id} 
                className="relative pl-8 border-l-2 border-primary/30 pb-6 hover:border-primary transition-colors"
              >
                <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                  {getMilestoneIcon(position.icon)}
                </div>
                <div className="p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <h3 className="text-lg md:text-xl font-medium text-black mb-2">
                    {position.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    {position.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 px-4 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-500">Career milestones will appear here</p>
            </div>
          )}
        </div>
        
        {/* Profile image and social media links */}
        <div className="mt-12 w-full max-w-xs mx-auto">
          <div className="aspect-square relative rounded-xl overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src={profile.photo_url} 
              alt="Profile" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/lovable-uploads/be1654f2-fca6-4e4d-995d-8a3f49df9249.png';
              }}
            />
          </div>
          
          {/* Social Media Links */}
          <div className="mt-8">
            <SocialMediaLinks links={socialLinks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
