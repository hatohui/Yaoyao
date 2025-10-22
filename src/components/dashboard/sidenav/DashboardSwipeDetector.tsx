import React from "react";
import { FiChevronRight } from "react-icons/fi";

interface DashboardSwipeDetectorProps {
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  isOpen: boolean;
}

export default function DashboardSwipeDetector({
  onSwipeRight,
  onSwipeLeft,
  isOpen,
}: DashboardSwipeDetectorProps) {
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    (e.currentTarget as HTMLElement).dataset.touchStartX = String(
      touch.clientX
    );
    (e.currentTarget as HTMLElement).dataset.touchStartY = String(
      touch.clientY
    );
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const startX = Number((e.currentTarget as HTMLElement).dataset.touchStartX);
    const startY = Number((e.currentTarget as HTMLElement).dataset.touchStartY);
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    if (isNaN(startX) || isNaN(startY)) return;

    const deltaX = endX - startX;
    const deltaY = Math.abs(endY - startY);

    const minSwipeDistance = 30;

    if (
      Math.abs(deltaX) > minSwipeDistance &&
      Math.abs(deltaX) > deltaY * 1.5
    ) {
      if (deltaX > 0) {
        if (!isOpen && startX < 80) {
          onSwipeRight();
        }
      } else {
        if (isOpen) {
          onSwipeLeft();
        }
      }
    }
  };

  return (
    <>
      {/* Swipe area when closed - only left edge */}
      {!isOpen && (
        <div
          className="fixed left-0 top-0 h-screen w-16 z-20 lg:hidden flex items-center pointer-events-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-label="Swipe right to open menu"
        >
          {/* Visual indicator */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-slate-700/80 dark:bg-slate-600/80 rounded-r-lg py-8 px-1 shadow-lg animate-pulse">
            <FiChevronRight className="text-white text-lg" />
          </div>
        </div>
      )}

      {/* Full-screen overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-label="Swipe left or tap to close menu"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={onSwipeLeft}
          />
        </div>
      )}
    </>
  );
}
