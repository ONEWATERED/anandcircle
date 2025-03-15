
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Publication } from '@/types/publications';
import { Image, FileText, Trash, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data - in a real app, this would come from a database
const mockPublications: Publication[] = [
  {
    id: 1,
    title: "Biomarkers for Optimal Health",
    description: "A comprehensive guide to understanding key biomarkers and what they reveal about your health status.",
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    pdfUrl: "#",
    hasVideo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Nutrition & Brain Health",
    description: "Discover the nutrients that support cognitive function and protect against neurodegeneration.",
    thumbnailUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    pdfUrl: "#",
    hasVideo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Sleep Optimization Protocol",
    description: "Evidence-based strategies to improve sleep quality and duration for better health outcomes.",
    thumbnailUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    pdfUrl: "#",
    hasVideo: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    title: "Stress Resilience Techniques",
    description: "Practical approaches to build resilience and manage stress in high-pressure environments.",
    thumbnailUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    pdfUrl: "#",
    hasVideo: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
];

const PublicationsDashboard = () => {
  const [publications, setPublications] = useState<Publication[]>(mockPublications);
  const [newPublication, setNewPublication] = useState<Partial<Publication>>({
    title: '',
    description: '',
    thumbnailUrl: '',
    pdfUrl: '',
    hasVideo: false
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewPublication({
      ...newPublication,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddPublication = () => {
    const publicationToAdd: Publication = {
      id: publications.length + 1,
      title: newPublication.title || 'Untitled Publication',
      description: newPublication.description || 'No description provided',
      thumbnailUrl: newPublication.thumbnailUrl || 'https://via.placeholder.com/500',
      pdfUrl: newPublication.pdfUrl || '#',
      hasVideo: newPublication.hasVideo || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setPublications([...publications, publicationToAdd]);
    setNewPublication({
      title: '',
      description: '',
      thumbnailUrl: '',
      pdfUrl: '',
      hasVideo: false
    });
  };

  const handleDeletePublication = (id: number) => {
    setPublications(publications.filter(pub => pub.id !== id));
  };

  // In a real application, these functions would call APIs to handle file uploads
  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Thumbnail upload:', e.target.files?.[0]);
    // Simulate setting a URL after upload
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewPublication({
            ...newPublication,
            thumbnailUrl: URL.createObjectURL(e.target.files![0])
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('PDF upload:', e.target.files?.[0]);
    // Simulate setting a URL after upload
    if (e.target.files && e.target.files[0]) {
      setNewPublication({
        ...newPublication,
        pdfUrl: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Publications Dashboard</h1>
        <Button onClick={() => navigate('/')} variant="outline">Back to Home</Button>
      </div>

      <Tabs defaultValue="manage" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2 mb-8">
          <TabsTrigger value="manage">Manage Publications</TabsTrigger>
          <TabsTrigger value="add">Add New Publication</TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map(publication => (
              <Card key={publication.id} className="overflow-hidden">
                <div className="aspect-video overflow-hidden bg-gray-100">
                  {publication.thumbnailUrl ? (
                    <img 
                      src={publication.thumbnailUrl} 
                      alt={publication.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{publication.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">{publication.description}</p>
                  <div className="flex gap-2 mt-2">
                    {publication.hasVideo && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Has Video
                      </span>
                    )}
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      PDF Available
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDeletePublication(publication.id)}
                  >
                    <Trash className="h-4 w-4 mr-1" /> Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add New Publication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={newPublication.title}
                  onChange={handleInputChange}
                  placeholder="Enter publication title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={newPublication.description}
                  onChange={handleInputChange}
                  placeholder="Enter publication description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail Image</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="thumbnail"
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="flex-1"
                    />
                    {newPublication.thumbnailUrl && (
                      <div className="w-16 h-16 rounded overflow-hidden">
                        <img
                          src={newPublication.thumbnailUrl}
                          alt="Thumbnail preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pdf">PDF Document</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="pdf"
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfUpload}
                      className="flex-1"
                    />
                    {newPublication.pdfUrl && (
                      <FileText className="h-6 w-6 text-blue-500" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hasVideo"
                  name="hasVideo"
                  checked={newPublication.hasVideo}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="hasVideo">Has Video Content</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddPublication} className="ml-auto">
                <Plus className="mr-2 h-4 w-4" /> Add Publication
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PublicationsDashboard;
