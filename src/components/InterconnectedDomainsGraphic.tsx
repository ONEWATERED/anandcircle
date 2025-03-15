
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, HeartPulse, Droplet, Brain, GraduationCap } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Updated domain definitions with the correct five domains
const domains = [
  {
    id: 'family',
    title: 'Nuclear Families',
    icon: Users,
    color: 'rgb(244, 114, 182)', // rose-500
    description: 'Strong families as the cornerstone of society',
    x: -0.8, // Position coordinates for layout
    y: -0.5,
  },
  {
    id: 'health',
    title: 'Health & Wellness',
    icon: HeartPulse,
    color: 'rgb(59, 130, 246)', // blue-500
    description: 'Data-driven approaches to optimize wellness',
    x: 0.8,
    y: -0.5,
  },
  {
    id: 'water',
    title: 'One Water',
    icon: Droplet,
    color: 'rgb(6, 182, 212)', // cyan-500
    description: 'Integrating technology with environmental sustainability',
    x: 0,
    y: 0.9,
  },
  {
    id: 'ai',
    title: 'AI & Data Innovation',
    icon: Brain,
    color: 'rgb(16, 185, 129)', // emerald-500
    description: 'Transforming organizations through innovative technology',
    x: -0.8,
    y: 0.5,
  },
  {
    id: 'mentoring',
    title: 'Coaching & Mentoring',
    icon: GraduationCap,
    color: 'rgb(168, 85, 247)', // purple-500
    description: 'Unlocking potential through guidance and development',
    x: 0.8,
    y: 0.5,
  },
];

