
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

  // Calculate responsive sizes based on screen dimensions
  const getResponsiveSizes = () => {
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
    
    const getTextWidth = () => {
      if (isMobile) {
        if (width < 350) return 'w-16';
        return 'w-20';
      }
      return 'w-32';
    };
    
    // Calculate the container height based on screen size
    const getContainerHeight = () => {
      if (isMobile) {
        if (width < 350) return 300;
        if (width < 500) return 350;
        return 400;
      }
      return 500;
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
