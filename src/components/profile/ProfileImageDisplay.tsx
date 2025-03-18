
import React from 'react';
import { BrainCircuit } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfileImageDisplayProps {
  profileImage: string | null;
  isLoading: boolean;
}

const ProfileImageDisplay = ({ profileImage, isLoading }: ProfileImageDisplayProps) => {
  const [imageError, setImageError] = React.useState(false);
  const defaultImage = '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
  const isMobile = useIsMobile();
  
  // Reset image error if the profile image changes
  React.useEffect(() => {
    if (profileImage) {
      setImageError(false);
    }
  }, [profileImage]);
  
  const handleImageError = () => {
    console.warn("Profile image failed to load:", profileImage);
    setImageError(true);
  };
  
  // If there's an error loading the image or no profile image is provided, use the default image
  const imageToDisplay = imageError || !profileImage ? defaultImage : profileImage;
  
  return (
    <div className="aspect-[3/4] overflow-hidden">
      {isLoading ? (
        <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center animate-pulse">
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      ) : (
        <div className="relative">
          {/* Enhanced blurred background for softer edges - more blur added */}
          <div 
            className="absolute inset-0 -m-10 scale-130 blur-3xl opacity-70"
            style={{ 
              backgroundImage: `url(${imageToDisplay})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          
          {/* Extra gradient overlay for better color blending with page background */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-gray-50 via-transparent to-gray-50 opacity-90"></div>
          
          {/* Animated glow effect behind the main image */}
          <div className="absolute inset-0 rounded-2xl animate-pulse">
            <div className="absolute inset-0 -m-1 rounded-2xl bg-gradient-to-tr from-primary/40 to-accent/40 blur-xl"></div>
            <div className="absolute inset-0 -m-2 rounded-2xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 blur-lg animate-pulse"></div>
            <div className="absolute inset-0 -m-3 rounded-2xl bg-gradient-to-bl from-primary/20 to-accent/20 blur-xl opacity-80"></div>
          </div>
          
          {/* Dynamic particles effect - fewer particles on mobile */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {[...Array(isMobile ? 5 : 8)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary/40 animate-pulse blur-sm"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Main image with enhanced glass effect */}
          <div className="glass-card relative p-1 md:p-2 rounded-2xl shadow-xl overflow-hidden backdrop-blur-md border-2 border-primary/20 animate-[pulse_5s_ease-in-out_infinite]">
            <img 
              src={imageToDisplay} 
              alt="Profile" 
              className="w-full h-full object-cover rounded-xl z-10"
              onError={handleImageError}
            />
            
            {/* Matching purple glow to connect with avatar */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-primary/15 to-accent/15 mix-blend-overlay"></div>
            
            {/* Neural connection indicator with brain circuit icon - smaller on mobile */}
            <div className="absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm 
                          flex items-center justify-center opacity-80 shadow-inner border border-white/30 z-20">
              <BrainCircuit size={isMobile ? 10 : 14} className="text-white" />
            </div>
            
            {/* Neural connection dots - more prominent */}
            <div className="absolute -top-1 -right-1 w-3 h-3 md:w-5 md:h-5 rounded-full bg-primary/50 animate-pulse blur-sm"></div>
            <div className="absolute -top-6 -right-3 md:-top-8 md:-right-4 w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent/40 animate-pulse blur-sm"></div>
            <div className="absolute -top-10 -right-1 md:-top-14 md:-right-2 w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary/60 animate-pulse blur-sm"></div>
            <div className="absolute -top-16 right-0 md:-top-20 md:right-0 w-2 h-2 md:w-3 md:h-3 rounded-full bg-accent/50 animate-pulse blur-sm"></div>
          </div>
          
          {/* Neural network overlay - scaled for mobile */}
          <div className="absolute -top-16 -right-8 md:-top-20 md:-right-10 w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-70">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Neural connection lines - improved visibility */}
              <path 
                d="M50,90 Q55,70 60,50 Q70,30 80,20" 
                fill="none" 
                stroke="url(#neuralGradient)" 
                strokeWidth={isMobile ? "0.6" : "0.8"} 
                strokeDasharray="1,2"
                className="animate-pulse-travel opacity-80"
              />
              <path 
                d="M40,90 Q45,60 55,40 Q65,25 75,15" 
                fill="none" 
                stroke="url(#neuralGradient)" 
                strokeWidth={isMobile ? "0.6" : "0.8"}
                strokeDasharray="1,3"
                className="animate-pulse opacity-70" 
              />
              <path 
                d="M60,90 Q65,75 70,55 Q75,35 80,25" 
                fill="none" 
                stroke="url(#neuralGradient)" 
                strokeWidth={isMobile ? "0.6" : "0.8"}
                strokeDasharray="2,2"
                className="animate-pulse-travel opacity-60" 
              />
              
              {/* Gradient definition - more vibrant colors */}
              <defs>
                <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(139,92,246,0.3)" />
                  <stop offset="50%" stopColor="rgba(139,92,246,0.5)" />
                  <stop offset="100%" stopColor="rgba(139,92,246,0.7)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Neural node effects - adjusted for mobile */}
          {!isMobile && (
            <>
              <div className="absolute top-[-35px] right-[15px] w-2 h-2 rounded-full bg-primary/40 animate-pulse"></div>
              <div className="absolute top-[-25px] right-[25px] w-1.5 h-1.5 rounded-full bg-accent/50 animate-pulse"></div>
              <div className="absolute top-[-15px] right-[10px] w-1 h-1 rounded-full bg-primary/60 animate-pulse"></div>
            </>
          )}
          
          {/* Animated energy flows around the image - simplified on mobile */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-0 w-full h-0.5 md:h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-[pulse-travel_4s_linear_infinite]"></div>
            <div className="absolute bottom-1/3 left-0 w-full h-0.5 md:h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-[pulse-travel_5s_linear_infinite_reverse]"></div>
          </div>
          
          {/* Inner shadow glow in matching colors */}
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_15px_rgba(139,92,246,0.2)] pointer-events-none"></div>
        </div>
      )}
    </div>
  );
};

export default ProfileImageDisplay;
