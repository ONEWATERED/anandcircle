
import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundParticlesProps {
  isMobile: boolean;
}

const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({ isMobile }) => {
  // Create fewer particles on mobile for better performance
  const particleCount = isMobile ? 4 : 8;
  const particles = Array.from({ length: particleCount });
  
  return (
    <>
      {particles.map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: Math.random() * (isMobile ? 3 : 8) + 1, // Slightly larger particles for visibility
            height: Math.random() * (isMobile ? 3 : 8) + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: isMobile ? 0.7 : 0.5, // Higher opacity for better visibility on mobile
          }}
          animate={{
            x: [0, Math.random() * (isMobile ? 15 : 40) - (isMobile ? 7.5 : 20)],
            y: [0, Math.random() * (isMobile ? 15 : 40) - (isMobile ? 7.5 : 20)],
            opacity: [isMobile ? 0.7 : 0.5, 0.2, isMobile ? 0.7 : 0.5],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </>
  );
};

export default BackgroundParticles;
