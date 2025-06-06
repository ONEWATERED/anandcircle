
import React from 'react';
import { Lock } from 'lucide-react';
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
      </div>
    </div>
  );
};

export default PremiumVideosSection;