const InterconnectedDomainsGraphic = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const isMobile = useIsMobile();

  // Update dimensions on resize and on mount
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
        setHeight(containerRef.current.offsetHeight);
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Force another update after a slight delay to ensure proper rendering
    const timer = setTimeout(updateDimensions, 100);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  // Adjust layout based on screen size
  const getNodePosition = (x: number, y: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Improved mobile responsiveness with better scaling factors
    const scale = Math.min(width, height) / (isMobile ? 500 : 800);
    
    // Adaptive radius based on container dimensions and device type
    let radius;
    if (isMobile) {
      // Smaller radius for mobile with progressive scaling
      if (width < 350) {
        radius = Math.min(width, height) * 0.22;
      } else if (width < 500) {
        radius = Math.min(width, height) * 0.25;
      } else {
        radius = Math.min(width, height) * 0.28;
      }
    } else {
      // Larger radius for desktop
      radius = Math.min(width, height) * 0.35;
    }
    
    // Ensure nodes don't get too close to the edges on small screens
    const maxRadius = Math.min(
      centerX - 50,  // Keep 50px from left/right edges
      centerY - 50   // Keep 50px from top/bottom edges
    );
    
    radius = Math.min(radius, maxRadius);
    
    return {
      x: centerX + x * radius,
      y: centerY + y * radius,
    };
  };

  // Draw connection lines between nodes
  const renderConnections = () => {
    if (!animationComplete || width === 0) return null;
    
    const connections: JSX.Element[] = [];

    // Connect each node to the center (ANAND Circle)
    domains.forEach((domain, i) => {
      const source = getNodePosition(domain.x, domain.y);
      const dest = getNodePosition(0, 0); // Center point
      
      const key = `${domain.id}-center`;
      const isActive = activeNode === domain.id;
      
      connections.push(
        <motion.path
          key={key}
          d={`M ${source.x} ${source.y} L ${dest.x} ${dest.y}`}
          stroke={isActive ? "rgba(99, 102, 241, 0.9)" : "rgba(209, 213, 219, 0.5)"}
          strokeWidth={isActive ? 3 : 1.5}
          strokeDasharray="5,5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: isActive ? 1 : 0.7,
            strokeWidth: isActive ? 3 : 1.5
          }}
          transition={{ 
            duration: 1.5, 
            delay: 0.5 + (i * 0.1),
            ease: "easeInOut"
          }}
        />
      );
    });

    // Make connections between nodes more selective on mobile
    if (!isMobile) {
      // Connect all nodes on desktop for a full web
      domains.forEach((domain, i) => {
        domains.slice(i + 1).forEach((target, j) => {
          const source = getNodePosition(domain.x, domain.y);
          const dest = getNodePosition(target.x, target.y);
          
          const key = `${domain.id}-${target.id}`;
          const isActive = activeNode === domain.id || activeNode === target.id;
          
          connections.push(
            <motion.path
              key={key}
              d={`M ${source.x} ${source.y} L ${dest.x} ${dest.y}`}
              stroke={isActive ? "rgba(99, 102, 241, 0.8)" : "rgba(209, 213, 219, 0.3)"}
              strokeWidth={isActive ? 2 : 1}
              strokeDasharray="3,3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: isActive ? 1 : 0.5,
                strokeWidth: isActive ? 2 : 1
              }}
              transition={{ 
                duration: 1.5, 
                delay: 0.7 + (i * 0.1) + (j * 0.1),
                ease: "easeInOut"
              }}
            />
          );
        });
      });
    } else {
      // On mobile, only connect adjacent nodes to reduce visual clutter
      for (let i = 0; i < domains.length; i++) {
        const domain = domains[i];
        const nextDomain = domains[(i + 1) % domains.length];
        
        const source = getNodePosition(domain.x, domain.y);
        const dest = getNodePosition(nextDomain.x, nextDomain.y);
        
        const key = `${domain.id}-${nextDomain.id}`;
        const isActive = activeNode === domain.id || activeNode === nextDomain.id;
        
        connections.push(
          <motion.path
            key={key}
            d={`M ${source.x} ${source.y} L ${dest.x} ${dest.y}`}
            stroke={isActive ? "rgba(99, 102, 241, 0.8)" : "rgba(209, 213, 219, 0.3)"}
            strokeWidth={isActive ? 2 : 1}
            strokeDasharray="3,3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: isActive ? 1 : 0.5,
              strokeWidth: isActive ? 2 : 1
            }}
            transition={{ 
              duration: 1.5, 
              delay: 0.7 + (i * 0.1),
              ease: "easeInOut"
            }}
          />
        );
      }
    }

    return connections;
  };

  // Main component animation sequence
  useEffect(() => {
    // Allow time for initial animations before showing connections
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Responsive sizing based on screen size
  const getCenterSize = () => {
    if (isMobile) {
      if (width < 350) return 60;  // Extra small screens
      if (width < 500) return 80;  // Small screens
      return 90;                   // Medium screens
    }
    return 120;                    // Desktop
  };
  
  const getNodeSize = () => {
    if (isMobile) {
      if (width < 350) return 12;  // Extra small screens
      return 14;                   // Other mobile screens
    }
    return 16;                     // Desktop
  };
  
  const getIconSize = () => {
    if (isMobile) {
      if (width < 350) return 18;  // Extra small screens
      if (width < 500) return 22;  // Small screens
      return 24;                   // Medium screens
    }
    return 30;                     // Desktop
  };
  
  const getNodeWidth = () => {
    if (isMobile) {
      if (width < 350) return 60;  // Extra small screens
      if (width < 500) return 70;  // Small screens
      return 80;                   // Medium screens
    }
    return 100;                    // Desktop
  };
  
  const getNodeIconSize = () => {
    if (isMobile) {
      if (width < 350) return 40;  // Extra small screens
      if (width < 500) return 48;  // Small screens
      return 52;                   // Medium screens
    }
    return 64;                     // Desktop
  };
  
  // Get calculated sizes
  const centerSize = getCenterSize();
  const nodeSize = getNodeSize();
  const iconSize = getIconSize();
  const textWidth = isMobile ? (width < 350 ? 'w-16' : 'w-20') : 'w-32';
  const nodeWidth = getNodeWidth();
  const nodeIconSize = getNodeIconSize();
  
  // Calculate the container height based on screen size
  const containerHeight = isMobile 
    ? (width < 350 ? 300 : (width < 500 ? 350 : 400)) 
    : 500;

  return (
    <div 
      ref={containerRef} 
      className="w-full relative opacity-0 animate-fade-up"
      style={{ 
        height: containerHeight,
        animationDelay: '200ms', 
        animationFillMode: 'forwards' 
      }}
    >
      {/* SVG for connections */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {renderConnections()}
      </svg>
      
      {/* The Circle for ANAND */}
      <motion.div 
        className="absolute z-10 rounded-full bg-gradient-to-r from-primary/80 to-accent/80 flex items-center justify-center text-white shadow-lg"
        style={{ 
          top: '50%', 
          left: '50%', 
          width: centerSize, 
          height: centerSize,
          transform: 'translate(-50%, -50%)'
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' }}
      >
        <div className="text-center">
          <div className={`${width < 350 ? 'text-xs' : 'text-sm'} md:text-xl font-bold tracking-tight`}>HARDEEP</div>
          <div className={`${width < 350 ? 'text-2xs' : 'text-xs'} font-medium mt-1`}>ANAND Circle</div>
        </div>
      </motion.div>
      
      {/* Domain Nodes */}
      {domains.map((domain, index) => {
        const position = getNodePosition(domain.x, domain.y);
        const Icon = domain.icon;
        
        return (
          <motion.div
            key={domain.id}
            className="absolute flex flex-col items-center"
            style={{ 
              top: position.y, 
              left: position.x, 
              width: nodeWidth,
              height: nodeWidth,
              marginLeft: -nodeWidth/2,
              marginTop: -nodeWidth/2,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: 0.3 + (index * 0.1), 
              duration: 0.6, 
              type: "spring" 
            }}
            onMouseEnter={() => setActiveNode(domain.id)}
            onMouseLeave={() => setActiveNode(null)}
            onTouchStart={() => setActiveNode(domain.id === activeNode ? null : domain.id)}
          >
            <motion.div 
              className="cursor-pointer rounded-full flex items-center justify-center shadow-lg mb-2 transition-transform"
              style={{ 
                backgroundColor: domain.color,
                border: `2px solid ${activeNode === domain.id ? 'white' : 'transparent'}`,
                width: nodeIconSize,
                height: nodeIconSize,
              }}
              whileHover={{ scale: 1.1 }}
              animate={{ 
                scale: activeNode === domain.id ? 1.1 : 1,
                boxShadow: activeNode === domain.id ? '0 0 15px rgba(255,255,255,0.5)' : '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              <Icon size={iconSize} color="white" />
            </motion.div>
            <motion.div 
              className={`text-center ${textWidth} mx-auto`}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                scale: activeNode === domain.id ? 1.05 : 1
              }}
              transition={{ delay: 0.5 + (index * 0.1) }}
            >
              <div className={`font-semibold ${width < 350 ? 'text-2xs' : 'text-xs'} md:text-sm`}>
                {domain.title}
              </div>
              {activeNode === domain.id && (
                <motion.div 
                  className={`${width < 350 ? 'text-3xs' : 'text-2xs'} md:text-xs text-muted-foreground mt-1`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {domain.description}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        );
      })}
      
      {/* Reduced number of particles on mobile */}
      {[...Array(isMobile ? 5 : 10)].map((_, i) => (
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
      
      {/* Pulsing ring around center - smaller on mobile */}
      <motion.div
        className="absolute rounded-full border-2 border-primary/20"
        style={{ 
          top: '50%', 
          left: '50%', 
          width: centerSize + (isMobile ? 10 : 20), 
          height: centerSize + (isMobile ? 10 : 20),
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
    </div>
  );
};

export default InterconnectedDomainsGraphic;
