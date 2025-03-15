
import React from 'react';
import { Lock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PremiumVideosSection = () => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      <div className="max-w-md text-center p-8 glass-card rounded-xl">
        <Lock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-2xl font-display font-semibold mb-4">Premium Video Content</h3>
        <p className="text-muted-foreground mb-6">
          Get access to in-depth video content, workshops, and expert interviews on advanced health topics when you join the ANAND Circle.
        </p>
        <Link to="#anand-circle">
          <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8">
            <Users className="mr-2 h-4 w-4" />
            Join the Community
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PremiumVideosSection;
