
import React, { useState, useEffect } from 'react';
import { ArrowRight, Images } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AIGalleryImage from './ai-gallery/AIGalleryImage';
import { fetchGalleryImages } from '@/services/galleryService';
import { GalleryItem } from './ai-gallery/gallery-data';
import { motion } from 'framer-motion';

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
    <section className="py-16 md:py-24 bg-tech-dark border-t border-[#0EA5E9]/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full bg-[#0EA5E9]/10 text-[#0EA5E9] font-medium border border-[#0EA5E9]/20">
            <Images className="mr-2 h-4 w-4" />
            <span>Visual Resources</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Explore Our <span className="text-gradient-tech">Gallery Collection</span>
          </h2>
          
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover our curated collection of visual resources across categories 
            including water conservation, health data, and productivity frameworks.
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#0EA5E9] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-gray-400">Loading gallery preview...</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {previewImages.map((image, index) => (
              <motion.div 
                key={image.id} 
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AIGalleryImage image={image} />
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/gallery">
            <Button 
              variant="tech" 
              glow="cyan"
              className="text-white hover:text-white"
            >
              View Full Gallery
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryPreview;
