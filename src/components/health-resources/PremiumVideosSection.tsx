
import React from 'react';
import { Lock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PremiumVideosSection = () => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      <div className="max-w-md text-center p-8 glass-card rounded-xl">
        <Lock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-2xl font-display font-semibold mb-4">Premium Video Content</h3>
        <p className="text-muted-foreground mb-6">
          I've created in-depth videos, workshops, and expert interviews on health topics that I'm excited to share with our community members.
        </p>
        <Button 
          className="bg-gradient-to-r from-[#0EA5E9] to-[#9333EA] text-white hover:opacity-90 transition-all duration-300 shadow-sm"
          onClick={() => window.open('https://www.circleso.com', '_blank', 'noopener,noreferrer')}
        >
          <Users className="mr-2 h-4 w-4" />
          Join One Water Circle for Free
        </Button>
      </div>
    </div>
  );
};

export default PremiumVideosSection;
