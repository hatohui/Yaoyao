import React from "react";

type SlotLoadingOverlayProps = {
  isLoading: boolean;
};

/**
 * Loading overlay displayed when slot operations are in progress
 */
const SlotLoadingOverlay = ({ isLoading }: SlotLoadingOverlayProps) => {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-20">
      <div className="flex flex-col items-center gap-2">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-main border-t-transparent"></div>
        <span className="text-xs text-slate-600 dark:text-slate-400">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default SlotLoadingOverlay;
