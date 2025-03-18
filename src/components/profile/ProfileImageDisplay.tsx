
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
      // Log profile image URL for debugging on iOS
      if (isIOS) {
        console.log("iOS device detected. Profile image URL:", profileImage);
      }
    }
  }, [profileImage, isIOS]);
  
  const handleImageError = () => {
    console.warn("Profile image failed to load:", profileImage);
    setImageError(true);
  };
  
  // If there's an error loading the image or no profile image is provided, use the default image
  const imageToDisplay = imageError || !profileImage ? defaultImage : profileImage;
  
  return (
    <div className="w-full overflow-hidden">
      {isLoading ? (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      ) : (
        <div className="relative">
          {/* Futuristic border with neon glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-brand-purple to-cyan-400 rounded-lg p-[2px] animate-pulse-soft">
            {/* Scanline overlay effect */}
            <div className="absolute inset-0 bg-scanlines opacity-10 mix-blend-overlay rounded-lg"></div>
          </div>
          
          {/* Image with tech overlay */}
          <div className="relative border border-white/20 rounded-lg overflow-hidden bg-black/5 m-0.5">
            <div className="absolute inset-0 bg-grid-overlay opacity-10 mix-blend-overlay"></div>
            
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
            
            {/* Corner accent elements */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400/80 rounded-tl-sm"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-purple/80 rounded-tr-sm"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-purple/80 rounded-bl-sm"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400/80 rounded-br-sm"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImageDisplay;
