
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
      {/* Background particles container - improved positioning and z-index */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute inset-0 opacity-100">
          <BackgroundParticles isMobile={isMobile} />
        </div>
      </div>
      
      {/* Content with higher z-index to be above particles */}
      <div className="relative z-[2]">
        <Hero />
        <Story />
        <PassionSection />
        <FollowingSection />
        <TabbedContentSection />
        <InterestForm />
      </div>
    </MainLayout>
  );
};

export default Index;
