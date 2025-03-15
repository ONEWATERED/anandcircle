
import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import PublicationCard from './PublicationCard';
import { Publication } from '@/types/publications';

interface PublicationsCarouselProps {
  publications: Publication[];
}

const PublicationsCarousel = ({ publications }: PublicationsCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  return (
    <div className="max-w-5xl mx-auto relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {publications.map((resource) => (
            <PublicationCard key={resource.id} publication={resource} />
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
      
      <div className="text-center mt-8">
        <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white">
          View All Resources
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PublicationsCarousel;
