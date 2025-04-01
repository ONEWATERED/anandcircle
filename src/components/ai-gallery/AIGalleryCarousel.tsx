
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import AIGalleryImage from './AIGalleryImage';
import { galleryCategories } from './gallery-data';
import GalleryCategoryFilter from './GalleryCategoryFilter';
import { fetchGalleryImages } from '@/services/galleryService';
import { useToast } from '@/components/ui/use-toast';

const AIGalleryCarousel = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredImages, setFilteredImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Reset the carousel when category changes
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );
  
  // Fetch images when category changes
  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      try {
        const images = await fetchGalleryImages(activeCategory === 'all' ? undefined : activeCategory);
        setFilteredImages(images);
        
        // Reset carousel position when filter changes
        if (emblaApi) {
          emblaApi.scrollTo(0);
        }
      } catch (error) {
        console.error("Error loading gallery images:", error);
        toast({
          title: "Error loading gallery",
          description: "Failed to load gallery images. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadImages();
  }, [activeCategory, emblaApi, toast]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-0 relative">
      <GalleryCategoryFilter 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange} 
      />
      
      {isLoading ? (
        <div className="py-16 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-muted-foreground">Loading gallery images...</p>
        </div>
      ) : filteredImages.length > 0 ? (
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
