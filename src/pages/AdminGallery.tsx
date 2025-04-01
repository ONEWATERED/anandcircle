
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { galleryCategories } from '@/components/ai-gallery/gallery-data';
import { Plus, Trash2, Upload, Image, Save } from 'lucide-react';
import { uploadGalleryImage, fetchGalleryImages } from '@/services/galleryService';
import { GalleryItem } from '@/components/ai-gallery/gallery-data';
import { toast } from 'sonner';

interface FormData {
  title: string;
  description: string;
  category: string;
  url: string;
  selectedIcon: string;
}

const AdminGallery = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: 'data',
    url: '',
    selectedIcon: 'Brain'
  });

  // Load gallery images
  useEffect(() => {
    const loadGalleryImages = async () => {
      try {
        const images = await fetchGalleryImages();
        setGalleryImages(images);
      } catch (error) {
        console.error("Error loading gallery images:", error);
        toast.error("Failed to load gallery images");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadGalleryImages();
  }, []);

  // Handle image selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.error("Please select an image to upload");
      return;
    }
    
    if (!formData.title || !formData.description || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Create gallery item
      const newItem: Omit<GalleryItem, 'id' | 'imagePath'> = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        url: formData.url,
        icon: formData.selectedIcon as any, // Will be converted in the service
      };
      
      const success = await uploadGalleryImage(selectedFile, newItem);
      
      if (success) {
        toast.success("Gallery item uploaded successfully!");
        // Reset form
        setFormData({
          title: '',
          description: '',
          category: 'data',
          url: '',
          selectedIcon: 'Brain'
        });
        setSelectedFile(null);
        setImagePreview(null);
        
        // Refresh gallery images
        const images = await fetchGalleryImages();
        setGalleryImages(images);
      }
    } catch (error) {
      console.error("Error uploading gallery item:", error);
      toast.error("Failed to upload gallery item");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Gallery Management</h1>
          <Button variant="default">
            <Plus className="mr-2 h-4 w-4" />
            Add New Item
          </Button>
        </div>
        
        {/* Upload Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add Gallery Item</CardTitle>
            <CardDescription>Upload new images to the gallery</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Title *</label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={formData.title} 
                      onChange={handleInputChange} 
                      placeholder="Enter title" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Description *</label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange} 
                      placeholder="Enter description" 
                      rows={3} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">Category *</label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleSelectChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {galleryCategories.map(category => (
                          category.id !== 'all' && (
                            <SelectItem key={category.id} value={category.id}>
                              {category.label}
                            </SelectItem>
                          )
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="url" className="text-sm font-medium">URL (Optional)</label>
                    <Input 
                      id="url" 
                      name="url" 
                      value={formData.url} 
                      onChange={handleInputChange} 
                      placeholder="Enter URL" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="icon" className="text-sm font-medium">Icon</label>
                    <Select 
                      value={formData.selectedIcon} 
                      onValueChange={(value) => handleSelectChange('selectedIcon', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select icon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Brain">Brain</SelectItem>
                        <SelectItem value="CloudRain">CloudRain</SelectItem>
                        <SelectItem value="FileDigit">FileDigit</SelectItem>
                        <SelectItem value="Waves">Waves</SelectItem>
                        <SelectItem value="Droplets">Droplets</SelectItem>
                        <SelectItem value="HeartPulse">HeartPulse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center h-[300px]">
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover rounded-lg" 
                        />
                        <button 
                          type="button"
                          onClick={() => {
                            setSelectedFile(null);
                            setImagePreview(null);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                          <Image className="h-10 w-10 text-gray-500" />
                        </div>
                        <p className="text-sm text-gray-500 mb-4 text-center">
                          Click to upload or drag and drop
                        </p>
                        <Button type="button" variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Image
                        </Button>
                        <input 
                          id="image-upload" 
                          type="file" 
                          className="hidden" 
                          accept="image/*" 
                          onChange={handleFileChange} 
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Gallery Item
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Gallery Items List */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Existing Gallery Items</h2>
          
          {isLoading ? (
            <div className="flex justify-center my-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Image className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No gallery items</h3>
              <p className="mt-2 text-sm text-gray-500">Get started by creating a new gallery item</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="h-48 relative bg-gray-100">
                    {item.imagePath ? (
                      <img 
                        src={item.imagePath} 
                        alt={item.title} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="h-16 w-16 flex items-center justify-center bg-gray-200 rounded-full">
                          {React.createElement(item.icon, { className: "h-8 w-8 text-gray-500" })}
                        </div>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {item.category}
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminGallery;
