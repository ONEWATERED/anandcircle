
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
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
        {/* Hero section */}
        <div className="w-full">
          <Hero />
        </div>
        
        {/* Passion section */}
        <div className="w-full py-12 md:py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <PassionSection />
          </div>
        </div>
        
        {/* Following section */}
        <div className="w-full py-12 md:py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FollowingSection />
          </div>
        </div>
        
        {/* Tabbed content */}
        <div className="w-full py-12 md:py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <TabbedContentSection />
          </div>
        </div>
        
        {/* Interest form */}
        <div className="w-full py-12 md:py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <InterestForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
