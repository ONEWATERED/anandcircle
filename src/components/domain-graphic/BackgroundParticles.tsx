
import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundParticlesProps {
  isMobile: boolean;
}

const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({ isMobile }) => {
  // Create fewer particles on mobile for better performance
  const particleCount = isMobile ? 3 : 10;
  const particles = Array.from({ length: particleCount });
  
  return (
    <>
      {particles.map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: Math.random() * (isMobile ? 3 : 10) + 2, // Even smaller particles on mobile
            height: Math.random() * (isMobile ? 3 : 10) + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            x: [0, Math.random() * (isMobile ? 15 : 50) - (isMobile ? 7 : 25)], // Reduced movement on mobile
            y: [0, Math.random() * (isMobile ? 15 : 50) - (isMobile ? 7 : 25)],
            opacity: [0.7, 0.1, 0.7],
            scale: [1, 1.2, 1] // Less scale change on mobile
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </>
  );
};

export default BackgroundParticles;
