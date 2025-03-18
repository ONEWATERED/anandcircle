
import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundParticlesProps {
  isMobile: boolean;
}

const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({ isMobile }) => {
  // Create more particles for a richer, more visible effect
  const particleCount = isMobile ? 18 : 35; // Increased particle count
  const particles = Array.from({ length: particleCount });
  
  // Enhanced particle sizes and shapes for a more prominent tech-inspired look
  const particleSizes = [
    { width: 3, height: 3 },      // Small circle - slightly larger
    { width: 4, height: 4 },      // Medium circle
    { width: 5, height: 5 },      // Large circle - slightly larger
    { width: 2, height: 8 },      // Small vertical line (data stream effect) - longer
    { width: 8, height: 2 },      // Small horizontal line (data stream effect)
    { width: 1, height: 12 },     // Thin vertical line - longer
    { width: 12, height: 1 },     // Thin horizontal line - longer
    { width: 4, height: 4, isSquare: true }  // Square particle - slightly larger
  ];
  
  // Updated color palette with more vibrant tech colors and higher opacity
  const particleColors = [
    "bg-brand-cyan/40",           // Vibrant cyan - more visible
    "bg-brand-purple/35",         // Vibrant purple - more visible
    "bg-fuchsia-500/30",          // Magenta - more visible
    "bg-amber-400/25",            // Gold accent - more visible
    "bg-brand-blue/30",           // Brand blue - more visible
    "bg-cyan-300/40",             // Light cyan - more visible
    "bg-indigo-500/30"            // Indigo - more visible
  ];
  
  return (
    <>
      {particles.map((_, i) => {
        // Get random size and color for this particle
        const sizeIndex = Math.floor(Math.random() * particleSizes.length);
        const colorIndex = Math.floor(Math.random() * particleColors.length);
        const size = particleSizes[sizeIndex];
        const color = particleColors[colorIndex];
        
        // Determine if this particle will have a glow effect - increased probability
        const hasGlow = Math.random() > 0.4; // More particles will glow
        
        // Determine if particle will be a data stream effect
        const isDataStream = sizeIndex === 3 || sizeIndex === 4;
        
        // Create more varied animation properties with faster movement
        const duration = Math.random() * 6 + 7; // Slightly faster animation
        const direction = Math.random() > 0.5 ? 1 : -1;
        const delay = Math.random() * 2;
        
        // Determine randomized position and movement for more organic feel
        const xPosition = `${Math.random() * 100}%`;
        const yPosition = `${Math.random() * 100}%`;
        const xMovement = Math.random() * (isMobile ? 40 : 80) * direction; // Increased movement range
        const yMovement = Math.random() * (isMobile ? 40 : 80) * (Math.random() > 0.5 ? 1 : -1); // Increased movement range
        
        // For square particles, add border-radius of 0
        const borderRadius = size.isSquare ? 'rounded-none' : 'rounded-full';
        
        // Enhanced glow intensity
        const glowClass = hasGlow ? 
          (colorIndex % 3 === 0 ? 'shadow-glow-cyan' : 
           colorIndex % 3 === 1 ? 'shadow-glow-magenta' : 'shadow-glow-purple') : '';
        
        return (
          <motion.div
            key={`particle-${i}`}
            className={`absolute ${borderRadius} ${color} ${glowClass} 
              ${isDataStream ? 'opacity-80' : ''}`} // Higher base opacity
            style={{
              width: isMobile ? size.width * 0.8 : size.width, // Slightly larger on mobile
              height: isMobile ? size.height * 0.8 : size.height, // Slightly larger on mobile
              left: xPosition,
              top: yPosition,
              opacity: isDataStream ? 0.8 : (isMobile ? 0.7 : 0.65), // Higher opacity overall
              zIndex: 0 // Changed from -1 to 0 to make it more visible
            }}
            animate={{
              x: [0, xMovement, 0],
              y: [0, yMovement, 0],
              opacity: isDataStream 
                ? [0.8, 1, 0.8] // Higher opacity range
                : [isMobile ? 0.7 : 0.65, 0.3, isMobile ? 0.7 : 0.65], // Higher opacity range
              scale: hasGlow ? [1, 1.4, 1] : [1, 1.2, 1], // More pronounced scale effect
              rotate: size.isSquare ? [0, 90, 0] : 0, // More rotation for square particles
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: delay
            }}
          />
        );
      })}

      {/* Additional digital circuit lines - enhanced and more visible */}
      {!isMobile && Array.from({ length: 6 }).map((_, i) => ( // Increased from 4 to 6 lines
        <motion.div
          key={`circuit-line-${i}`}
          className="absolute bg-gradient-to-r from-brand-cyan/10 via-brand-cyan/30 to-brand-cyan/10 z-0" // More visible
          style={{
            height: 1.5, // Slightly thicker
            width: '50%', // Wider
            left: `${15 + Math.random() * 35}%`,
            top: `${15 + i * 15}%`, // Better distribution
            opacity: 0.5 // More visible
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5], // More visible
            width: ['50%', '70%', '50%'], // Wider animation
          }}
          transition={{
            duration: 7 + i * 1.5, // Slightly faster
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}
      
      {/* Vertical circuit lines - enhanced */}
      {!isMobile && Array.from({ length: 5 }).map((_, i) => ( // Increased from 3 to 5 lines
        <motion.div
          key={`circuit-line-v-${i}`}
          className="absolute bg-gradient-to-b from-brand-purple/10 via-brand-purple/30 to-brand-purple/10 z-0" // More visible
          style={{
            width: 1.5, // Slightly thicker
            height: '40%', // Taller
            left: `${20 + i * 15}%`, // Better distribution
            top: `${20 + Math.random() * 30}%`,
            opacity: 0.5 // More visible
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5], // More visible
            height: ['40%', '60%', '40%'], // Taller animation
          }}
          transition={{
            duration: 9 + i * 1.5, // Slightly faster
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.8
          }}
        />
      ))}
      
      {/* New: Diagonal data streams for a more dynamic effect */}
      {!isMobile && Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`data-stream-${i}`}
          className="absolute bg-gradient-to-br from-amber-400/5 via-amber-400/20 to-amber-400/5 z-0"
          style={{
            height: 1,
            width: '30%',
            left: `${30 + i * 20}%`,
            top: `${20 + i * 20}%`,
            transform: 'rotate(45deg)',
            opacity: 0.6
          }}
          animate={{
            opacity: [0.6, 0.9, 0.6],
            width: ['30%', '50%', '30%'],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i
          }}
        />
      ))}
    </>
  );
};

export default BackgroundParticles;
