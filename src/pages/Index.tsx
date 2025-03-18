
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
        <div className="absolute inset-0 bg-grid opacity-20">
          <div className="absolute inset-0 bg-subtle-dots opacity-20"></div>
        </div>
      </div>
      
      {/* Content with higher z-index */}
      <div className="relative z-[2]">
        <Hero />
        <div className="py-12 md:py-16">
          <div className="bg-white">
            <Story />
          </div>
        </div>
        <div className="py-12 md:py-16">
          <div className="bg-gradient-light py-16">
            <PassionSection />
          </div>
        </div>
        <div className="py-8 md:py-12">
          <div className="bg-dot-pattern py-16">
            <FollowingSection />
          </div>
        </div>
        <div className="py-12 md:py-16">
          <TabbedContentSection />
        </div>
        <div className="py-12 md:py-16">
          <div className="bg-gradient-blue py-16">
            <InterestForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
