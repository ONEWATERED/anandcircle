
import React from 'react';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <motion.div
      className="absolute flex flex-col items-center justify-center z-10"
      style={{
        top: height / 2,
        left: width / 2,
        width: circleSize,
        height: circleSize,
        marginLeft: -circleSize / 2,
        marginTop: -circleSize / 2,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        duration: 0.5,
        delay: 0.5,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <motion.div
        className="rounded-xl flex flex-col items-center justify-center bg-white border border-primary/20 shadow-sm p-2 md:p-3 cursor-pointer"
        style={{
          width: circleSize,
          height: circleSize,
        }}
        animate={{
          boxShadow: isHovered 
            ? "0 0 15px 5px rgba(14, 165, 233, 0.3)" 
            : "0 4px 12px rgba(0, 0, 0, 0.1)"
        }}
      >
        <motion.div 
          className="rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1 relative overflow-hidden"
          style={{
            width: isVerySmallScreen ? 28 : 36,
            height: isVerySmallScreen ? 28 : 36,
          }}
          animate={{ 
            backgroundColor: isHovered ? "rgba(14, 165, 233, 0.2)" : "rgba(14, 165, 233, 0.1)" 
          }}
        >
          <Users size={iconSize} />
          
          {/* Animation effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "100%" : "-100%" }}
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0, repeatDelay: 0.5 }}
          />
        </motion.div>
        
        <motion.h3 
          className="text-foreground font-semibold text-center mb-0 md:mb-1"
          style={{
            fontSize: isVerySmallScreen ? '0.7rem' : '0.75rem'
          }}
          animate={{ 
            color: isHovered ? "#0ea5e9" : "#1e293b" 
          }}
        >
          Join The Circle
        </motion.h3>
        
        <motion.p 
          className="text-muted-foreground text-center mb-1 md:mb-2 max-w-[90%] mx-auto"
          style={{
            fontSize: isVerySmallScreen ? '0.5rem' : '0.55rem',
            display: centerSize < 40 ? 'none' : 'block'
          }}
        >
          Connect with professionals
        </motion.p>
        
        <motion.button 
          className="bg-primary hover:bg-primary/90 text-white rounded-md px-2 py-1"
          style={{
            fontSize: isVerySmallScreen ? '0.6rem' : '0.7rem',
            padding: isVerySmallScreen ? '0.2rem 0.6rem' : '0.3rem 0.8rem',
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            backgroundColor: isHovered ? "#0284c7" : "#0ea5e9",
          }}
        >
          Join Now
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default CenterCircle;
