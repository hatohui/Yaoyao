import React from "react";

interface LayoutPreviewProps {
  isAddMode: boolean;
  previewPosition: { x: number; y: number } | null;
  isCreatingSlot: boolean;
}

const LayoutPreview: React.FC<LayoutPreviewProps> = ({
  isAddMode,
  previewPosition,
  isCreatingSlot,
}) => {
  if (!isAddMode || !previewPosition || isCreatingSlot) {
    return null;
  }

  return (
    <div
      className="absolute w-40 h-32 border-2 border-dashed border-blue-500 bg-blue-500/10 rounded-lg pointer-events-none z-40 flex items-center justify-center"
      style={{
        left: previewPosition.x - 80,
        top: previewPosition.y - 64,
      }}
    >
      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
        Click to place
      </span>
    </div>
  );
};

export default LayoutPreview;
