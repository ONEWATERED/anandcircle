
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import SocialMediaLinks from './profile/SocialMediaLinks';
import { toast } from 'sonner';
import { getUserProfileData } from '@/utils/profileImages';
import { motion } from 'framer-motion';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  ChevronRight, 
  ChevronDown, 
  Milestone,
  GraduationCap,
  Briefcase,
  Shield,
  Droplets,
  Lightbulb,
  Globe,
  Star
} from 'lucide-react';

// Map icon names to Lucide icon components
const iconMap = {
  'GraduationCap': GraduationCap,
  'Briefcase': Briefcase,
  'Shield': Shield, 
  'Droplets': Droplets,
  'Lightbulb': Lightbulb,
  'Globe': Globe,
  'Star': Star,
  'Milestone': Milestone // fallback
};

const Story = () => {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState(false);
  const [activeView, setActiveView] = useState('tiles'); // 'tiles', 'timeline', 'accordion', 'compact'
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

  // Render a specific icon based on the provided icon name
  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || iconMap.Milestone;
    return <IconComponent className="h-5 w-5 text-[#0EA5E9]" />;
  };
  
  // Loading state
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

  // Render timeline view (original style)
  const renderTimelineView = () => (
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
    </div>
  );

  // Render tile view (grid layout)
  const renderTilesView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {profile.positions.length > 0 ? (
        profile.positions.map((position, index) => (
          <motion.div 
            key={position.id}
            className="rounded-lg glass-panel shadow-neon-cyan hover:shadow-lg transition-all duration-300 border border-[#0EA5E9]/20 overflow-hidden h-full flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
          >
            <div className="p-5 bg-gradient-to-r from-[#0EA5E9]/10 to-transparent border-b border-[#0EA5E9]/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center">
                {renderIcon(position.icon)}
              </div>
              <h3 className="text-lg font-semibold text-white flex-1 truncate">{position.title}</h3>
              <div className="text-xs font-medium rounded-full px-2 py-1 bg-[#0EA5E9]/20 text-[#0EA5E9]">
                {position.order_position}
              </div>
            </div>
            <div className="p-5 flex-1">
              <p className="text-gray-300 text-sm">
                {position.description}
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="text-center py-10 px-6 border-2 border-dashed border-[#0EA5E9]/20 rounded-lg glass-panel col-span-full">
          <p className="text-gray-400">Career milestones will appear here</p>
        </div>
      )}
    </div>
  );

  // Render accordion view
  const renderAccordionView = () => (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {profile.positions.length > 0 ? (
        profile.positions.map((position) => (
          <AccordionItem 
            key={position.id} 
            value={position.id}
            className="border-[#0EA5E9]/20 rounded-lg overflow-hidden glass-panel shadow-neon-cyan hover:shadow-lg transition-all duration-200"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline group data-[state=open]:bg-[#0EA5E9]/10">
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center shrink-0">
                  {renderIcon(position.icon)}
                </div>
                <span className="font-semibold text-white group-hover:text-[#0EA5E9] transition-colors">
                  {position.title}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4 pt-1 text-gray-300">
              {position.description}
            </AccordionContent>
          </AccordionItem>
        ))
      ) : (
        <div className="text-center py-10 px-6 border-2 border-dashed border-[#0EA5E9]/20 rounded-lg glass-panel">
          <p className="text-gray-400">Career milestones will appear here</p>
        </div>
      )}
    </Accordion>
  );

  // Render tabs view (compact)
  const renderTabsView = () => (
    <Tabs defaultValue={profile.positions[0]?.id || "tab-1"} className="w-full">
      <TabsList className="grid grid-cols-3 md:grid-cols-7 h-auto p-1 bg-[#0EA5E9]/10 rounded-lg mb-6 overflow-x-auto">
        {profile.positions.map((position, index) => (
          <TabsTrigger 
            key={position.id} 
            value={position.id}
            className="py-3 data-[state=active]:bg-[#0EA5E9]/20 data-[state=active]:text-[#0EA5E9] flex items-center gap-2"
          >
            <span className="hidden md:inline">{renderIcon(position.icon)}</span>
            <span className="text-xs md:text-sm whitespace-nowrap">
              {isMobile ? `Step ${index + 1}` : position.title}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
      
      {profile.positions.map((position) => (
        <TabsContent 
          key={position.id} 
          value={position.id}
          className="mt-0 rounded-lg glass-panel shadow-neon-cyan p-6 border border-[#0EA5E9]/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center">
              {renderIcon(position.icon)}
            </div>
            <h3 className="text-xl font-semibold text-white">{position.title}</h3>
          </div>
          <p className="text-gray-300">{position.description}</p>
        </TabsContent>
      ))}
    </Tabs>
  );
  
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
          
          {/* View toggle buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView('tiles')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                activeView === 'tiles' 
                  ? 'bg-[#0EA5E9] text-white' 
                  : 'bg-[#0EA5E9]/10 text-gray-300 hover:bg-[#0EA5E9]/20'
              }`}
            >
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
              </div>
              <span className="text-sm">Tiles</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView('timeline')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                activeView === 'timeline' 
                  ? 'bg-[#0EA5E9] text-white' 
                  : 'bg-[#0EA5E9]/10 text-gray-300 hover:bg-[#0EA5E9]/20'
              }`}
            >
              <div className="w-4 h-4 flex flex-col items-center">
                <div className="w-0.5 h-full bg-current"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full -mt-1.5"></div>
              </div>
              <span className="text-sm">Timeline</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView('accordion')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                activeView === 'accordion' 
                  ? 'bg-[#0EA5E9] text-white' 
                  : 'bg-[#0EA5E9]/10 text-gray-300 hover:bg-[#0EA5E9]/20'
              }`}
            >
              <ChevronDown className="h-4 w-4" />
              <span className="text-sm">Accordion</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView('tabs')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                activeView === 'tabs' 
                  ? 'bg-[#0EA5E9] text-white' 
                  : 'bg-[#0EA5E9]/10 text-gray-300 hover:bg-[#0EA5E9]/20'
              }`}
            >
              <div className="flex">
                <div className="h-4 w-4 border-t-2 border-l-2 border-r-2 border-current rounded-t-sm"></div>
                <div className="h-4 w-4 border-t-2 border-r-2 border-current ml-0.5 rounded-tr-sm opacity-70"></div>
              </div>
              <span className="text-sm">Tabs</span>
            </motion.button>
          </div>
        </div>
        
        {/* Render the selected view */}
        <div className="mb-10">
          {activeView === 'tiles' && renderTilesView()}
          {activeView === 'timeline' && renderTimelineView()}
          {activeView === 'accordion' && renderAccordionView()}
          {activeView === 'tabs' && renderTabsView()}
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
