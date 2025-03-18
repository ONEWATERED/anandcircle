
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
      <div className="flex flex-col items-center w-full bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
        {/* Hero section with dark tech background */}
        <div className="w-full">
          <Hero />
        </div>
        
        {/* Story section with white background for contrast */}
        <div className="w-full py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Story />
          </div>
        </div>
        
        {/* Passion section with slate background */}
        <div className="w-full py-16 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <PassionSection />
          </div>
        </div>
        
        {/* Following section with consistent dark background */}
        <div className="w-full py-16 bg-[#1E293B] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FollowingSection />
          </div>
        </div>
        
        {/* Tabbed content with dark tech background */}
        <div className="w-full py-16 bg-[#0F172A] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <TabbedContentSection />
          </div>
        </div>
        
        {/* Interest form with consistent dark background */}
        <div className="w-full py-16 bg-[#1E293B] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <InterestForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
