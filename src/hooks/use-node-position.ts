
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
    // Determine appropriate container height based on screen size
    const getContainerHeight = () => {
      if (isMobile) {
        if (width < 350) return 380;
        if (width < 500) return 400;
        return 420;
      }
      return 600;
    };
    
    // Center circle size
    const getCenterSize = () => {
      if (isMobile) {
        if (width < 350) return 60;
        if (width < 500) return 70;
        return 80;
      }
      return 120;
    };
    
    // Size of the circular node
    const getNodeIconSize = () => {
      if (isMobile) {
        if (width < 350) return 32;
        if (width < 500) return 40;
        return 45;
      }
      return 64;
    };
    
    // Node icon container size 
    const getNodeWidth = () => {
      if (isMobile) {
        if (width < 350) return 40;
        if (width < 500) return 45;
        return 55;
      }
      return 100;
    };
    
    // Size of the icon inside the node
    const getIconSize = () => {
      if (isMobile) {
        if (width < 350) return 16;
        if (width < 500) return 20;
        return 22;
      }
      return 30;
    };
    
    // Text width class
    const getTextWidth = () => {
      if (isMobile) {
        if (width < 350) return 'w-20';
        if (width < 400) return 'w-24';
        return 'w-28';
      }
      return 'w-32';
    };

    // Calculate orbit radius based on container dimensions
    const getOrbitRadius = () => {
      if (isMobile) {
        if (width < 350) return Math.min(width, getContainerHeight()) * 0.34;
        if (width < 500) return Math.min(width, getContainerHeight()) * 0.36;
        return Math.min(width, getContainerHeight()) * 0.38;
      }
      return Math.min(width, getContainerHeight()) * 0.40;
    };

    return {
      centerSize: getCenterSize(),
      nodeSize: 12,
      iconSize: getIconSize(),
      nodeWidth: getNodeWidth(),
      nodeIconSize: getNodeIconSize(),
      textWidth: getTextWidth(),
      containerHeight: getContainerHeight(),
      orbitRadius: getOrbitRadius(),
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
