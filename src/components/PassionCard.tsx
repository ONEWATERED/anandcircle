
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

type PassionCardProps = {
  title: string;
  description: string;
  cta: string;
  ctaLink: string;
  imageSrc?: string;
  colorAccent: string;
  index: number;
};

const PassionCard = ({
  title,
  description,
  cta,
  ctaLink,
  imageSrc,
  colorAccent,
  index
}: PassionCardProps) => {
  return (
    <div 
      className="glass-card overflow-hidden opacity-0 animate-fade-up" 
      style={{ animationDelay: `${200 + index * 100}ms` }}
    >
      <div className="flex flex-col h-full">
        {/* Optional image area */}
        {imageSrc && (
          <div className="aspect-video w-full overflow-hidden">
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <p className="text-gray-400 text-sm">Passion area image</p>
            </div>
          </div>
        )}
        
        {/* Content area */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Card accent line */}
          <div className={cn('h-1 w-12 rounded-full mb-6', colorAccent)}></div>
          
          <h3 className="text-2xl font-display font-semibold mb-4">{title}</h3>
          
          <p className="text-muted-foreground mb-6 flex-grow">
            {description}
          </p>
          
          <a 
            href={ctaLink} 
            className="group inline-flex items-center font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {cta}
            <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PassionCard;
