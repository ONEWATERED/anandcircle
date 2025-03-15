
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Lock, Play, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Sample health resources data
const healthResources = [
  {
    id: 1,
    title: "Biomarkers for Optimal Health",
    description: "A comprehensive guide to understanding key biomarkers and what they reveal about your health status.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    pdfUrl: "#",
    hasVideo: true
  },
  {
    id: 2,
    title: "Nutrition & Brain Health",
    description: "Discover the nutrients that support cognitive function and protect against neurodegeneration.",
    imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    pdfUrl: "#",
    hasVideo: true
  },
  {
    id: 3,
    title: "Sleep Optimization Protocol",
    description: "Evidence-based strategies to improve sleep quality and duration for better health outcomes.",
    imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    pdfUrl: "#",
    hasVideo: true
  },
  {
    id: 4,
    title: "Stress Resilience Techniques",
    description: "Practical approaches to build resilience and manage stress in high-pressure environments.",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    pdfUrl: "#",
    hasVideo: false
  },
];

const HealthResources = () => {
  const [activeResource, setActiveResource] = useState<any>(null);
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase mb-3">Health Resources</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">Innovative Health Insights</h3>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            Access my evidence-based research and publications on optimizing health, wellness, and performance.
          </p>
        </div>

        <Tabs defaultValue="publications" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2 mx-auto mb-12">
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="videos">Premium Videos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="publications" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {healthResources.map((resource) => (
                <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={resource.imageUrl} 
                      alt={resource.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <CardDescription>{resource.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      <a href={resource.pdfUrl} download>Download PDF</a>
                    </Button>
                    
                    {resource.hasVideo && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Play className="mr-2 h-4 w-4" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Video Content Available</DialogTitle>
                            <DialogDescription>
                              Full video content is available exclusively for HARDEEP ANAND Circle members.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex items-center justify-center p-6 border rounded-md bg-muted/20">
                            <div className="flex flex-col items-center gap-2">
                              <Lock className="h-12 w-12 text-muted-foreground" />
                              <p className="text-center text-sm text-muted-foreground">
                                Join the HARDEEP ANAND Circle to access premium video content, workshops, and exclusive resources.
                              </p>
                            </div>
                          </div>
                          <DialogFooter className="sm:justify-center">
                            <Link to="#anand-circle">
                              <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white">
                                <Users className="mr-2 h-4 w-4" />
                                Join the Community
                              </Button>
                            </Link>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="min-h-[400px] flex flex-col items-center justify-center">
            <div className="max-w-md text-center p-8 glass-card rounded-xl">
              <Lock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-2xl font-display font-semibold mb-4">Premium Video Content</h3>
              <p className="text-muted-foreground mb-6">
                Get access to in-depth video content, workshops, and expert interviews on advanced health topics when you join the HARDEEP ANAND Circle.
              </p>
              <Link to="#anand-circle">
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8">
                  <Users className="mr-2 h-4 w-4" />
                  Join the Community
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default HealthResources;
