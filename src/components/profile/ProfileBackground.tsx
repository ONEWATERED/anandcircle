
import React, { useRef, useEffect, useState } from 'react';

interface ProfileBackgroundProps {
  profileImageUrl: string | null;
}

const ProfileBackground: React.FC<ProfileBackgroundProps> = ({ profileImageUrl }) => {
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [fallbackLoaded, setFallbackLoaded] = useState(false);

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
    
    // Preload the fallback image to ensure it's in cache
    const preloadFallback = new Image();
    preloadFallback.onload = () => {
      console.log("Fallback image preloaded successfully:", fallbackImage);
      setFallbackLoaded(true);
    };
    preloadFallback.onerror = () => {
      console.error("Critical error: Fallback image failed to load:", fallbackImage);
    };
    preloadFallback.src = fallbackImage;
    
    // Also preload the main image
    if (profileImageUrl && profileImageUrl !== fallbackImage) {
      const preloadMain = new Image();
      preloadMain.onload = () => {
        console.log("Main image preloaded successfully:", profileImageUrl);
      };
      preloadMain.src = profileImageUrl;
    }
  }, [profileImageUrl]);

  console.log("ProfileBackground rendering with image:", imageUrl, "Error:", imageError, "Fallback loaded:", fallbackLoaded);

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
        
        {/* Fallback image - always render but initially hidden */}
        <img 
          src={fallbackImage} 
          alt="Profile Background"
          className={`w-full h-full object-cover object-center opacity-100 transition-opacity duration-300 ${imageError || !profileImageUrl ? 'block' : 'hidden'}`}
          onLoad={() => {
            console.log("Fallback image loaded successfully in DOM");
            setFallbackLoaded(true);
          }}
          onError={() => {
            console.error("Critical DOM error: Fallback image failed to load in DOM", fallbackImage);
          }}
          style={{zIndex: 5}}
        />
        
        {/* Main image - only render if we have a URL and it's not the fallback */}
        {profileImageUrl && profileImageUrl !== fallbackImage && (
          <img 
            src={profileImageUrl} 
            alt="Profile Background" 
            className={`w-full h-full object-cover object-center opacity-100 transition-opacity duration-300 ${imageError ? 'hidden' : 'block'}`}
            onLoad={() => {
              console.log("Main image loaded successfully:", profileImageUrl);
              setImageLoaded(true);
              setImageError(false);
            }}
            onError={(e) => {
              console.error("Main image failed to load:", profileImageUrl);
              setImageError(true);
              // Don't need to set the fallback src here since we're already rendering the fallback separately
            }}
            style={{zIndex: 4}}
          />
        )}
      </div>
    </>
  );
};

export default ProfileBackground;
