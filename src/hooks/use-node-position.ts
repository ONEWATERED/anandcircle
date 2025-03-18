
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

  // Calculate responsive sizes based on screen dimensions
  const getResponsiveSizes = () => {
    // Center circle size
    const getCenterSize = () => {
      if (isMobile) {
        if (width < 350) return 50;  // Small screens
        if (width < 500) return 60;  // Medium screens
        return 70;                    // Larger mobile screens
      }
      return 120;                     // Desktop
    };
    
    // Node icon container size 
    const getNodeWidth = () => {
      if (isMobile) {
        if (width < 350) return 40;   // Smaller for very small screens
        if (width < 500) return 45;   // Smaller for small screens
        return 55;                    // Medium screens
      }
      return 100;                     // Desktop
    };
    
    // Size of the circular node
    const getNodeIconSize = () => {
      if (isMobile) {
        if (width < 350) return 24;   // Smaller for very small screens
        if (width < 500) return 32;   // Smaller for small screens
        return 36;                    // Medium screens
      }
      return 64;                      // Desktop
    };
    
    // Size of the icon inside the node
    const getIconSize = () => {
      if (isMobile) {
        if (width < 350) return 14;   // Smaller for very small screens
        if (width < 500) return 16;   // Smaller for small screens
        return 18;                    // Medium screens
      }
      return 30;                      // Desktop
    };
    
    // Text width class
    const getTextWidth = () => {
      if (isMobile) {
        if (width < 350) return 'w-16'; // Wider for better readability
        if (width < 400) return 'w-20'; // Wider for small screens
        return 'w-24';                  // Wider for medium screens
      }
      return 'w-32';                    // Desktop
    };
    
    // Calculate a consistent container height for better proportions
    const getContainerHeight = () => {
      if (isMobile) {
        if (width < 350) return 300;    // Small screens
        if (width < 500) return 350;    // Medium screens
        return 400;                     // Larger mobile screens
      }
      return 550;                       // Desktop
    };

    return {
      centerSize: getCenterSize(),
      nodeSize: 12, // Fixed size for consistency
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
    ...getResponsiveSizes(),
    isMobile,
  };
}
