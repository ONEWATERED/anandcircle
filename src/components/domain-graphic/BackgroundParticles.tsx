
import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundParticlesProps {
  isMobile: boolean;
}

const BackgroundParticles: React.FC<BackgroundParticlesProps> = ({ isMobile }) => {
  // Create an array of the needed size
  const particleCount = isMobile ? 5 : 10;
  const particles = Array.from({ length: particleCount });
  
  return (
    <>
      {particles.map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: Math.random() * (isMobile ? 6 : 10) + 3,
            height: Math.random() * (isMobile ? 6 : 10) + 3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            x: [0, Math.random() * (isMobile ? 30 : 50) - (isMobile ? 15 : 25)],
            y: [0, Math.random() * (isMobile ? 30 : 50) - (isMobile ? 15 : 25)],
            opacity: [0.7, 0.1, 0.7],
            scale: [1, 1.5, 1]
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
