
// This file is being kept but not used anymore
import React from 'react';
import { Download, ImagePlus, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AIGalleryCTA = () => {
  return (
    <div className="mt-16 max-w-4xl mx-auto">
      <div className="p-8 rounded-3xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-8 md:mb-0 md:mr-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Access the Full <span className="text-gradient-primary">Digital Collection</span>
            </h3>
            <p className="text-muted-foreground mb-6">
              Join our Circle community to download the full collection of high-resolution AI-generated 
              artworks. Perfect for presentations, research papers, or premium wall art for your home or office.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <div className="mr-3 rounded-full p-1 bg-primary/20 text-primary">
                  <Download className="h-4 w-4" />
                </div>
                <span className="text-sm">Download over 50+ high-resolution 4K images</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 rounded-full p-1 bg-primary/20 text-primary">
                  <ImagePlus className="h-4 w-4" />
                </div>
                <span className="text-sm">Request custom AI-generated water and climate visualizations</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 rounded-full p-1 bg-primary/20 text-primary">
                  <ExternalLink className="h-4 w-4" />
                </div>
                <span className="text-sm">Commercial usage rights for Circle community members</span>
              </li>
            </ul>
            
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white">
              Join Circle Community
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="md:w-1/3">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border-2 border-white/70 shadow-xl">
                <img 
                  src="/placeholder.svg" 
                  alt="Premium AI Art Collection" 
                  className="w-full aspect-square object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-xl -z-10"></div>
              <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-gradient-to-r from-accent/30 to-primary/30 rounded-full blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGalleryCTA;
