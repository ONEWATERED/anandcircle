
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
      {/* Background particles container */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <BackgroundParticles isMobile={isMobile} />
      </div>
      
      <Hero />
      <Story />
      <PassionSection />
      <FollowingSection />
      <TabbedContentSection />
      <InterestForm />
    </MainLayout>
  );
};

export default Index;
