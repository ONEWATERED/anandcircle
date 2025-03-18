
import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundParticlesProps {
  isMobile: boolean;
}

const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({ isMobile }) => {
  // Create more particles for a richer, more visible effect
  const particleCount = isMobile ? 25 : 45; // Significantly increased particle count
  const particles = Array.from({ length: particleCount });
  
  // Enhanced particle sizes and shapes for a more prominent tech-inspired look
  const particleSizes = [
    { width: 5, height: 5 },      // Small circle - larger
    { width: 7, height: 7 },      // Medium circle - larger
    { width: 9, height: 9 },      // Large circle - larger
    { width: 3, height: 12 },     // Small vertical line (data stream effect) - longer
    { width: 12, height: 3 },     // Small horizontal line (data stream effect) - wider
    { width: 2, height: 16 },     // Thin vertical line - longer
    { width: 16, height: 2 },     // Thin horizontal line - longer
    { width: 8, height: 8, isSquare: true }  // Square particle - larger
  ];
  
  // Updated color palette with more vibrant tech colors and higher opacity
  const particleColors = [
    "bg-brand-cyan/60",           // Vibrant cyan - much more visible
    "bg-brand-purple/55",         // Vibrant purple - much more visible
    "bg-fuchsia-500/50",          // Magenta - much more visible
    "bg-amber-400/45",            // Gold accent - much more visible
    "bg-brand-blue/50",           // Brand blue - much more visible
    "bg-cyan-300/60",             // Light cyan - much more visible
    "bg-indigo-500/50"            // Indigo - much more visible
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
        const hasGlow = Math.random() > 0.3; // More particles will glow
        
        // Determine if particle will be a data stream effect
        const isDataStream = sizeIndex === 3 || sizeIndex === 4;
        
        // Create more varied animation properties with faster movement
        const duration = Math.random() * 6 + 7; // Slightly faster animation
        const direction = Math.random() > 0.5 ? 1 : -1;
        const delay = Math.random() * 2;
        
        // Determine randomized position and movement for more organic feel
        const xPosition = `${Math.random() * 100}%`;
        const yPosition = `${Math.random() * 100}%`;
        const xMovement = Math.random() * (isMobile ? 50 : 100) * direction; // Increased movement range
        const yMovement = Math.random() * (isMobile ? 50 : 100) * (Math.random() > 0.5 ? 1 : -1); // Increased movement range
        
        // For square particles, add border-radius of 0
        const borderRadius = size.isSquare ? 'rounded-none' : 'rounded-full';
        
        // Enhanced glow intensity
        const glowClass = hasGlow ? 
          (colorIndex % 3 === 0 ? 'shadow-glow-cyan' : 
           colorIndex % 3 === 1 ? 'shadow-glow-magenta' : 'shadow-glow-purple') : '';
        
        return (
          <motion.div
            key={`particle-${i}`}
            className={`absolute ${borderRadius} ${color} ${glowClass} ${isDataStream ? 'opacity-90' : ''}`} // Higher base opacity
            style={{
              width: isMobile ? size.width * 0.9 : size.width, // Larger on all devices
              height: isMobile ? size.height * 0.9 : size.height, // Larger on all devices
              left: xPosition,
              top: yPosition,
              opacity: isDataStream ? 0.9 : (isMobile ? 0.8 : 0.75), // Much higher opacity overall
              zIndex: 1 // Increased from 0 to 1 to make it more visible
            }}
            animate={{
              x: [0, xMovement, 0],
              y: [0, yMovement, 0],
              opacity: isDataStream 
                ? [0.9, 1, 0.9] // Higher opacity range
                : [isMobile ? 0.8 : 0.75, 0.4, isMobile ? 0.8 : 0.75], // Higher opacity range
              scale: hasGlow ? [1, 1.6, 1] : [1, 1.3, 1], // More pronounced scale effect
              rotate: size.isSquare ? [0, 180, 0] : 0, // More rotation for square particles
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
      {!isMobile && Array.from({ length: 8 }).map((_, i) => ( // Increased to 8 lines
        <motion.div
          key={`circuit-line-${i}`}
          className="absolute bg-gradient-to-r from-brand-cyan/20 via-brand-cyan/50 to-brand-cyan/20 z-1" // More visible
          style={{
            height: 2, // Thicker
            width: '60%', // Wider
            left: `${15 + Math.random() * 35}%`,
            top: `${10 + i * 10}%`, // Better distribution
            opacity: 0.7 // More visible
          }}
          animate={{
            opacity: [0.7, 0.9, 0.7], // More visible
            width: ['60%', '80%', '60%'], // Wider animation
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
      {!isMobile && Array.from({ length: 7 }).map((_, i) => ( // Increased to 7 lines
        <motion.div
          key={`circuit-line-v-${i}`}
          className="absolute bg-gradient-to-b from-brand-purple/20 via-brand-purple/50 to-brand-purple/20 z-1" // More visible
          style={{
            width: 2, // Thicker
            height: '50%', // Taller
            left: `${15 + i * 10}%`, // Better distribution
            top: `${15 + Math.random() * 30}%`,
            opacity: 0.7 // More visible
          }}
          animate={{
            opacity: [0.7, 0.9, 0.7], // More visible
            height: ['50%', '70%', '50%'], // Taller animation
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
      
      {/* Diagonal data streams for a more dynamic effect */}
      {Array.from({ length: isMobile ? 3 : 5 }).map((_, i) => ( // Added to mobile too
        <motion.div
          key={`data-stream-${i}`}
          className="absolute bg-gradient-to-br from-amber-400/15 via-amber-400/40 to-amber-400/15 z-1"
          style={{
            height: 2,
            width: '40%',
            left: `${20 + i * 15}%`,
            top: `${15 + i * 15}%`,
            transform: 'rotate(45deg)',
            opacity: 0.8
          }}
          animate={{
            opacity: [0.8, 1, 0.8],
            width: ['40%', '60%', '40%'],
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
      
      {/* NEW: Add pulsing nodes at circuit intersections */}
      {!isMobile && Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute rounded-full bg-brand-cyan/70 shadow-glow-cyan z-1"
          style={{
            width: 6,
            height: 6,
            left: `${25 + i * 10}%`,
            top: `${30 + (i % 3) * 15}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2 + (i % 3),
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.7
          }}
        />
      ))}
    </>
  );
};

export default BackgroundParticles;
