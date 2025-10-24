import { useCallback, useState } from "react";
import useLayoutMutations from "./useLayoutMutations";

/**
 * Custom hook for managing slot drag behavior and drop interactions
 */
export const useSlotDrag = (
  slotId: number,
  isLocked: boolean,
  onDrop?: (slotId: number) => void
) => {
  const { updateLayout } = useLayoutMutations();
  const [isDragOver, setIsDragOver] = useState(false);

  const onDragEnd = useCallback(
    (id: string, x: number, y: number) => {
      if (!isLocked) {
        updateLayout.mutate({
          id: id,
          data: {
            positionX: x,
            positionY: y,
          },
        });
      }
    },
    [updateLayout, isLocked]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isLocked) {
        setIsDragOver(true);
      }
    },
    [isLocked]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      if (onDrop && !isLocked) {
        onDrop(slotId);
      }
    },
    [onDrop, slotId, isLocked]
  );

  return {
    isDragOver,
    onDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
