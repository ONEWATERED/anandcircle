
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
      className="neo-glass overflow-hidden opacity-0 animate-fade-up neon-border" 
      style={{ animationDelay: `${200 + index * 100}ms` }}
    >
      <div className="flex flex-col h-full">
        {/* Optional image area with futuristic gradient overlay */}
        {imageSrc && (
          <div className="aspect-video w-full overflow-hidden relative">
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
              <p className="text-gray-400 text-sm">Passion area image</p>
            </div>
            {/* Overlay gradient for futuristic look */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60"></div>
            {/* Digital mesh overlay */}
            <div className="absolute inset-0 opacity-10"
              style={{ 
                backgroundImage: 'radial-gradient(circle at 15px 15px, rgba(255, 255, 255, 0.8) 1px, transparent 0)', 
                backgroundSize: '30px 30px' 
              }}>
            </div>
          </div>
        )}
        
        {/* Content area with glass effect */}
        <div className="p-8 flex flex-col flex-grow backdrop-blur-sm relative">
          {/* Card accent glow */}
          <div className={cn('h-1 w-16 rounded-full mb-6 glow', colorAccent)}></div>
          
          <h3 className="text-2xl font-display font-semibold mb-4 text-gradient-primary">{title}</h3>
          
          <p className="text-gray-700 mb-8 flex-grow">
            {description}
          </p>
          
          <a 
            href={ctaLink} 
            className="group inline-flex items-center font-medium text-primary hover:text-primary/90 transition-colors"
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
