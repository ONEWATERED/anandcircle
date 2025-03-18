
import React from 'react';
import { Users } from 'lucide-react';

interface CenterCircleProps {
  centerSize: number;
  width: number;
  height: number;
}

const CenterCircle: React.FC<CenterCircleProps> = ({ centerSize, width, height }) => {
  // Determine if this is a very small screen
  const isVerySmallScreen = width > 0 && width < 350;
  
  // Basic sizing
  const circleSize = centerSize * 1.8;
  const iconSize = isVerySmallScreen ? 16 : 20;
  
  // Mouse hover state
  const [isHovered, setIsHovered] = React.useState(false);
  
  // Redirect to target section
  const handleClick = () => {
    const contactSection = document.getElementById('interest-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div
        className="rounded-xl flex flex-col items-center justify-center bg-white border border-gray-300 shadow-sm p-2 md:p-3 cursor-pointer"
        style={{
          width: circleSize,
          height: circleSize,
          transition: "box-shadow 0.3s ease"
        }}
      >
        <div 
          className="rounded-full bg-gray-100 flex items-center justify-center text-black mb-1 relative overflow-hidden"
          style={{
            width: isVerySmallScreen ? 28 : 36,
            height: isVerySmallScreen ? 28 : 36,
          }}
        >
          <Users size={iconSize} />
        </div>
        
        <h3 
          className="text-black font-normal text-center mb-0 md:mb-1"
          style={{
            fontSize: isVerySmallScreen ? '0.7rem' : '0.75rem'
          }}
        >
          Join The Circle
        </h3>
        
        <p 
          className="text-gray-600 text-center mb-1 md:mb-2 max-w-[90%] mx-auto"
          style={{
            fontSize: isVerySmallScreen ? '0.5rem' : '0.55rem',
            display: centerSize < 40 ? 'none' : 'block'
          }}
        >
          Connect with professionals
        </p>
        
        <button 
          className="bg-black hover:bg-black/80 text-white rounded-md px-2 py-1"
          style={{
            fontSize: isVerySmallScreen ? '0.6rem' : '0.7rem',
            padding: isVerySmallScreen ? '0.2rem 0.6rem' : '0.3rem 0.8rem',
          }}
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default CenterCircle;
