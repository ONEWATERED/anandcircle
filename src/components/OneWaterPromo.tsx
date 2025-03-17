
import React from 'react';
import { Droplet, HeartHandshake, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OneWaterPromo = () => {
  return (
    <div className="py-6 bg-cyan-50">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <HeartHandshake size={24} className="text-cyan-600" />
            <span className="text-base font-bold">
              All proceeds from services are donated to 
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Droplet size={24} className="text-cyan-600" />
            <span className="font-bold text-lg">One Water Foundation</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-cyan-500/50 text-cyan-700 hover:bg-cyan-100 font-semibold"
            onClick={() => window.open('https://www.onewater.foundation', '_blank', 'noopener,noreferrer')}
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
