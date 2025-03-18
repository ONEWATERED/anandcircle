
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
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      ) : (
        <div className="relative">
          {/* Simple static image display with minimal styling */}
          <div className="p-1 md:p-2 rounded-2xl shadow-md overflow-hidden border-2 border-primary/20">
            <img 
              src={imageToDisplay} 
              alt="Profile" 
              className="w-full h-full object-cover rounded-xl"
              onError={handleImageError}
            />
            
            {/* Neural connection indicator with brain circuit icon - smaller on mobile */}
            <div className="absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/10 
                          flex items-center justify-center shadow-sm border border-white/30">
              <BrainCircuit size={isMobile ? 10 : 14} className="text-primary" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImageDisplay;
