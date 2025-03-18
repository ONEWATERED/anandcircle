
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import { FollowingSection } from '@/components/FollowingSection';
import PassionSection from '@/components/PassionSection';
import InterestForm from '@/components/InterestForm';
import TabbedContentSection from '@/components/TabbedContentSection';
import BackgroundParticles from '@/components/domain-graphic/BackgroundParticles';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <MainLayout>
      {/* Background particles container with reduced opacity */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-50">
          <BackgroundParticles isMobile={isMobile} />
        </div>
      </div>
      
      {/* Content with higher z-index and reduced spacing */}
      <div className="relative z-[2]">
        <Hero />
        <div className="reduced-gap">
          <Story />
        </div>
        <div className="reduced-gap">
          <PassionSection />
        </div>
        <div className="tighter-gap">
          <FollowingSection />
        </div>
        <div className="reduced-gap">
          <TabbedContentSection />
        </div>
        <div className="reduced-gap">
          <InterestForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
