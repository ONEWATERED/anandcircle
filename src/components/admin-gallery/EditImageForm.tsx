
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Upload, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { GalleryItem } from '@/components/ai-gallery/gallery-data';
import { updateGalleryImage } from '@/services/galleryService';

interface EditImageFormProps {
  image: GalleryItem | null;
  onClose: () => void;
  onUpdateSuccess: () => Promise<void>;
}

const EditImageForm: React.FC<EditImageFormProps> = ({ image, onClose, onUpdateSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (image) {
      setTitle(image.title);
      setDescription(image.description);
      setCategory(image.category);
      setPreviewUrl(image.imagePath || '');
    }
  }, [image]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    if (!image || !title || !description || !category) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setIsUpdating(true);
    try {
      await updateGalleryImage({
        id: image.id.toString(),
        file: selectedFile,
        title,
        description,
        category,
        icon_name: 'Droplet'
      });
      
      toast({
        title: 'Success',
        description: 'Image updated successfully',
      });
      
      // Refresh gallery
      await onUpdateSuccess();
      
      // Close the edit form
      onClose();
    } catch (error) {
      console.error('Failed to update image:', error);
      toast({
        title: 'Error',
        description: 'Failed to update image',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (!image) return null;

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Edit Image</CardTitle>
            <CardDescription>Update the existing gallery image</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="edit-title">Title</Label>
            <Input 
              id="edit-title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter image title" 
            />
          </div>
          
          <div>
            <Label htmlFor="edit-category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="edit-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="water">Water</SelectItem>
                <SelectItem value="climate">Climate</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="data">Data</SelectItem>
                <SelectItem value="productivity">Productivity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="edit-description">Description</Label>
          <Textarea 
            id="edit-description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Enter image description" 
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="edit-image">New Image (Optional)</Label>
            <div className="mt-1 flex items-center">
              <label className="block w-full">
                <span className="sr-only">Choose file</span>
                <input 
                  id="edit-image"
                  type="file" 
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => document.getElementById('edit-image')?.click()}
                >
                  <Upload size={16} />
                  Change Image
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
          onClick={handleUpdate} 
          disabled={isUpdating}
          className="flex items-center gap-2"
        >
          <Save size={16} />
          Update Image
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditImageForm;
