
import React, { useState, useEffect } from 'react';
import { ArrowRight, Images } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AIGalleryImage from './ai-gallery/AIGalleryImage';
import { fetchGalleryImages } from '@/services/galleryService';
import { GalleryItem } from './ai-gallery/gallery-data';

const GalleryPreview = () => {
  const [previewImages, setPreviewImages] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadPreviewImages = async () => {
      try {
        const images = await fetchGalleryImages();
        setPreviewImages(images.slice(0, 3)); // Show only first 3 images
      } catch (error) {
        console.error("Error loading preview images:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPreviewImages();
  }, []);
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full bg-primary/10 text-primary font-medium">
            <Images className="mr-2 h-4 w-4" />
            <span>Visual Resources</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Our <span className="text-gradient-primary">Gallery Collection</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collection of visual resources across categories 
            including water conservation, health data, and productivity frameworks.
          </p>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-muted-foreground">Loading gallery preview...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {previewImages.map((image) => (
              <div key={image.id} className="w-full">
                <AIGalleryImage image={image} />
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center">
          <Link to="/gallery">
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white">
              View Full Gallery
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
