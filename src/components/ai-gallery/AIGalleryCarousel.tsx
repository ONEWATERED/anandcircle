
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import AIGalleryImage from './AIGalleryImage';
import { imageData } from './gallery-data';

const AIGalleryCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-0 relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {imageData.map((image) => (
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
    </div>
  );
};

export default AIGalleryCarousel;
