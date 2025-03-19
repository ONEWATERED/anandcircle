
import React from 'react';
import { User } from 'lucide-react';

interface ProfileImageDisplayProps {
  profileImage: string | null;
  isLoading: boolean;
}

const ProfileImageDisplay = ({ isLoading }: ProfileImageDisplayProps) => {
  return (
    <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden">
      {isLoading ? (
        <div className="w-full h-full bg-slate-200 flex items-center justify-center p-8">
          <p className="text-slate-500 text-sm">Loading...</p>
        </div>
      ) : (
        <div className="relative h-full">
          {/* Placeholder container */}
          <div className="relative rounded-lg overflow-hidden h-full bg-slate-100 flex items-center justify-center">
            <User className="h-16 w-16 text-slate-400" />
            
            {/* Tech corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary z-20"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-secondary z-20"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-secondary z-20"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary z-20"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImageDisplay;
