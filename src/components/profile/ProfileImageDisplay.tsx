
import React, { useEffect } from 'react';

interface ProfileImageDisplayProps {
  profileImage: string | null;
  isLoading: boolean;
}

const ProfileImageDisplay = ({ profileImage, isLoading }: ProfileImageDisplayProps) => {
  const [imageError, setImageError] = React.useState(false);
  const [isIOS, setIsIOS] = React.useState(false);
  const defaultImage = '/lovable-uploads/be1654f2-fca6-4e4d-995d-8a3f49df9249.png';
  
  // Detect iOS devices
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
  }, []);
  
  // Reset image error state when profileImage changes
  useEffect(() => {
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
    <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden">
      {isLoading ? (
        <div className="w-full h-full bg-slate-200 flex items-center justify-center p-8">
          <p className="text-slate-500 text-sm">Loading...</p>
        </div>
      ) : (
        <div className="relative h-full">
          {/* Image container */}
          <div className="relative rounded-lg overflow-hidden h-full">
            {/* Grid overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40 opacity-40 mix-blend-overlay z-10"></div>
            
            <img 
              src={imageToDisplay} 
              alt="Profile" 
              className="w-full h-full object-cover"
              onError={handleImageError}
              style={{
                // Force image redraw on iOS
                transform: isIOS ? 'translateZ(0)' : 'none',
                WebkitBackfaceVisibility: 'hidden',
              }}
            />
            
            {/* Tech corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary z-20"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-secondary z-20"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-secondary z-20"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary z-20"></div>
            
            {/* Data visualization dots in corners */}
            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary animate-pulse z-20"></div>
            <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-secondary animate-pulse z-20" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImageDisplay;
