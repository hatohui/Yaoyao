import { useCallback, useRef, useState } from "react";

/**
 * Custom hook for managing slot hover interactions (controls visibility)
 * Also supports tap/click for mobile devices
 */
export const useSlotHover = () => {
  const controlsRef = useRef<HTMLDivElement>(null);
  const [isControlsVisible, setIsControlsVisible] = useState(false);

  const showControls = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.style.display = "flex";
      setIsControlsVisible(true);
    }
  }, []);

  const hideControls = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.style.display = "none";
      setIsControlsVisible(false);
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    showControls();
  }, [showControls]);

  const handleMouseLeave = useCallback(() => {
    hideControls();
  }, [hideControls]);

  const handleTapToggle = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      if (isControlsVisible) {
        hideControls();
      } else {
        showControls();
      }
    },
    [isControlsVisible, hideControls, showControls]
  );

  return {
    controlsRef,
    isControlsVisible,
    handleMouseEnter,
    handleMouseLeave,
    handleTapToggle,
  };
};
