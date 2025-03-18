
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfileImageDisplayProps {
  profileImage: string | null;
  isLoading: boolean;
}

const ProfileImageDisplay = ({ profileImage, isLoading }: ProfileImageDisplayProps) => {
  const [imageError, setImageError] = React.useState(false);
  const defaultImage = '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
  
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
        <div>
          {/* Simple static image display with minimal styling */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <img 
              src={imageToDisplay} 
              alt="Profile" 
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImageDisplay;
