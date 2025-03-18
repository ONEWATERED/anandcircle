
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
      <div className="flex flex-col items-center w-full">
        {/* Hero section with dark tech background */}
        <div className="w-full">
          <Hero />
        </div>
        
        {/* Story section with white background for contrast */}
        <div className="w-full py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Story />
          </div>
        </div>
        
        {/* Passion section with topographic background */}
        <div className="w-full py-16 bg-slate-100">
          <PassionSection />
        </div>
        
        {/* Following section with data grid background */}
        <div className="w-full py-16 bg-tech-dark" style={{ backgroundColor: '#1E293B' }}>
          <FollowingSection />
        </div>
        
        {/* Tabbed content with dark tech background */}
        <div className="w-full py-16 bg-tech-dark" style={{ backgroundColor: '#0F172A' }}>
          <TabbedContentSection />
        </div>
        
        {/* Interest form with circuit background */}
        <div className="w-full py-16 bg-tech-dark" style={{ backgroundColor: '#1E293B' }}>
          <InterestForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
