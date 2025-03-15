
import React from 'react';

interface ProfileImageDisplayProps {
  profileImage: string | null;
  isLoading: boolean;
}

const ProfileImageDisplay = ({ profileImage, isLoading }: ProfileImageDisplayProps) => {
  return (
    <div className="aspect-[3/4] overflow-hidden">
      {isLoading ? (
        <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center animate-pulse">
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      ) : profileImage ? (
        <div className="relative">
          {/* Enhanced blurred background for softer edges - more blur added */}
          <div 
            className="absolute inset-0 -m-10 scale-130 blur-3xl opacity-70"
            style={{ 
              backgroundImage: `url(${profileImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          
          {/* Extra gradient overlay for better color blending with page background */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-gray-50 via-transparent to-gray-50 opacity-90"></div>
          
          {/* Main image with enhanced glass effect */}
          <div className="glass-card relative p-2 rounded-2xl shadow-xl overflow-hidden backdrop-blur-md">
            <img 
              src={profileImage} 
              alt="Hardeep Anand" 
              className="w-full h-full object-cover rounded-xl z-10"
              onError={(e) => {
                console.log("Image failed to load, falling back to default");
                // Use type assertion to access currentTarget
                const target = e.currentTarget as HTMLImageElement;
                target.src = '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
              }}
            />
            {/* Inner glow effect - enhanced */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-purple-300/15 to-blue-300/15 mix-blend-overlay"></div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
          <p className="text-gray-400 text-sm">Professional photo here</p>
        </div>
      )}
    </div>
  );
};

export default ProfileImageDisplay;
