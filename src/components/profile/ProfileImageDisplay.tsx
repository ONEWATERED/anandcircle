
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
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <img 
            src={imageToDisplay} 
            alt="Profile" 
            className="w-full h-full object-cover max-w-full"
            onError={handleImageError}
            // Add specific styling for iOS
            style={{
              maxHeight: '300px',
              objectFit: 'cover',
              // Force image redraw on iOS
              transform: isIOS ? 'translateZ(0)' : 'none',
              WebkitBackfaceVisibility: 'hidden',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileImageDisplay;
