
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
  
  // Try the provided image first, fallback if not provided or on error
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

  // Reset error state and preload images when image URL changes
  useEffect(() => {
    setImageError(false);
    console.log("ProfileBackground: Initializing with image URL:", imageUrl);
    
    // Always preload the fallback image to ensure it's ready
    const preloadFallback = new Image();
    preloadFallback.onload = () => {
      console.log("Fallback image preloaded successfully:", fallbackImage);
      setFallbackLoaded(true);
    };
    preloadFallback.onerror = () => {
      console.error("Critical error: Fallback image failed to load:", fallbackImage);
    };
    preloadFallback.src = fallbackImage;
    
    // Also preload the main image if it's different from fallback
    if (profileImageUrl && profileImageUrl !== fallbackImage) {
      const preloadMain = new Image();
      preloadMain.onload = () => {
        console.log("Main image preloaded successfully:", profileImageUrl);
        setImageLoaded(true);
      };
      preloadMain.onerror = () => {
        console.error("Main image failed to preload:", profileImageUrl);
        setImageError(true);
      };
      preloadMain.src = profileImageUrl;
    }
  }, [profileImageUrl, fallbackImage]);

  console.log("ProfileBackground rendering with:", {
    imageUrl,
    profileImageUrl,
    fallbackImage,
    imageError,
    fallbackLoaded
  });

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
        
        {/* Fallback image - ALWAYS render but conditionally show */}
        <img 
          src={fallbackImage} 
          alt="Profile Background Fallback"
          className={`w-full h-full object-cover object-center transition-opacity duration-300 ${imageError || !profileImageUrl || !imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{position: 'absolute', zIndex: 5}}
          onLoad={() => {
            console.log("Fallback image loaded in DOM");
            setFallbackLoaded(true);
          }}
          onError={() => {
            console.error("Critical: Fallback image failed to load in DOM");
          }}
        />
        
        {/* Main image - only try to load if we have a non-fallback URL */}
        {profileImageUrl && profileImageUrl !== fallbackImage && (
          <img 
            src={profileImageUrl} 
            alt="Profile Background" 
            className={`w-full h-full object-cover object-center transition-opacity duration-300 ${imageError ? 'opacity-0' : 'opacity-100'}`}
            style={{position: 'absolute', zIndex: 4}}
            onLoad={() => {
              console.log("Main image loaded successfully in DOM:", profileImageUrl);
              setImageLoaded(true);
              setImageError(false);
            }}
            onError={() => {
              console.error("Main image failed to load in DOM:", profileImageUrl);
              setImageError(true);
            }}
          />
        )}
      </div>
    </>
  );
};

export default ProfileBackground;
