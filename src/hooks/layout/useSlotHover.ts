import { useCallback, useRef } from "react";

/**
 * Custom hook for managing slot hover interactions (controls visibility)
 */
export const useSlotHover = () => {
  const controlsRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.style.display = "flex";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.style.display = "none";
    }
  }, []);

  return {
    controlsRef,
    handleMouseEnter,
    handleMouseLeave,
  };
};
