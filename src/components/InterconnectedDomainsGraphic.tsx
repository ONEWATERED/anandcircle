
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
    
    // Make radius more responsive - smaller on mobile and vary based on container size
    const minRadius = Math.min(width, height);
    const radius = isMobile 
      ? minRadius * (width < 350 ? 0.25 : 0.28) // Even smaller radius for very small screens
      : minRadius * 0.35;
    
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

    // Connect nodes to each other in a web pattern
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

  // Define node sizes based on mobile state
  const centerSize = isMobile ? (width < 350 ? 80 : 100) : 120;
  const nodeSize = isMobile ? 14 : 16;
  const iconSize = isMobile ? (width < 350 ? 20 : 24) : 30;
  const textWidth = isMobile ? 'w-20' : 'w-32';
  const nodeWidth = isMobile ? (width < 350 ? 70 : 80) : 100;
  const nodeIconSize = isMobile ? (width < 350 ? 48 : 56) : 64;

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[400px] md:h-[500px] relative opacity-0 animate-fade-up"
      style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
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
          <div className="text-sm md:text-xl font-bold tracking-tight">HARDEEP</div>
          <div className="text-xs font-medium mt-1">ANAND Circle</div>
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
              <div className="font-semibold text-xs md:text-sm">{domain.title}</div>
              {activeNode === domain.id && (
                <motion.div 
                  className="text-2xs md:text-xs text-muted-foreground mt-1"
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
      
      {/* Floating particles effect */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
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
      
      {/* Pulsing ring around center */}
      <motion.div
        className="absolute rounded-full border-2 border-primary/20"
        style={{ 
          top: '50%', 
          left: '50%', 
          width: centerSize + 20, 
          height: centerSize + 20,
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
