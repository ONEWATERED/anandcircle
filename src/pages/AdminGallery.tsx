
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { uploadGalleryImage, getGalleryImages, deleteGalleryImage } from '@/services/galleryService';

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('water');
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setIsLoading(true);
    try {
      const galleryImages = await getGalleryImages();
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !title || !description || !category) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all fields and select an image',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    try {
      await uploadGalleryImage({
        file: selectedFile,
        title,
        description,
        category,
        icon_name: 'Droplet'
      });
      
      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
      
      // Reset form
      setSelectedFile(null);
      setPreviewUrl('');
      setTitle('');
      setDescription('');
      setCategory('water');
      
      // Reload images
      await loadImages();
    } catch (error) {
      console.error('Failed to upload image:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
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
    <AdminLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Gallery Management</h1>
        
        {/* Upload Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload New Image</CardTitle>
            <CardDescription>Add a new image to your gallery</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Enter image title" 
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="climate">Climate</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Enter image description" 
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="image">Image</Label>
                <div className="mt-1 flex items-center">
                  <label className="block w-full">
                    <span className="sr-only">Choose file</span>
                    <input 
                      id="image"
                      type="file" 
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => document.getElementById('image').click()}
                    >
                      <Upload size={16} />
                      Select Image
                    </Button>
                  </label>
                </div>
              </div>
              
              {previewUrl && (
                <div className="flex items-center justify-center">
                  <div className="relative w-32 h-32 overflow-hidden rounded-md">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleUpload} 
              disabled={isUploading || !selectedFile}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              Upload Image
            </Button>
          </CardFooter>
        </Card>
        
        {/* Gallery Images */}
        <h2 className="text-2xl font-semibold mb-4">Gallery Images</h2>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse">Loading gallery images...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.length > 0 ? (
              images.map((image) => (
                <Card key={image.id} className="overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={image.imagePath} 
                      alt={image.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{image.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {image.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <div className="text-sm font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {image.category}
                    </div>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDelete(image.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <ImageIcon size={48} className="text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No images yet</h3>
                <p className="text-muted-foreground">
                  Upload your first gallery image to get started.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminGallery;
