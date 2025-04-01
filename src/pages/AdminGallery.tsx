
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { fetchGalleryImages, deleteGalleryImage } from '@/services/galleryService';
import UploadForm from '@/components/admin-gallery/UploadForm';
import GalleryGrid from '@/components/admin-gallery/GalleryGrid';
import { GalleryItem } from '@/components/ai-gallery/gallery-data';

const AdminGallery = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setIsLoading(true);
    try {
      const galleryImages = await fetchGalleryImages();
      setImages(galleryImages);
    } catch (error) {
      console.error('Failed to load gallery images:', error);
      toast({
        title: 'Error',
        description: 'Failed to load gallery images',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGalleryImage(id);
      toast({
        title: 'Success',
        description: 'Image deleted successfully',
      });
      await loadImages();
    } catch (error) {
      console.error('Failed to delete image:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete image',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Gallery Management</h1>
      
      {/* Upload Form */}
      <UploadForm onUploadSuccess={loadImages} />
      
      {/* Gallery Images */}
      <h2 className="text-2xl font-semibold mb-4">Gallery Images</h2>
      <GalleryGrid 
        images={images} 
        isLoading={isLoading} 
        onDeleteImage={handleDelete} 
      />
    </div>
  );
};

export default AdminGallery;
