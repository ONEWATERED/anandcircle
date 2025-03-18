
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
  const circleSize = centerSize * 1.8;
  
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
        className="rounded-xl flex flex-col items-center justify-center bg-white border border-primary/20 shadow-sm p-2 md:p-3"
        style={{
          width: circleSize,
          height: circleSize,
        }}
      >
        <div 
          className="rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1"
          style={{
            width: isVerySmallScreen ? 28 : 36,
            height: isVerySmallScreen ? 28 : 36,
          }}
        >
          <Users size={isVerySmallScreen ? 16 : 20} />
        </div>
        
        <h3 
          className="text-foreground font-semibold text-center mb-0 md:mb-1"
          style={{
            fontSize: isVerySmallScreen ? '0.7rem' : '0.75rem'
          }}
        >
          Join The Circle
        </h3>
        
        <p 
          className="text-muted-foreground text-center mb-1 md:mb-2 max-w-[90%] mx-auto"
          style={{
            fontSize: isVerySmallScreen ? '0.5rem' : '0.55rem',
            display: centerSize < 40 ? 'none' : 'block'
          }}
        >
          Connect with professionals
        </p>
        
        <Button 
          size="sm" 
          className="text-[8px] md:text-xs font-medium"
          style={{
            padding: isVerySmallScreen ? '0.2rem 0.6rem' : '',
            height: isVerySmallScreen ? '1.5rem' : '',
            minHeight: isVerySmallScreen ? '1.5rem' : '',
          }}
        >
          Join Now
        </Button>
      </div>
    </div>
  );
};

export default CenterCircle;
