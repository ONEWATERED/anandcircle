
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import { FollowingSection } from '@/components/FollowingSection';
import PassionSection from '@/components/PassionSection';
import InterestForm from '@/components/InterestForm';
import TabbedContentSection from '@/components/TabbedContentSection';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <MainLayout>
      {/* Clean, subtle background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute inset-0 bg-grid opacity-30">
          <div className="absolute inset-0 bg-subtle-dots opacity-30"></div>
        </div>
      </div>
      
      {/* Content with higher z-index */}
      <div className="relative z-[2]">
        <Hero />
        <div className="reduced-gap">
          <div className="bg-white">
            <Story />
          </div>
        </div>
        <div className="reduced-gap">
          <div className="bg-gradient-light py-16">
            <PassionSection />
          </div>
        </div>
        <div className="tighter-gap">
          <div className="bg-dot-pattern py-16">
            <FollowingSection />
          </div>
        </div>
        <div className="reduced-gap">
          <TabbedContentSection />
        </div>
        <div className="reduced-gap">
          <div className="bg-gradient-blue py-16">
            <InterestForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
