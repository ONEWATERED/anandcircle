
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      className="neo-glass overflow-hidden opacity-0 animate-fade-up" 
      style={{ animationDelay: `${200 + index * 100}ms` }}
    >
      <div className="flex flex-col h-full">
        <div className="p-6 flex flex-col flex-grow backdrop-blur-sm relative">
          {/* Card accent glow */}
          <div className={cn('h-1 w-16 rounded-full mb-4 glow', colorAccent)}></div>
          
          <h3 className="text-xl font-display font-semibold mb-3 text-gradient-primary">{title}</h3>
          
          <p className="text-gray-700 text-sm">
            {description}
          </p>

          {link && (
            <div className="mt-4">
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
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
