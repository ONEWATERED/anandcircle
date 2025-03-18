
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
      {/* Futuristic tech background with reduced opacity */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute inset-0 bg-tech-mesh opacity-70">
          <BackgroundParticles isMobile={isMobile} />
          <div className="absolute inset-0 bg-glowing-dots opacity-30"></div>
        </div>
      </div>
      
      {/* Content with higher z-index */}
      <div className="relative z-[2]">
        <Hero />
        <div className="reduced-gap">
          <Story />
        </div>
        <div className="reduced-gap">
          <div className="bg-cyber py-16 bg-opacity-70">
            <PassionSection />
          </div>
        </div>
        <div className="tighter-gap">
          <div className="bg-data-pattern py-16">
            <FollowingSection />
          </div>
        </div>
        <div className="reduced-gap">
          <TabbedContentSection />
        </div>
        <div className="reduced-gap">
          <div className="bg-tech-gradient py-16">
            <InterestForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
