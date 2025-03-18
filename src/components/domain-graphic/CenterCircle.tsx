
import React from 'react';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CenterCircleProps {
  centerSize: number;
  width: number;
  height: number;
}

const CenterCircle: React.FC<CenterCircleProps> = ({ centerSize, width, height }) => {
  // Determine if this is a very small mobile screen
  const isVerySmallScreen = width > 0 && width < 350;
  
  // Basic sizing
  const circleSize = centerSize * 2;
  
  return (
    <div
      className="absolute flex flex-col items-center justify-center z-10"
      style={{
        top: height / 2,
        left: width / 2,
        width: circleSize,
        height: circleSize,
        marginLeft: -circleSize / 2,
        marginTop: -circleSize / 2,
      }}
    >
      <div
        className="rounded-full flex flex-col items-center justify-center bg-primary shadow-sm p-2 md:p-4"
        style={{
          width: circleSize,
          height: circleSize,
        }}
      >
        <div 
          className="rounded-full bg-white/20 flex items-center justify-center text-white mb-1 md:mb-2"
          style={{
            width: isVerySmallScreen ? 32 : 40,
            height: isVerySmallScreen ? 32 : 40,
          }}
        >
          <Users size={isVerySmallScreen ? 18 : 22} />
        </div>
        
        <h3 
          className="text-white font-bold text-center mb-0 md:mb-1"
          style={{
            fontSize: isVerySmallScreen ? '0.75rem' : '0.8rem'
          }}
        >
          Join The Circle
        </h3>
        
        <p 
          className="text-white/80 text-center mb-1 md:mb-3 max-w-[90%] mx-auto"
          style={{
            fontSize: isVerySmallScreen ? '0.55rem' : '0.6rem',
            display: centerSize < 40 ? 'none' : 'block'
          }}
        >
          Connect with professionals
        </p>
        
        <Button 
          size="sm" 
          variant="secondary" 
          className="text-[9px] md:text-xs font-semibold"
          style={{
            padding: isVerySmallScreen ? '0.3rem 0.7rem' : '',
            height: isVerySmallScreen ? '1.7rem' : '',
            minHeight: isVerySmallScreen ? '1.7rem' : '',
          }}
        >
          Join Now
        </Button>
      </div>
    </div>
  );
};

export default CenterCircle;
