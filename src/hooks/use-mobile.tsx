
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkMobile = () => {
      const mobileCheck = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobileCheck);
    };

    // Initial check
    checkMobile();

    // Set up event listener for window resize
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    mql.addEventListener("change", checkMobile);
    
    // Forces a re-check after a small delay to ensure correct value
    const timer = setTimeout(checkMobile, 100);

    return () => {
      mql.removeEventListener("change", checkMobile);
      clearTimeout(timer);
    }
  }, [])

  // Default to desktop view if isMobile is undefined (during SSR)
  return isMobile === undefined ? false : isMobile;
}

export default useIsMobile
