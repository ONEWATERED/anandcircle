
import React, { useEffect, useRef } from 'react';

const BackgroundParticles: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      
      ctx.scale(pixelRatio, pixelRatio);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Particle system configuration
    const particleCount = isMobile ? 30 : 50;
    const particles: Particle[] = [];
    const colors = ['#0EA5E9', '#9333EA', '#DB2777'];
    const connectionDistance = isMobile ? 100 : 150;
    const pixelRatio = window.devicePixelRatio || 1;
    
    class Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      alpha: number;
      
      constructor() {
        this.x = Math.random() * canvas.width / pixelRatio;
        this.y = Math.random() * canvas.height / pixelRatio;
        this.radius = Math.random() * 1.5 + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.alpha = Math.random() * 0.5 + 0.1;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width / pixelRatio) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height / pixelRatio) this.vy *= -1;
      }
      
      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Draw connections
      ctx.lineWidth = 0.3;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, particles[i].color.replace(')', `, ${opacity})`).replace('rgb', 'rgba'));
            gradient.addColorStop(1, particles[j].color.replace(')', `, ${opacity})`).replace('rgb', 'rgba'));
            
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isMobile]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0 opacity-30"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default BackgroundParticles;
