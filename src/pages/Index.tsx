
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
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
        {/* ProfileShowcase section with full-screen background image */}
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
        
        {/* Tabbed content */}
        <div className="w-full py-16 md:py-24 bg-tech-dark border-t border-[#0EA5E9]/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <TabbedContentSection />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
