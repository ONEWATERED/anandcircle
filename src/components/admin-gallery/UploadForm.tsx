
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { uploadGalleryImage } from '@/services/galleryService';

interface UploadFormProps {
  onUploadSuccess: () => Promise<void>;
}

const UploadForm: React.FC<UploadFormProps> = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('water');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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
      
      // Refresh gallery
      await onUploadSuccess();
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

  return (
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
                  onClick={() => document.getElementById('image')?.click()}
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
  );
};

export default UploadForm;
