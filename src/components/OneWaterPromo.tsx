
import React from 'react';
import { Droplet, HeartHandshake, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OneWaterPromo = () => {
  return (
    <div className="py-4 bg-cyan-50">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <HeartHandshake size={20} className="text-cyan-500" />
            <span className="text-sm font-medium">
              All proceeds from services are donated to 
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Droplet size={20} className="text-cyan-600" />
            <span className="font-semibold">One Water Foundation</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-cyan-500/50 text-cyan-700 hover:bg-cyan-100"
            onClick={() => window.open('https://onewater.foundation', '_blank', 'noopener,noreferrer')}
          >
            <span>Learn More</span>
            <ExternalLink size={14} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OneWaterPromo;
