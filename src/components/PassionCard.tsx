
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

type PassionCardProps = {
  title: string;
  description: string;
  cta?: string;
  ctaLink?: string;
  imageSrc?: string;
  colorAccent: string;
  index: number;
  link?: string; // Added link prop
};

const PassionCard = ({
  title,
  description,
  colorAccent,
  index,
  link
}: PassionCardProps) => {
  return (
    <div 
      className="bg-white border border-gray-200/50 rounded-lg overflow-hidden shadow-sm hover-shadow opacity-0 animate-fade-up" 
      style={{ animationDelay: `${200 + index * 100}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex flex-col h-full">
        <div className="p-6 flex flex-col flex-grow relative">
          {/* Card accent line */}
          <div className={cn('h-1 w-16 rounded-full mb-4', colorAccent)}></div>
          
          <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
          
          <p className="text-muted-foreground text-sm">
            {description}
          </p>

          {link && (
            <div className="mt-4">
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PassionCard;
