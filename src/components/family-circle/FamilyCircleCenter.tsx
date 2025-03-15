
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Users } from 'lucide-react';

interface FamilyCircleCenterProps {
  centerSize: number;
  width: number;
  height: number;
}

const FamilyCircleCenter: React.FC<FamilyCircleCenterProps> = ({ centerSize, width, height }) => {
  return (
    <div
      className="absolute flex flex-col items-center justify-center z-10"
      style={{
        top: '50%',
        left: '50%',
        width: centerSize * 2.2,
        height: centerSize * 2.2,
        marginLeft: -(centerSize * 2.2) / 2,
        marginTop: -(centerSize * 2.2) / 2,
      }}
    >
      <div
        className="rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg p-4"
        style={{
          width: centerSize * 2.2,
          height: centerSize * 2.2,
        }}
      >
        <Avatar className="h-20 w-20 mb-2 border-4 border-white/30">
          <AvatarImage src="/your-profile-image.jpg" alt="Your Name" />
          <AvatarFallback>
            <Users size={32} />
          </AvatarFallback>
        </Avatar>
        
        <h3 className="text-white font-bold text-center mb-1 text-sm md:text-lg">
          Your Name
        </h3>
        
        <p className="text-white/80 text-center mb-1 text-3xs md:text-xs max-w-[90%] mx-auto">
          My Family Circle
        </p>
      </div>
    </div>
  );
};

export default FamilyCircleCenter;
