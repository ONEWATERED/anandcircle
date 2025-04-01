
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { GalleryItem } from '@/components/ai-gallery/gallery-data';

interface ImageCardProps {
  image: GalleryItem;
  onDelete: (id: string) => Promise<void>;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onDelete }) => {
  return (
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
          onClick={() => onDelete(image.id.toString())}
        >
          <Trash2 size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImageCard;
