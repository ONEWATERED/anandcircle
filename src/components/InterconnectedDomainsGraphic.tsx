
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, HeartPulse, Droplet, Brain, GraduationCap } from 'lucide-react';

// Domain definitions with updated content for the fifth domain
const domains = [
  {
    id: 'family',
    title: 'Family & Nuclear Values',
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
    x: -0.8,
    y: 0.5,
  },
  {
    id: 'ai',
    title: 'AI & Data Innovation',
    icon: Brain,
    color: 'rgb(16, 185, 129)', // emerald-500
    description: 'Transforming organizations through innovative technology',
    x: 0.8,
    y: 0.5,
  },
  {
    id: 'workforce',
    title: 'Workforce Development',
    icon: GraduationCap,
    color: 'rgb(168, 85, 247)', // purple-500
    description: 'Coaching, mentoring & training for growth',
    x: 0,
    y: 0,
  },
];

const InterconnectedDomainsGraphic = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
        setHeight(containerRef.current.offsetHeight);
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate node positions based on container dimensions
  const getNodePosition = (x: number, y: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35; // Radius for the circle
    
    return {
      x: centerX + x * radius,
      y: centerY + y * radius,
    };
  };

  // Draw connection lines between nodes
  const renderConnections = () => {
    if (!animationComplete) return null;
    
    return domains.map((domain, i) => {
      // Connect to all other nodes
      return domains.slice(i + 1).map((target, j) => {
        const source = getNodePosition(domain.x, domain.y);
        const dest = getNodePosition(target.x, target.y);
        
        // This will give a unique key for each connection
        const key = `${domain.id}-${target.id}`;
        
        const isActive = activeNode === domain.id || activeNode === target.id;
        
        return (
          <motion.path
            key={key}
            d={`M ${source.x} ${source.y} L ${dest.x} ${dest.y}`}
            stroke={isActive ? "rgba(99, 102, 241, 0.8)" : "rgba(209, 213, 219, 0.5)"}
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
              delay: 0.5 + (i * 0.1) + (j * 0.1),
              ease: "easeInOut"
            }}
          />
        );
      });
    }).flat();
  };

  // Main component animation sequence
  useEffect(() => {
    // Allow time for initial animations before showing connections
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[500px] relative opacity-0 animate-fade-up"
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
          width: 120, 
          height: 120,
          transform: 'translate(-50%, -50%)'
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
      >
        <div className="text-center">
          <div className="text-2xl font-bold tracking-tight">ANAND</div>
          <div className="text-xs font-medium mt-1">The Circle</div>
        </div>
      </motion.div>
      
      {/* Domain Nodes */}
      {domains.map((domain, index) => {
        // Skip the central node as we've created it above
        if (domain.id === 'workforce') return null;
        
        const position = getNodePosition(domain.x, domain.y);
        const Icon = domain.icon;
        
        return (
          <motion.div
            key={domain.id}
            className="absolute flex flex-col items-center"
            style={{ 
              top: position.y, 
              left: position.x, 
              width: 100,
              height: 100,
              marginLeft: -50,
              marginTop: -50,
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
          >
            <motion.div 
              className="cursor-pointer w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-2 transition-transform"
              style={{ 
                backgroundColor: domain.color,
                border: `2px solid ${activeNode === domain.id ? 'white' : 'transparent'}`
              }}
              whileHover={{ scale: 1.1 }}
              animate={{ 
                scale: activeNode === domain.id ? 1.1 : 1,
                boxShadow: activeNode === domain.id ? '0 0 15px rgba(255,255,255,0.5)' : '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              <Icon size={30} color="white" />
            </motion.div>
            <motion.div 
              className="text-center w-32"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                scale: activeNode === domain.id ? 1.05 : 1
              }}
              transition={{ delay: 0.5 + (index * 0.1) }}
            >
              <div className="font-semibold text-sm">{domain.title}</div>
              {activeNode === domain.id && (
                <motion.div 
                  className="text-xs text-muted-foreground mt-1"
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
    </div>
  );
};

export default InterconnectedDomainsGraphic;
