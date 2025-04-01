
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { fetchGalleryImages, deleteGalleryImage } from '@/services/galleryService';
import UploadForm from '@/components/admin-gallery/UploadForm';
import EditImageForm from '@/components/admin-gallery/EditImageForm';
import GalleryGrid from '@/components/admin-gallery/GalleryGrid';
import { GalleryItem } from '@/components/ai-gallery/gallery-data';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const AdminGallery = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editingImage, setEditingImage] = useState<GalleryItem | null>(null);
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAdminAuth();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      loadImages();
    }
  }, [authLoading, isAuthenticated]);

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

  const handleEdit = (image: GalleryItem) => {
    setEditingImage(image);
  };

  const handleCloseEdit = () => {
    setEditingImage(null);
  };

  if (authLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center py-12">
          <div className="animate-pulse">Checking authentication...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Gallery Management</h1>
      
      {/* Edit Form - shown only when editing an image */}
      {editingImage && (
        <EditImageForm 
          image={editingImage} 
          onClose={handleCloseEdit} 
          onUpdateSuccess={loadImages} 
        />
      )}

      {/* Upload Form - shown only when not editing */}
      {!editingImage && (
        <UploadForm onUploadSuccess={loadImages} />
      )}
      
      {/* Gallery Images */}
      <h2 className="text-2xl font-semibold mb-4">Gallery Images</h2>
      <GalleryGrid 
        images={images} 
        isLoading={isLoading} 
        onDeleteImage={handleDelete}
        onEditImage={handleEdit}
      />
    </div>
  );
};

export default AdminGallery;
