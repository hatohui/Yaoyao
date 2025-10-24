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
  // Only show preview when in add mode, NOT creating, and position is available
  if (!isAddMode || isCreatingSlot || !previewPosition) {
    return null;
  }

  return (
    <div
      className="absolute w-40 h-32 border-2 border-dashed border-blue-500 bg-blue-500/10 rounded-lg pointer-events-none z-40 flex items-center justify-center"
      style={{
        left: previewPosition.x - 80, // Center horizontally (half of 160px width)
        top: previewPosition.y - 64, // Center vertically (half of 128px height)
        transform: "translate(0, 0)", // Ensure no additional transforms
      }}
    >
      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
        Click to place
      </span>
    </div>
  );
};

export default LayoutPreview;
