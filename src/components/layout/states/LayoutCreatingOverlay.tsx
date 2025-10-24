import React from "react";

interface LayoutCreatingOverlayProps {
  isCreatingSlot: boolean;
}

const LayoutCreatingOverlay: React.FC<LayoutCreatingOverlayProps> = ({
  isCreatingSlot,
}) => {
  if (!isCreatingSlot) {
    return null;
  }

  return (
    <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center pointer-events-none z-50">
      <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-main"></div>
          <span className="text-sm text-slate-700 dark:text-slate-300">
            Creating slot...
          </span>
        </div>
      </div>
    </div>
  );
};

export default LayoutCreatingOverlay;
