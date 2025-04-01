
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import PassionSection from '@/components/PassionSection';
import InterestForm from '@/components/InterestForm';
import TabbedContentSection from '@/components/TabbedContentSection';
import Story from '@/components/Story';
import ProfileShowcase from '@/components/ProfileShowcase';
import GalleryPreview from '@/components/GalleryPreview';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <MainLayout>
      <div className="flex flex-col items-center w-full bg-tech-dark text-white">
        {/* Combined Hero + Profile showcase section */}
        <div className="w-full">
          <ProfileShowcase />
        </div>
        
        {/* Story section */}
        <div className="w-full">
          <Story />
        </div>
        
        {/* Gallery Preview section */}
        <div className="w-full">
          <GalleryPreview />
        </div>
        
        {/* Passion section */}
        <div className="w-full">
          <PassionSection />
        </div>
        
        {/* Tabbed content */}
        <div className="w-full py-16 md:py-24 bg-tech-dark/90 border-t border-white/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <TabbedContentSection />
          </div>
        </div>
        
        {/* Interest form */}
        <div className="w-full py-16 md:py-24 bg-tech-dark/80 border-t border-white/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <InterestForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
