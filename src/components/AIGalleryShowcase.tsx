
import React, { useState } from 'react';
import { 
  ExternalLink, 
  Download, 
  ImagePlus, 
  ChevronLeft, 
  ChevronRight, 
  Waves, 
  CloudRain, 
  FileDigit, 
  Droplets 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const images = [
  {
    id: 1,
    title: 'Coastal Flooding Simulation',
    description: 'High-resolution visualization of coastal flooding impact on urban infrastructure',
    category: 'Climate Change',
    url: '/placeholder.svg',
    icon: <CloudRain className="h-4 w-4" />
  },
  {
    id: 2,
    title: 'Water Data Visualization',
    description: 'Abstract representation of water quality data from IoT sensors',
    category: 'Data Sensors',
    url: '/placeholder.svg',
    icon: <FileDigit className="h-4 w-4" />
  },
  {
    id: 3,
    title: 'Ocean Current Patterns',
    description: 'Detailed visualization of changing ocean current patterns due to climate change',
    category: 'Climate Change',
    url: '/placeholder.svg',
    icon: <Waves className="h-4 w-4" />
  },
  {
    id: 4,
    title: 'Rainfall Distribution Model',
    description: 'AI-generated rainfall distribution model showing changing patterns over decades',
    category: 'Climate Data',
    url: '/placeholder.svg',
    icon: <Droplets className="h-4 w-4" />
  },
  {
    id: 5,
    title: 'Glacier Retreat Timeline',
    description: 'Visual timeline showing the accelerated retreat of key global glaciers',
    category: 'Climate Change',
    url: '/placeholder.svg',
    icon: <CloudRain className="h-4 w-4" />
  },
];

const AIGalleryShowcase = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteract: true })]
  );

  return (
    <section id="ai-gallery" className="py-20 md:py-32 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/50 to-transparent -z-10"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl -z-10"></div>
      <div className="absolute top-1/3 -left-20 w-64 h-64 rounded-full bg-purple-100/30 blur-3xl -z-10"></div>
      
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-3 rounded-full bg-primary/10 text-primary font-medium">
            <ImagePlus className="mr-2 h-4 w-4" />
            <span>AI-Generated Artwork</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Exclusive <span className="text-gradient-primary">Digital Art Collection</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our premium collection of AI-generated artwork focused on water conservation, 
            climate change, and environmental data visualization. These high-resolution 4K images 
            are available exclusively through our Circle community.
          </p>
        </div>

        {/* Auto-scrolling image gallery */}
        <div className="max-w-5xl mx-auto px-4 md:px-0 relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {images.map((image) => (
                <div key={image.id} className="flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-4">
                  <Card className="neo-glass overflow-hidden border-0 transition-all duration-300 hover:shadow-xl h-full">
                    <div className="relative aspect-square overflow-hidden">
                      <img 
                        src={image.url} 
                        alt={image.title}
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 text-white text-xs font-medium flex items-center">
                        {image.icon}
                        <span className="ml-1">{image.category}</span>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{image.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <CardDescription className="text-sm">{image.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Download className="mr-1 h-3 w-3" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mt-4">
            <Button 
              size="icon" 
              variant="outline" 
              className="rounded-full h-8 w-8"
              onClick={() => emblaApi?.scrollPrev()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="outline" 
              className="rounded-full h-8 w-8"
              onClick={() => emblaApi?.scrollNext()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="p-8 rounded-3xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0 md:mr-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Access the Full <span className="text-gradient-primary">Digital Collection</span>
                </h3>
                <p className="text-muted-foreground mb-6">
                  Join our Circle community to download the full collection of high-resolution AI-generated 
                  artworks. Perfect for presentations, research papers, or premium wall art for your home or office.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="mr-3 rounded-full p-1 bg-primary/20 text-primary">
                      <Download className="h-4 w-4" />
                    </div>
                    <span className="text-sm">Download over 50+ high-resolution 4K images</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 rounded-full p-1 bg-primary/20 text-primary">
                      <ImagePlus className="h-4 w-4" />
                    </div>
                    <span className="text-sm">Request custom AI-generated water and climate visualizations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 rounded-full p-1 bg-primary/20 text-primary">
                      <ExternalLink className="h-4 w-4" />
                    </div>
                    <span className="text-sm">Commercial usage rights for Circle community members</span>
                  </li>
                </ul>
                
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white">
                  Join Circle Community
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="md:w-1/3">
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden border-2 border-white/70 shadow-xl">
                    <img 
                      src="/placeholder.svg" 
                      alt="Premium AI Art Collection" 
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-xl -z-10"></div>
                  <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-gradient-to-r from-accent/30 to-primary/30 rounded-full blur-xl -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIGalleryShowcase;
