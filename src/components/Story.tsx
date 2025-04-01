
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import SocialMediaLinks from './profile/SocialMediaLinks';
import StoryLoading from './story/StoryLoading';
import StoryViewSelector from './story/StoryViewSelector';
import TimelineView from './story/TimelineView';
import TilesView from './story/TilesView';
import AccordionView from './story/AccordionView';
import TabsView from './story/TabsView';
import { useStory } from '@/hooks/useStory';

const Story = () => {
  const isMobile = useIsMobile();
  const { 
    loading, 
    profile, 
    socialLinks, 
    activeView, 
    setActiveView 
  } = useStory();
  
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
