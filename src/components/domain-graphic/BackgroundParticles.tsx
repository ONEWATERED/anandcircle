
import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundParticlesProps {
  isMobile: boolean;
}

const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({ isMobile }) => {
  // Create more particles on desktop for a richer effect
  const particleCount = isMobile ? 8 : 15;
  const particles = Array.from({ length: particleCount });
  
  // Define different particle sizes and colors for more variation
  const particleSizes = [
    { width: 2, height: 2 },      // Small circle
    { width: 3, height: 3 },      // Medium circle
    { width: 4, height: 4 },      // Large circle
    { width: 2, height: 4 },      // Small rectangle
    { width: 3, height: 6 }       // Large rectangle
  ];
  
  const particleColors = [
    "bg-primary/20",              // Primary with transparency
    "bg-secondary/30",            // Secondary with transparency 
    "bg-accent/25",               // Accent with transparency
    "bg-cyan-400/20",             // Cyan with transparency
    "bg-purple-500/15"            // Purple with transparency
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
        const hasGlow = Math.random() > 0.7;
        
        return (
          <motion.div
            key={`particle-${i}`}
            className={`absolute rounded-full ${color} ${hasGlow ? 'shadow-glow' : ''}`}
            style={{
              width: isMobile ? size.width * 0.7 : size.width,
              height: isMobile ? size.height * 0.7 : size.height,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: isMobile ? 0.7 : 0.5,
              boxShadow: hasGlow ? `0 0 8px ${getComputedColor(colorIndex)}` : 'none'
            }}
            animate={{
              x: [0, Math.random() * (isMobile ? 20 : 50) - (isMobile ? 10 : 25)],
              y: [0, Math.random() * (isMobile ? 20 : 50) - (isMobile ? 10 : 25)],
              opacity: [isMobile ? 0.7 : 0.5, 0.2, isMobile ? 0.7 : 0.5],
              scale: hasGlow ? [1, 1.2, 1] : [1, 1.05, 1]
            }}
            transition={{
              duration: Math.random() * 5 + 5, // Longer animation duration
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        );
      })}
    </>
  );
};

// Helper function to get computed color for glow effect
const getComputedColor = (index: number) => {
  switch (index) {
    case 0: return 'rgba(27, 58, 87, 0.5)';   // Primary
    case 1: return 'rgba(0, 255, 255, 0.5)';  // Secondary
    case 2: return 'rgba(138, 43, 226, 0.5)'; // Accent
    case 3: return 'rgba(34, 211, 238, 0.5)'; // Cyan
    case 4: return 'rgba(168, 85, 247, 0.5)'; // Purple
    default: return 'rgba(255, 255, 255, 0.5)';
  }
};

export default BackgroundParticles;
