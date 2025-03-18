
import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundParticlesProps {
  isMobile: boolean;
}

const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({ isMobile }) => {
  // Create fewer particles on mobile for better performance
  const particleCount = isMobile ? 2 : 8;
  const particles = Array.from({ length: particleCount });
  
  return (
    <>
      {particles.map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: Math.random() * (isMobile ? 2 : 8) + 1, // Even smaller particles on mobile
            height: Math.random() * (isMobile ? 2 : 8) + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            x: [0, Math.random() * (isMobile ? 10 : 40) - (isMobile ? 5 : 20)], // Reduced movement on mobile
            y: [0, Math.random() * (isMobile ? 10 : 40) - (isMobile ? 5 : 20)],
            opacity: [0.5, 0.1, 0.5],
            scale: [1, 1.1, 1] // Less scale change on mobile
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
