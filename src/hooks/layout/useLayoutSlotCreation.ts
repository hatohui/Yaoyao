import { useState } from "react";
import useLayoutMutations from "./useLayoutMutations";
import { PostLayoutRequest } from "@/types/api/layout/POST";

export const useLayoutSlotCreation = () => {
  const [isCreatingSlot, setIsCreatingSlot] = useState(false);
  const [previewPosition, setPreviewPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const { createSlot } = useLayoutMutations();

  const handleLayoutClick = (
    e: React.MouseEvent<HTMLDivElement>,
    isAddMode: boolean
  ) => {
    if (isCreatingSlot) return; // Prevent creating multiple slots

    // Only create slot if in add mode
    if (!isAddMode) return;

    // Don't create if clicking on existing slots
    if ((e.target as HTMLElement).closest("[data-slot-id]")) {
      return;
    }

    const dragZone = e.currentTarget;
    const rect = dragZone.getBoundingClientRect();

    // Calculate position relative to the DragZone
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert to percentage for responsive positioning
    const positionX = (x / rect.width) * 100;
    const positionY = (y / rect.height) * 100;

    setIsCreatingSlot(true);
    createSlot.mutate(
      {
        positionX,
        positionY,
        zone: 1,
        tableId: null,
      } as PostLayoutRequest,
      {
        onSettled: () => {
          setIsCreatingSlot(false);
        },
        onError: (error) => {
          console.error("Failed to create slot:", error);
        },
      }
    );
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    isAddMode: boolean
  ) => {
    if (!isAddMode || isCreatingSlot) {
      setPreviewPosition(null);
      return;
    }

    const dragZone = e.currentTarget;
    const rect = dragZone.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPreviewPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPreviewPosition(null);
  };

  return {
    isCreatingSlot,
    previewPosition,
    handleLayoutClick,
    handleMouseMove,
    handleMouseLeave,
  };
};
