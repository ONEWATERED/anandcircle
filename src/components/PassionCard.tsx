
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
  link?: string;
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
      className="tech-gradient-border angular-glass overflow-hidden shadow-lg hover-float opacity-0 animate-fade-up transition-all duration-300" 
      style={{ animationDelay: `${200 + index * 100}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex flex-col h-full">
        <div className="p-6 flex flex-col flex-grow relative">
          {/* Scanning line effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-scanning-line"></div>
          </div>
          
          {/* Data point accent */}
          <div className={cn('h-1 w-12 rounded-full mb-4', colorAccent)}></div>
          
          <h3 className="text-lg font-medium mb-3 text-foreground">{title}</h3>
          
          <p className="text-muted-foreground text-sm">
            {description}
          </p>

          {link && (
            <div className="mt-4">
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
              >
                Learn more <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          )}
          
          {/* Tech corner accents */}
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/30"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/30"></div>
          
          {/* Data point */}
          <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft"></div>
        </div>
      </div>
    </div>
  );
};

export default PassionCard;
