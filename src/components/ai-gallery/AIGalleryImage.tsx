
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface AIGalleryImageProps {
  image: {
    id: number;
    title: string;
    description: string;
    category: string;
    url: string;
    icon: LucideIcon;
  };
}

const AIGalleryImage = ({ image }: AIGalleryImageProps) => {
  const Icon = image.icon;
  const isMobile = useIsMobile();
  
  return (
    <div className="flex-[0_0_85%] sm:flex-[0_0_80%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-4">
      <Card className="neo-glass overflow-hidden border-0 transition-all duration-300 hover:shadow-xl h-full">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={image.url} 
            alt={image.title}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/60 text-white text-xs font-medium flex items-center">
            <Icon className="h-3 w-3 md:h-4 md:w-4" />
            <span className="ml-1 text-2xs md:text-xs">{image.category}</span>
          </div>
        </div>
        <CardHeader className="pb-1 md:pb-2 pt-2 md:pt-3">
          <CardTitle className="text-sm md:text-lg">{image.title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-2 md:pb-4">
          <CardDescription className="text-2xs md:text-sm line-clamp-2">
            {image.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between pt-0 pb-2 md:pb-3">
          <Button variant="outline" size={isMobile ? "sm" : "default"} className="text-2xs md:text-xs h-7 md:h-9">
            <Download className="mr-1 h-2.5 w-2.5 md:h-3 md:w-3" />
            Preview
          </Button>
          <Button variant="outline" size={isMobile ? "sm" : "default"} className="text-2xs md:text-xs h-7 md:h-9">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AIGalleryImage;
