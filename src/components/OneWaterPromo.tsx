
import React from 'react';
import { Droplet, HeartHandshake, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OneWaterPromo = () => {
  return (
    <div className="py-5 bg-primary">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <HeartHandshake size={24} className="text-white" />
            <span className="text-base font-medium text-white">
              All proceeds from services are donated to 
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Droplet size={24} className="text-white" />
            <span className="font-bold text-lg text-white">One Water Foundation</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 font-medium"
              onClick={() => window.open('https://www.onewater.foundation', '_blank', 'noopener,noreferrer')}
            >
              <span>Foundation</span>
              <ExternalLink size={14} className="ml-1" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 font-medium"
              onClick={() => window.open('https://www.onewater.ai', '_blank', 'noopener,noreferrer')}
            >
              <span>One Water AI</span>
              <ExternalLink size={14} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneWaterPromo;
