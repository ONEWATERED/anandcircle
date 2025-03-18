
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
        <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      ) : (
        <div className="relative">
          {/* Simplified blurred background - reduced animation */}
          <div 
            className="absolute inset-0 -m-10 scale-130 blur-3xl opacity-70"
            style={{ 
              backgroundImage: `url(${imageToDisplay})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          
          {/* Gradient overlay for better color blending with page background */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-gray-50 via-transparent to-gray-50 opacity-90"></div>
          
          {/* Reduced glow effect - removed animation */}
          <div className="absolute inset-0 rounded-2xl">
            <div className="absolute inset-0 -m-1 rounded-2xl bg-gradient-to-tr from-primary/40 to-accent/40 blur-xl"></div>
          </div>
          
          {/* Removed dynamic particles effect */}
          
          {/* Main image with simplified glass effect - removed animation */}
          <div className="glass-card relative p-1 md:p-2 rounded-2xl shadow-xl overflow-hidden backdrop-blur-md border-2 border-primary/20">
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
            
            {/* Simplified neural connection dots - reduced number and removed animation */}
            <div className="absolute -top-1 -right-1 w-3 h-3 md:w-5 md:h-5 rounded-full bg-primary/50 blur-sm"></div>
          </div>
          
          {/* Simplified neural network overlay - removed animations */}
          <div className="absolute -top-16 -right-8 md:-top-20 md:-right-10 w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-50">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Simplified neural connection lines */}
              <path 
                d="M50,90 Q55,70 60,50 Q70,30 80,20" 
                fill="none" 
                stroke="url(#neuralGradient)" 
                strokeWidth={isMobile ? "0.6" : "0.8"} 
                strokeDasharray="1,2"
                className="opacity-80"
              />
              
              {/* Gradient definition */}
              <defs>
                <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(139,92,246,0.3)" />
                  <stop offset="100%" stopColor="rgba(139,92,246,0.7)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Removed inner shadow glow */}
        </div>
      )}
    </div>
  );
};

export default ProfileImageDisplay;
