
import React from 'react';
import { ImageIcon } from 'lucide-react';
import { GalleryItem } from '@/components/ai-gallery/gallery-data';
import ImageCard from './ImageCard';

interface GalleryGridProps {
  images: GalleryItem[];
  isLoading: boolean;
  onDeleteImage: (id: string) => Promise<void>;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, isLoading, onDeleteImage }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-pulse">Loading gallery images...</div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
        <ImageIcon size={48} className="text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No images yet</h3>
        <p className="text-muted-foreground">
          Upload your first gallery image to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <ImageCard 
          key={image.id} 
          image={image} 
          onDelete={onDeleteImage} 
        />
      ))}
    </div>
  );
};

export default GalleryGrid;
