
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import AIGalleryHeader from '@/components/ai-gallery/AIGalleryHeader';
import AIGalleryCarousel from '@/components/ai-gallery/AIGalleryCarousel';
import OneWaterPromo from '@/components/OneWaterPromo';

const Gallery = () => {
  return (
    <MainLayout>
      <section id="gallery" className="py-20 md:py-32 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/50 to-transparent -z-10"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl -z-10"></div>
        <div className="absolute top-1/3 -left-20 w-64 h-64 rounded-full bg-purple-100/30 blur-3xl -z-10"></div>
        
        <div className="section-container">
          <AIGalleryHeader />
          <AIGalleryCarousel />
        </div>
      </section>

      <OneWaterPromo />
    </MainLayout>
  );
};

export default Gallery;
