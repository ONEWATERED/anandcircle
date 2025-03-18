
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import ResumeButton from './ResumeButton';
import ProfileImageDisplay from './profile/ProfileImageDisplay';
import { supabase } from '@/integrations/supabase/client';

const Hero = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfileImage = async () => {
      setIsLoading(true);
      try {
        // Try to get from Supabase
        const { data, error } = await supabase
          .from('personal_profile')
          .select('photo_url')
          .eq('id', 'hardeep')
          .single();
          
        if (!error && data?.photo_url) {
          setProfileImage(data.photo_url);
        } else {
          // Fallback to localStorage
          const cachedImage = localStorage.getItem('profileImageUrl');
          if (cachedImage) {
            setProfileImage(cachedImage);
          } else {
            // Default fallback image
            setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
          }
        }
      } catch (error) {
        console.error("Error loading profile image:", error);
        // Use default image as fallback
        setProfileImage('/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileImage();
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
    >
      {/* Gradient background instead of plain */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 -top-64 -right-64"></div>
        <div className="absolute w-[300px] h-[300px] rounded-full bg-primary/10 bottom-20 -left-32"></div>
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent top-1/3"></div>
      </div>
      
      <div className="section-container z-10 max-w-6xl mx-auto py-8 px-4 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Content Column */}
          <div className="md:col-span-7 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              Innovating at the Intersection
            </h1>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
              Tech • Health • Community
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl md:mx-0 mx-auto">
              Executive. Innovator. Mentor. Bringing data-driven solutions to public service, health challenges, and community needs.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
              <a 
                href="#story" 
                className="inline-flex items-center justify-center h-12 px-6 font-medium text-white transition-colors rounded-lg bg-primary hover:bg-primary/90"
              >
                Discover My Story
              </a>
              <a 
                href="#passions" 
                className="inline-flex items-center justify-center h-12 px-6 font-medium text-primary transition-colors rounded-lg border border-primary hover:bg-primary/10"
              >
                Explore My Work
              </a>
              
              <ResumeButton 
                variant="outline" 
                size="lg"
                className="h-12 px-6 rounded-lg text-primary border-primary"
              />
            </div>
          </div>
          
          {/* Profile Image Column - Futuristic Design */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-64 md:w-80 select-none">
              {/* Animated orbital ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow"></div>
              
              {/* World map backdrop */}
              <div className="absolute inset-4 bg-world-map bg-no-repeat bg-center bg-contain opacity-10"></div>
              
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full filter blur-xl opacity-70 animate-pulse-slow"></div>
              
              {/* Content container */}
              <div className="relative rounded-full overflow-hidden border-2 border-primary/20 shadow-xl">
                <ProfileImageDisplay profileImage={profileImage} isLoading={isLoading} />
                
                {/* Global leader indicators */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full">
                  Global Speaker
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full">
                  Thought Leader
                </div>
              </div>
              
              {/* Connection dots around the image */}
              <div className="absolute top-1/2 -left-2 w-4 h-4 bg-primary/80 rounded-full"></div>
              <div className="absolute top-1/4 -right-2 w-4 h-4 bg-primary/80 rounded-full"></div>
              <div className="absolute bottom-1/4 -right-2 w-4 h-4 bg-primary/80 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Simple scroll indicator moved up */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20">
        <a href="#story" className="flex flex-col items-center text-gray-500 hover:text-gray-800 transition-colors">
          <span className="text-sm font-medium mb-1">Scroll Down</span>
          <ChevronDown size={20} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
