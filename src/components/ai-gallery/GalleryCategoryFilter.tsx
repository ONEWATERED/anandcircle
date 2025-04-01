
import React from 'react';
import { Button } from '@/components/ui/button';
import { galleryCategories } from './gallery-data';

interface GalleryCategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const GalleryCategoryFilter = ({ 
  activeCategory, 
  onCategoryChange 
}: GalleryCategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {galleryCategories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          size="sm"
          className={`rounded-full ${
            activeCategory === category.id 
              ? "bg-primary text-white" 
              : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};

export default GalleryCategoryFilter;
