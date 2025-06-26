import * as React from "react";

// Breakpoint for mobile devices (you can adjust it globally)
const MOBILE_BREAKPOINT = 768;

/**
 * useIsMobile
 * A responsive hook to detect if the current screen is mobile-sized.
 * Returns `true` if the screen width is below the defined breakpoint.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Initial check
    handleResize();

    // Add listener for screen size changes
    mql.addEventListener("change", handleResize);

    // Clean up the event listener on unmount
    return () => {
      mql.removeEventListener("change", handleResize);
    };
  }, []);

  return isMobile;
}
