
import React, { useEffect } from 'react';

interface ProfileImageDisplayProps {
  profileImage: string | null;
  isLoading: boolean;
}

const ProfileImageDisplay = ({ profileImage, isLoading }: ProfileImageDisplayProps) => {
  const [imageError, setImageError] = React.useState(false);
  const [isIOS, setIsIOS] = React.useState(false);
  const defaultImage = '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
  
  // Detect iOS devices
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
  }, []);
  
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
    <div className="w-full overflow-hidden rounded-lg">
      {isLoading ? (
        <div className="w-full h-full bg-slate-200 flex items-center justify-center p-8">
          <p className="text-slate-500 text-sm">Loading...</p>
        </div>
      ) : (
        <div className="relative">
          {/* Tech frame with data glowing border */}
          <div className="absolute inset-0 tech-gradient-border rounded-lg"></div>
          
          {/* Image container */}
          <div className="relative rounded-lg overflow-hidden">
            {/* Grid overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 opacity-30 mix-blend-overlay"></div>
            
            {/* Scanning line effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-scanning-line"></div>
            </div>
            
            <img 
              src={imageToDisplay} 
              alt="Profile" 
              className="w-full h-full object-cover max-w-full relative z-10"
              onError={handleImageError}
              style={{
                maxHeight: '300px',
                objectFit: 'cover',
                // Force image redraw on iOS
                transform: isIOS ? 'translateZ(0)' : 'none',
                WebkitBackfaceVisibility: 'hidden',
              }}
            />
            
            {/* Tech corner accents */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-secondary"></div>
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-secondary"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary"></div>
            
            {/* Data visualization dots in corners */}
            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft"></div>
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-secondary animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImageDisplay;
