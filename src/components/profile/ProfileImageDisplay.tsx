
import React from 'react';

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
            
            {/* Subtle avatar connection indicator in top-right */}
            <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm 
                          flex items-center justify-center opacity-80 shadow-inner border border-white/30 z-20">
              <span className="text-[10px] font-semibold text-white/90">AI</span>
            </div>
          </div>
          
          {/* Inner shadow glow in matching colors */}
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_15px_rgba(139,92,246,0.2)] pointer-events-none"></div>
        </div>
      )}
    </div>
  );
};

export default ProfileImageDisplay;
