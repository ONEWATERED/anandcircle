
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import AIGalleryImage from './AIGalleryImage';
import { imageData } from './gallery-data';
import GalleryCategoryFilter from './GalleryCategoryFilter';

const AIGalleryCarousel = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredImages, setFilteredImages] = useState(imageData);
  
  // Reset the carousel when category changes
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );
  
  // Filter images when category changes
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredImages(imageData);
    } else {
      setFilteredImages(imageData.filter(image => image.category === activeCategory));
    }
    
    // Reset carousel position when filter changes
    if (emblaApi) {
      emblaApi.scrollTo(0);
    }
  }, [activeCategory, emblaApi]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-0 relative">
      <GalleryCategoryFilter 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange} 
      />
      
      {filteredImages.length > 0 ? (
        <>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {filteredImages.map((image) => (
                <AIGalleryImage key={image.id} image={image} />
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mt-4">
            <Button 
              size="icon" 
              variant="outline" 
              className="rounded-full h-8 w-8"
              onClick={() => emblaApi?.scrollPrev()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="outline" 
              className="rounded-full h-8 w-8"
              onClick={() => emblaApi?.scrollNext()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">No images found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default AIGalleryCarousel;
