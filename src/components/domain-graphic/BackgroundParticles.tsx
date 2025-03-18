
import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundParticlesProps {
  isMobile: boolean;
}

const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({ isMobile }) => {
  // Create more particles on desktop for a richer effect
  const particleCount = isMobile ? 12 : 25;
  const particles = Array.from({ length: particleCount });
  
  // Enhanced particle sizes and shapes for a more tech-inspired look
  const particleSizes = [
    { width: 2, height: 2 },      // Small circle
    { width: 3, height: 3 },      // Medium circle
    { width: 4, height: 4 },      // Large circle
    { width: 2, height: 6 },      // Small vertical line (data stream effect)
    { width: 6, height: 2 },      // Small horizontal line (data stream effect)
    { width: 1, height: 8 },      // Thin vertical line
    { width: 8, height: 1 },      // Thin horizontal line
    { width: 3, height: 3, isSquare: true }  // Square particle
  ];
  
  // Updated color palette with vibrant tech colors
  const particleColors = [
    "bg-brand-cyan/30",           // Vibrant cyan
    "bg-brand-purple/25",         // Vibrant purple
    "bg-fuchsia-500/20",          // Magenta
    "bg-amber-400/15",            // Gold accent
    "bg-brand-blue/20",           // Brand blue
    "bg-cyan-300/25",             // Light cyan
    "bg-indigo-500/20"            // Indigo
  ];
  
  return (
    <>
      {particles.map((_, i) => {
        // Get random size and color for this particle
        const sizeIndex = Math.floor(Math.random() * particleSizes.length);
        const colorIndex = Math.floor(Math.random() * particleColors.length);
        const size = particleSizes[sizeIndex];
        const color = particleColors[colorIndex];
        
        // Determine if this particle will have a glow effect
        const hasGlow = Math.random() > 0.6;
        
        // Determine if particle will be a data stream effect
        const isDataStream = sizeIndex === 3 || sizeIndex === 4;
        
        // Create more varied animation properties
        const duration = Math.random() * 8 + 7; // Longer animation for more fluid movement
        const direction = Math.random() > 0.5 ? 1 : -1;
        const delay = Math.random() * 2;
        
        // Determine randomized position and movement for more organic feel
        const xPosition = `${Math.random() * 100}%`;
        const yPosition = `${Math.random() * 100}%`;
        const xMovement = Math.random() * (isMobile ? 30 : 70) * direction;
        const yMovement = Math.random() * (isMobile ? 30 : 70) * (Math.random() > 0.5 ? 1 : -1);
        
        // For square particles, add border-radius of 0
        const borderRadius = size.isSquare ? 'rounded-none' : 'rounded-full';
        
        return (
          <motion.div
            key={`particle-${i}`}
            className={`absolute ${borderRadius} ${color} ${hasGlow ? (colorIndex % 2 === 0 ? 'shadow-glow-cyan' : 'shadow-glow-magenta') : ''} 
              ${isDataStream ? 'opacity-70' : ''}`}
            style={{
              width: isMobile ? size.width * 0.7 : size.width,
              height: isMobile ? size.height * 0.7 : size.height,
              left: xPosition,
              top: yPosition,
              opacity: isDataStream ? 0.7 : (isMobile ? 0.6 : 0.5),
              zIndex: -1
            }}
            animate={{
              x: [0, xMovement, 0],
              y: [0, yMovement, 0],
              opacity: isDataStream 
                ? [0.7, 0.9, 0.7] 
                : [isMobile ? 0.6 : 0.5, 0.2, isMobile ? 0.6 : 0.5],
              scale: hasGlow ? [1, 1.3, 1] : [1, 1.1, 1],
              rotate: size.isSquare ? [0, 45, 0] : 0, // Rotate square particles
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

      {/* Additional digital circuit lines - horizontal and vertical for tech effect */}
      {!isMobile && Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`circuit-line-${i}`}
          className="absolute bg-gradient-to-r from-brand-cyan/5 via-brand-cyan/20 to-brand-cyan/5 z-[-1]"
          style={{
            height: 1,
            width: '40%',
            left: `${20 + Math.random() * 40}%`,
            top: `${20 + i * 20}%`,
            opacity: 0.3
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            width: ['40%', '60%', '40%'],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}
      
      {/* Vertical circuit lines */}
      {!isMobile && Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`circuit-line-v-${i}`}
          className="absolute bg-gradient-to-b from-brand-purple/5 via-brand-purple/20 to-brand-purple/5 z-[-1]"
          style={{
            width: 1,
            height: '30%',
            left: `${30 + i * 20}%`,
            top: `${30 + Math.random() * 30}%`,
            opacity: 0.3
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            height: ['30%', '50%', '30%'],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.8
          }}
        />
      ))}
    </>
  );
};

export default BackgroundParticles;
