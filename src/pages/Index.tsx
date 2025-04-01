
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import Story from '@/components/Story';
import ProfileShowcase from '@/components/ProfileShowcase';
import GalleryPreview from '@/components/GalleryPreview';
import DigitalCloneConnect from '@/components/DigitalCloneConnect';
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
        
        {/* Digital Twin section */}
        <div className="w-full">
          <DigitalCloneConnect />
        </div>
        
        {/* Gallery Preview section */}
        <div className="w-full">
          <GalleryPreview />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
