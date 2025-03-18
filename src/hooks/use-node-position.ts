
import { useEffect, useState, useRef } from 'react';
import { useIsMobile } from './use-mobile';

export function useNodePositioning() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const isMobile = useIsMobile();
  const [isIOS, setIsIOS] = useState(false);

  // Detect iOS devices for special handling
  useEffect(() => {
    const checkIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      setIsIOS(/iphone|ipad|ipod/.test(userAgent));
    };
    
    checkIOS();
  }, []);

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
    
    // Force multiple updates after mounting to ensure proper rendering on all devices
    const timer1 = setTimeout(updateDimensions, 100);
    const timer2 = setTimeout(updateDimensions, 500);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Calculate responsive sizes based on screen dimensions
  const getResponsiveSizes = () => {
    // Determine appropriate container height based on screen size
    const getContainerHeight = () => {
      if (isMobile) {
        if (width < 350) return 320; // Smaller height on very small screens
        if (width < 500) return 360; // Slightly larger for small/medium screens
        return 380; // Default mobile height
      }
      return 600; // Desktop height
    };
    
    // Center circle size - slightly larger on iOS for better visibility
    const getCenterSize = () => {
      if (isMobile) {
        if (isIOS) return width < 350 ? 45 : 55; // Larger on iOS
        if (width < 350) return 40; // Smaller on very small screens
        if (width < 500) return 50;
        return 60; // Default mobile size
      }
      return 120; // Desktop size
    };
    
    // Size of the circular node
    const getNodeIconSize = () => {
      if (isMobile) {
        if (isIOS) return width < 350 ? 30 : 34; // Larger on iOS
        if (width < 350) return 28; // Smaller on very small screens
        if (width < 500) return 32;
        return 38; // Default mobile size
      }
      return 64; // Desktop size
    };
    
    // Node icon container size 
    const getNodeWidth = () => {
      if (isMobile) {
        if (isIOS) return width < 350 ? 38 : 45; // Larger on iOS
        if (width < 350) return 34; // Smaller on very small screens
        if (width < 500) return 40;
        return 45; // Default mobile size
      }
      return 100; // Desktop size
    };
    
    // Size of the icon inside the node
    const getIconSize = () => {
      if (isMobile) {
        if (isIOS) return width < 350 ? 16 : 18; // Larger on iOS
        if (width < 350) return 14; // Smaller on very small screens
        if (width < 500) return 16;
        return 18; // Default mobile size
      }
      return 30; // Desktop size
    };
    
    // Text width class
    const getTextWidth = () => {
      if (isMobile) {
        if (isIOS) return width < 350 ? 'w-16' : 'w-20'; // Wider on iOS for text visibility
        if (width < 350) return 'w-14'; // Narrower on very small screens
        if (width < 400) return 'w-16';
        return 'w-20'; // Default mobile width
      }
      return 'w-32'; // Desktop width
    };

    // Calculate orbit radius based on container dimensions
    const getOrbitRadius = () => {
      if (isMobile) {
        if (isIOS) return Math.min(width, getContainerHeight()) * 0.28; // Tighter orbit on iOS
        if (width < 350) return Math.min(width, getContainerHeight()) * 0.28; // Tighter orbit on very small screens
        if (width < 500) return Math.min(width, getContainerHeight()) * 0.30;
        return Math.min(width, getContainerHeight()) * 0.32; // Default mobile orbit
      }
      return Math.min(width, getContainerHeight()) * 0.40; // Desktop orbit
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
      isIOS, // Make iOS detection available to components
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
