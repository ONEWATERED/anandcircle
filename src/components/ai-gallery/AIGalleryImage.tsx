
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface AIGalleryImageProps {
  image: {
    id: number;
    title: string;
    description: string;
    category: string;
    url: string;
    icon: React.ReactNode;
  };
}

const AIGalleryImage = ({ image }: AIGalleryImageProps) => {
  return (
    <div className="flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-4">
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
  );
};

export default AIGalleryImage;
