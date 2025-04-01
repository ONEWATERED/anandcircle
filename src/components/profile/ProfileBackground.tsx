
import React, { useRef, useEffect, useState } from 'react';

interface ProfileBackgroundProps {
  profileImageUrl: string | null;
}

const ProfileBackground: React.FC<ProfileBackgroundProps> = ({ profileImageUrl }) => {
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Guaranteed default image that we know exists
  const fallbackImage = '/lovable-uploads/f6b9e5ff-0741-4bfd-9448-b144fa7ac479.png';
  
  // Try the provided image first, fallback if not provided
  const imageUrl = profileImageUrl || fallbackImage;

  useEffect(() => {
    if (!particlesRef.current) return;

    const createParticles = () => {
      const canvas = particlesRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const particles = [];
      const particleCount = 100;
      const colors = ['#0EA5E9', '#9333EA', '#DB2777', '#F59E0B'];

      const resizeCanvas = () => {
        if (canvas.parentElement) {
          canvas.width = canvas.parentElement.offsetWidth;
          canvas.height = canvas.parentElement.offsetHeight;
        }
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.1
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
          ctx.fill();
          
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
          
          particle.opacity += Math.random() * 0.02 - 0.01;
          if (particle.opacity < 0.1) particle.opacity = 0.1;
          if (particle.opacity > 0.6) particle.opacity = 0.6;
        });
        
        requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    };
    
    createParticles();
  }, [particlesRef]);

  // Reset error state when image URL changes
  useEffect(() => {
    setImageError(false);
  }, [profileImageUrl]);

  console.log("ProfileBackground rendering with image:", imageUrl, "Error:", imageError);

  return (
    <>
      <canvas 
        ref={particlesRef} 
        className="absolute inset-0 z-0 opacity-40"
      />
      
      <div className="absolute inset-0 z-0 bg-data-dots mix-blend-screen opacity-5"></div>
      
      <div className="absolute inset-0 z-0 bg-tech-grid opacity-10"></div>
      
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-tech-dark/30 via-tech-dark/30 to-tech-dark/50 z-10"></div>
        
        {/* Only show the fallback image if we have an error with the main image */}
        {imageError && (
          <img 
            src={fallbackImage} 
            alt="Fallback Profile Background" 
            className="w-full h-full object-cover object-center opacity-90"
          />
        )}
        
        {/* Main image with error handling */}
        <img 
          src={imageUrl} 
          alt="Profile Background" 
          className={`w-full h-full object-cover object-center opacity-80 ${imageError ? 'hidden' : 'block'}`}
          onLoad={() => {
            console.log("Image loaded successfully:", imageUrl);
            setImageLoaded(true);
            setImageError(false);
          }}
          onError={(e) => {
            console.error("Image failed to load:", imageUrl);
            setImageError(true);
            
            // If the current URL is not the fallback but the fallback fails too, we're in trouble
            if (imageUrl !== fallbackImage) {
              const target = e.target as HTMLImageElement;
              target.src = fallbackImage;
            }
          }}
        />
      </div>
    </>
  );
};

export default ProfileBackground;
