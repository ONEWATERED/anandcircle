import { useEffect, useState, useRef } from 'react';
import { useIsMobile } from './use-mobile';

export function useNodePositioning() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
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

  // Calculate position of a node based on its coordinates
  const getNodePosition = (x: number, y: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Perfect circle radius based on container dimensions
    // We use the same radius for all nodes to create perfect symmetry
    let radius;
    if (isMobile) {
      // Consistent radius for mobile, scaled based on screen size
      if (width < 350) {
        radius = Math.min(width, height) * 0.28; // Small screens
      } else if (width < 500) {
        radius = Math.min(width, height) * 0.32; // Medium screens
      } else {
        radius = Math.min(width, height) * 0.36; // Larger mobile screens
      }
    } else {
      // Larger radius for desktop (more space between nodes)
      radius = Math.min(width, height) * 0.4;
    }
    
    // Ensure nodes don't get too close to the edges
    const maxRadius = Math.min(
      centerX - (isMobile ? 40 : 60),
      centerY - (isMobile ? 40 : 60)
    );
    
    radius = Math.min(radius, maxRadius);
    
    return {
      x: centerX + x * radius,
      y: centerY + y * radius,
    };
  };

  // Calculate responsive sizes based on screen dimensions
  const getResponsiveSizes = () => {
    // Responsive sizing based on screen size
    const getCenterSize = () => {
      if (isMobile) {
        if (width < 350) return 60;  // Small screens
        if (width < 500) return 70;  // Medium screens
        return 80;                    // Larger mobile screens
      }
      return 120;                     // Desktop
    };
    
    const getNodeSize = () => {
      if (isMobile) {
        if (width < 350) return 10;  // Smaller for very small screens
        return 12;                   // Other mobile screens
      }
      return 16;                     // Desktop
    };
    
    const getIconSize = () => {
      if (isMobile) {
        if (width < 350) return 16;  // Smaller for very small screens
        if (width < 500) return 20;  // Smaller for small screens
        return 22;                   // Medium screens
      }
      return 30;                     // Desktop
    };
    
    const getNodeWidth = () => {
      if (isMobile) {
        if (width < 350) return 42;  // Smaller for very small screens
        if (width < 500) return 55;  // Smaller for small screens
        return 65;                   // Medium screens
      }
      return 100;                    // Desktop
    };
    
    const getNodeIconSize = () => {
      if (isMobile) {
        if (width < 350) return 28;  // Smaller for very small screens
        if (width < 500) return 36;  // Smaller for small screens
        return 44;                   // Medium screens
      }
      return 64;                     // Desktop
    };
    
    const getTextWidth = () => {
      if (isMobile) {
        if (width < 350) return 'w-12'; // Narrower for very small screens
        if (width < 400) return 'w-14'; // Narrower for small screens
        return 'w-16';
      }
      return 'w-32';
    };
    
    // Calculate a consistent container height for better symmetry
    const getContainerHeight = () => {
      // Make height closer to width for better circle proportions
      if (isMobile) {
        if (width < 350) return 280;  // Small screens
        if (width < 500) return 320;  // Medium screens
        return 380;                   // Larger mobile screens
      }
      return 550;                     // Desktop
    };

    return {
      centerSize: getCenterSize(),
      nodeSize: getNodeSize(),
      iconSize: getIconSize(),
      nodeWidth: getNodeWidth(),
      nodeIconSize: getNodeIconSize(),
      textWidth: getTextWidth(),
      containerHeight: getContainerHeight(),
    };
  };

  return {
    containerRef,
    width,
    height,
    getNodePosition,
    ...getResponsiveSizes(),
    isMobile,
  };
}
