
import React from 'react';
import { BrainCircuit } from 'lucide-react';

interface ProfileImageDisplayProps {
  profileImage: string | null;
  isLoading: boolean;
}

const ProfileImageDisplay = ({ profileImage, isLoading }: ProfileImageDisplayProps) => {
  const [imageError, setImageError] = React.useState(false);
  const defaultImage = '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
  
  // Reset image error if the profile image changes
  React.useEffect(() => {
    setImageError(false);
  }, [profileImage]);
  
  const handleImageError = () => {
    console.error("Image failed to load, falling back to default");
    setImageError(true);
  };
  
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
          
          {/* Main image with enhanced glass effect */}
          <div className="glass-card relative p-2 rounded-2xl shadow-xl overflow-hidden backdrop-blur-md border-2 border-primary/20">
            <img 
              src={imageToDisplay} 
              alt="Hardeep Anand" 
              className="w-full h-full object-cover rounded-xl z-10"
              onError={handleImageError}
            />
            
            {/* Matching purple glow to connect with avatar */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-primary/15 to-accent/15 mix-blend-overlay"></div>
            
            {/* Neural connection indicator with brain circuit icon */}
            <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm 
                          flex items-center justify-center opacity-80 shadow-inner border border-white/30 z-20">
              <BrainCircuit size={14} className="text-white" />
            </div>
            
            {/* Neural connection dots */}
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary/40 animate-pulse blur-sm"></div>
            <div className="absolute -top-8 -right-4 w-3 h-3 rounded-full bg-accent/30 animate-pulse blur-sm"></div>
            <div className="absolute -top-14 -right-2 w-2 h-2 rounded-full bg-primary/50 animate-pulse blur-sm"></div>
            <div className="absolute -top-20 right-0 w-2 h-2 rounded-full bg-accent/40 animate-pulse blur-sm"></div>
          </div>
          
          {/* Neural network overlay */}
          <div className="absolute -top-20 -right-10 w-28 h-28 pointer-events-none opacity-60">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Neural connection lines */}
              <path 
                d="M50,90 Q55,70 60,50 Q70,30 80,20" 
                fill="none" 
                stroke="url(#neuralGradient)" 
                strokeWidth="0.5" 
                strokeDasharray="1,2"
                className="opacity-70"
              />
              <path 
                d="M40,90 Q45,60 55,40 Q65,25 75,15" 
                fill="none" 
                stroke="url(#neuralGradient)" 
                strokeWidth="0.5"
                strokeDasharray="1,3"
                className="opacity-60" 
              />
              <path 
                d="M60,90 Q65,75 70,55 Q75,35 80,25" 
                fill="none" 
                stroke="url(#neuralGradient)" 
                strokeWidth="0.5"
                strokeDasharray="2,2"
                className="opacity-50" 
              />
              
              {/* Gradient definition */}
              <defs>
                <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(139,92,246,0.1)" />
                  <stop offset="50%" stopColor="rgba(139,92,246,0.3)" />
                  <stop offset="100%" stopColor="rgba(139,92,246,0.6)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Inner shadow glow in matching colors */}
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_15px_rgba(139,92,246,0.2)] pointer-events-none"></div>
        </div>
      )}
    </div>
  );
};

export default ProfileImageDisplay;
