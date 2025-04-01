import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import SocialMediaLinks from './profile/SocialMediaLinks';
import { getUserProfileData } from '@/utils/profileImages';
import { ensureHttpProtocol } from '@/utils/databaseConnection';
import { ArrowRight, Sparkles, Bot, BookOpen, Rocket, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import ResumeButton from './ResumeButton';

const ProfileShowcase = () => {
  const isMobile = useIsMobile();
  const [profileData, setProfileData] = useState({
    profileImageUrl: null,
    socialLinks: {
      linkedIn: 'https://linkedin.com/in/hardeepanand',
      twitter: 'https://twitter.com/hardeepanand',
      youtube: 'https://youtube.com/@hardeepanand',
      spotify: 'https://open.spotify.com/user/hardeepanand',
      anandCircle: '#anand-circle'
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const particlesRef = useRef(null);

  useEffect(() => {
    if (!particlesRef.current) return;

    const createParticles = () => {
      const canvas = particlesRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
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

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const data = await getUserProfileData();
        if (data) {
          setProfileData({
            profileImageUrl: data.photoUrl || null,
            socialLinks: {
              linkedIn: ensureHttpProtocol(data.socialLinks?.linkedIn || profileData.socialLinks.linkedIn),
              twitter: ensureHttpProtocol(data.socialLinks?.twitter || profileData.socialLinks.twitter),
              youtube: ensureHttpProtocol(data.socialLinks?.youtube || profileData.socialLinks.youtube),
              spotify: ensureHttpProtocol(data.socialLinks?.spotify || profileData.socialLinks.spotify),
              anandCircle: data.socialLinks?.anandCircle || profileData.socialLinks.anandCircle
            }
          });
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, []);

  return (
    <section 
      id="home" 
      className="relative w-full min-h-screen overflow-hidden bg-tech-dark"
    >
      <canvas 
        ref={particlesRef} 
        className="absolute inset-0 z-0 opacity-40"
      />
      
      <div className="absolute inset-0 z-0 bg-data-dots mix-blend-screen opacity-5"></div>
      
      <div className="absolute inset-0 z-0 bg-tech-grid opacity-10"></div>
      
      {profileData.profileImageUrl && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-tech-dark/30 via-tech-dark/30 to-tech-dark/50 z-10"></div>
          <img 
            src={profileData.profileImageUrl} 
            alt="Profile Background" 
            className="w-full h-full object-cover object-center opacity-90"
          />
        </div>
      )}
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center py-20 md:py-24">
          <motion.div 
            className="w-full max-w-3xl space-y-6 md:space-y-8 text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white text-gradient-tech">
              Hardeep Anand
            </h1>
            
            <h2 className="text-xl md:text-3xl font-medium tracking-tight text-gray-300">
              <span className="text-[#0EA5E9]">Tech</span> • <span className="text-[#9333EA]">Health</span> • <span className="text-[#DB2777]">Community</span>
            </h2>
            
            <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto">
              Executive. Innovator. Mentor. Bringing data-driven solutions to public service, 
              health challenges, and community needs.
            </p>
            
            <motion.div 
              className="flex flex-wrap gap-4 pt-6 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Button 
                size={isMobile ? "default" : "lg"} 
                variant="default"
                className="bg-gradient-tech text-white font-medium rounded-xl shadow-neon-cyan hover:shadow-lg hover:scale-105 transition-all duration-300"
                onClick={() => {
                  document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                My Story
              </Button>
              
              <Button 
                size={isMobile ? "default" : "lg"} 
                variant="default"
                className="bg-gradient-purple-magenta text-white font-medium rounded-xl shadow-neon-purple hover:shadow-lg hover:scale-105 transition-all duration-300"
                onClick={() => {
                  document.getElementById('passions')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Rocket className="mr-2 h-5 w-5" />
                Areas of Interest
              </Button>
              
              <ResumeButton 
                size={isMobile ? "default" : "lg"}
                className="bg-gradient-magenta-gold text-white font-medium rounded-xl shadow-neon-magenta hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <FileText className="mr-2 h-5 w-5" />
                Resume
              </ResumeButton>
            </motion.div>
            
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button 
                size={isMobile ? "default" : "lg"} 
                variant="default"
                onClick={() => document.getElementById('digital-avatar')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-[#0EA5E9] to-[#9333EA] text-white font-medium shadow-neon-purple rounded-xl px-6 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Bot className="mr-2 h-5 w-5" />
                <span>Chat with my AI-powered Digital Twin</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex-1 space-y-6 text-center text-white max-w-5xl mx-auto mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="h-1 w-20 md:w-32 bg-gradient-tech mx-auto my-6 rounded-full"></div>
            
            <p className="text-gray-100 text-lg max-w-2xl mx-auto">
              Connect with me on social platforms to explore collaborations and stay updated on my latest initiatives.
            </p>
            
            {!isLoading && (
              <div className="pt-6">
                <SocialMediaLinks 
                  links={profileData.socialLinks} 
                  iconColor="text-white" 
                  hoverColor="hover:text-[#0EA5E9]" 
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <a 
          href="#story" 
          className="flex flex-col items-center text-gray-400 hover:text-white transition-colors"
        >
          <span className="text-xs md:text-sm font-medium mb-2 tracking-wider">EXPLORE</span>
          <div className="w-10 h-10 rounded-full border border-[#0EA5E9]/30 flex items-center justify-center animate-bounce bg-[#0EA5E9]/20 shadow-neon-cyan">
            <ArrowRight className="h-5 w-5 rotate-90" />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default ProfileShowcase;
