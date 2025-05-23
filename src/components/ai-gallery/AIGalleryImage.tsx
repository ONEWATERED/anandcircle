
import React from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { GalleryItem } from './gallery-data';
import { useIsMobile } from '@/hooks/use-mobile';

interface AIGalleryImageProps {
  image: GalleryItem;
}

const AIGalleryImage = ({ image }: AIGalleryImageProps) => {
  const Icon = image.icon;
  const isMobile = useIsMobile();
  
  return (
    <div className="flex-[0_0_85%] sm:flex-[0_0_80%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-4">
      <Card className="glass-card overflow-hidden border-0 transition-all duration-300 hover:shadow-xl h-full">
        <div className="relative aspect-square overflow-hidden bg-slate-100 flex items-center justify-center">
          {image.imagePath ? (
            <img 
              src={image.imagePath} 
              alt={image.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon className="h-12 w-12 text-slate-400" />
          )}
          <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-gradient-to-r from-brand-blue/80 to-brand-purple/80 backdrop-blur-md text-white text-xs font-medium flex items-center">
            <Icon className="h-3 w-3 md:h-4 md:w-4" />
            <span className="ml-1 text-2xs md:text-xs">{image.category}</span>
          </div>
        </div>
        <CardHeader className="pb-1 md:pb-2 pt-2 md:pt-3">
          <CardTitle className="text-sm md:text-lg text-gradient-primary">{image.title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-2 md:pb-4">
          <CardDescription className="text-2xs md:text-sm line-clamp-2">
            {image.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between pt-0 pb-2 md:pb-3">
          <Button 
            variant="outline" 
            size={isMobile ? "sm" : "default"} 
            className="text-2xs md:text-xs h-7 md:h-9 glass-button text-brand-cyan hover:text-white hover:shadow-brand-cyan/30"
          >
            <Download className="mr-1 h-2.5 w-2.5 md:h-3 md:w-3" />
            Preview
          </Button>
          {image.url ? (
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"} 
              className="text-2xs md:text-xs h-7 md:h-9 glass-button text-brand-purple hover:text-white hover:shadow-brand-purple/30"
              onClick={() => window.open(image.url, '_blank', 'noopener,noreferrer')}
            >
              <span>Visit</span>
              <ExternalLink className="ml-1 h-2.5 w-2.5 md:h-3 md:w-3" />
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"} 
              className="text-2xs md:text-xs h-7 md:h-9 glass-button text-brand-purple hover:text-white hover:shadow-brand-purple/30"
            >
              View Details
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AIGalleryImage;
