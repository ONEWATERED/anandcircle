
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
          {/* Static background */}
          <div 
            className="absolute inset-0 -m-10 opacity-70"
            style={{ 
              backgroundImage: `url(${imageToDisplay})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(24px)'
            }}
          ></div>
          
          {/* Gradient overlay for better color blending with page background */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-gray-50 via-transparent to-gray-50 opacity-90"></div>
          
          {/* Main image with static glass effect */}
          <div className="glass-card relative p-1 md:p-2 rounded-2xl shadow-xl overflow-hidden backdrop-blur-md border-2 border-primary/20">
            <img 
              src={imageToDisplay} 
              alt="Profile" 
              className="w-full h-full object-cover rounded-xl z-10"
              onError={handleImageError}
            />
            
            {/* Neural connection indicator with brain circuit icon - smaller on mobile */}
            <div className="absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm 
                          flex items-center justify-center opacity-80 shadow-inner border border-white/30 z-20">
              <BrainCircuit size={isMobile ? 10 : 14} className="text-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImageDisplay;
