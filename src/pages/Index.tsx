
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
      <div className="relative z-[2] w-full">
        {/* Hero section with dark tech background */}
        <Hero />
        
        {/* Story section with tech gradient background */}
        <div className="py-12 md:py-16 w-full">
          <div className="bg-card tech-gradient-border max-w-7xl mx-auto">
            <Story />
          </div>
        </div>
        
        {/* Passion section with topographic background */}
        <div className="py-12 md:py-16 w-full">
          <div className="bg-tech-topographic py-16 w-full">
            <PassionSection />
          </div>
        </div>
        
        {/* Following section with data grid background */}
        <div className="py-8 md:py-12 w-full">
          <div className="py-16 bg-tech-grid w-full">
            <FollowingSection />
          </div>
        </div>
        
        {/* Tabbed content with dark background */}
        <div className="py-12 md:py-16 bg-tech-dark w-full">
          <TabbedContentSection />
        </div>
        
        {/* Interest form with circuit background */}
        <div className="py-12 md:py-16 w-full">
          <div className="bg-tech-circuit py-16 w-full">
            <InterestForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
