
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { familyMembers } from '@/data/familyData';
import { 
  Image as ImageIcon, 
  Upload, 
  RefreshCw, 
  CheckCircle,
  X
} from 'lucide-react';
import { getConnectionImage, saveConnectionImage } from '@/utils/connectionImages';
import { uploadImageToStorage } from '@/utils/fileUtils';
import { useToast } from '@/hooks/use-toast';

interface ImageItem {
  personId: string;
  personName: string;
  imageUrl: string | null;
  role: string;
  status: 'idle' | 'loading' | 'success' | 'error';
}

export default function AdminImages() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagePromises = familyMembers.map(async (member) => {
          const imageUrl = await getConnectionImage(member.id);
          return {
            personId: member.id,
            personName: member.name,
            role: member.role,
            imageUrl,
            status: 'idle' as const
          };
        });
        
        const results = await Promise.all(imagePromises);
        setImages(results);
      } catch (error) {
        console.error("Error fetching images:", error);
        toast({
          title: "Error loading images",
          description: "Could not load connection images",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchImages();
  }, [toast]);
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, personId: string) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      // Update status to loading
      setImages(prevImages => 
        prevImages.map(img => 
          img.personId === personId 
            ? { ...img, status: 'loading' } 
            : img
        )
      );
      
      // Upload image to storage
      const imageUrl = await uploadImageToStorage(file, personId);
      
      if (!imageUrl) {
        throw new Error("Failed to upload image");
      }
      
      // Save connection image
      await saveConnectionImage(personId, imageUrl);
      
      // Update state with new image URL
      setImages(prevImages => 
        prevImages.map(img => 
          img.personId === personId 
            ? { ...img, imageUrl, status: 'success' } 
            : img
        )
      );
      
      toast({
        title: "Image uploaded",
        description: "Image successfully uploaded and saved",
      });
      
      // Reset status after a delay
      setTimeout(() => {
        setImages(prevImages => 
          prevImages.map(img => 
            img.personId === personId 
              ? { ...img, status: 'idle' } 
              : img
          )
        );
      }, 3000);
    } catch (error) {
      console.error("Error uploading image:", error);
      
      setImages(prevImages => 
        prevImages.map(img => 
          img.personId === personId 
            ? { ...img, status: 'error' } 
            : img
        )
      );
      
      toast({
        title: "Upload failed",
        description: "Could not upload image. Please try again.",
        variant: "destructive"
      });
      
      // Reset status after a delay
      setTimeout(() => {
        setImages(prevImages => 
          prevImages.map(img => 
            img.personId === personId 
              ? { ...img, status: 'idle' } 
              : img
          )
        );
      }, 3000);
    }
  };
  
  const handleUrlUpdate = async (personId: string, url: string) => {
    if (!url) return;
    
    try {
      // Update status to loading
      setImages(prevImages => 
        prevImages.map(img => 
          img.personId === personId 
            ? { ...img, status: 'loading' } 
            : img
        )
      );
      
      // Save connection image directly with URL
      await saveConnectionImage(personId, url);
      
      // Update state with new image URL
      setImages(prevImages => 
        prevImages.map(img => 
          img.personId === personId 
            ? { ...img, imageUrl: url, status: 'success' } 
            : img
        )
      );
      
      toast({
        title: "Image updated",
        description: "Image URL successfully saved",
      });
      
      // Reset status after a delay
      setTimeout(() => {
        setImages(prevImages => 
          prevImages.map(img => 
            img.personId === personId 
              ? { ...img, status: 'idle' } 
              : img
          )
        );
      }, 3000);
    } catch (error) {
      console.error("Error saving image URL:", error);
      
      setImages(prevImages => 
        prevImages.map(img => 
          img.personId === personId 
            ? { ...img, status: 'error' } 
            : img
        )
      );
      
      toast({
        title: "Update failed",
        description: "Could not update image URL. Please try again.",
        variant: "destructive"
      });
      
      // Reset status after a delay
      setTimeout(() => {
        setImages(prevImages => 
          prevImages.map(img => 
            img.personId === personId 
              ? { ...img, status: 'idle' } 
              : img
          )
        );
      }, 3000);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Manage Images</h1>
        <p className="text-gray-500">Upload and manage images for family members</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          <span className="ml-3">Loading images...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card key={image.personId} className="overflow-hidden">
              <div 
                className="h-48 bg-slate-100 flex items-center justify-center relative"
                style={{ 
                  backgroundImage: image.imageUrl ? `url(${image.imageUrl})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {!image.imageUrl && (
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <ImageIcon size={48} />
                    <span className="mt-2">No image</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs">
                  {image.role}
                </div>
              </div>
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{image.personName}</h3>
                  {image.status === 'loading' && <RefreshCw className="animate-spin h-4 w-4 text-blue-500" />}
                  {image.status === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {image.status === 'error' && <X className="h-4 w-4 text-red-500" />}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`image-url-${image.personId}`}>Image URL</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id={`image-url-${image.personId}`}
                      defaultValue={image.imageUrl || ''}
                      placeholder="Enter image URL"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={(e) => {
                        const input = document.getElementById(`image-url-${image.personId}`) as HTMLInputElement;
                        handleUrlUpdate(image.personId, input.value);
                      }}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`file-upload-${image.personId}`}>Upload Image</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id={`file-upload-${image.personId}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, image.personId)}
                    />
                    <Button 
                      variant="secondary" 
                      className="w-full"
                      onClick={() => {
                        const input = document.getElementById(`file-upload-${image.personId}`);
                        input?.click();
                      }}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Image
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
