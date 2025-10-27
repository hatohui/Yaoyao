import { useState } from "react";
import useLayoutMutations from "./useLayoutMutations";
import { PostLayoutRequest } from "@/types/api/layout/POST";
import { DRAG_ZONE_WIDTH, DRAG_ZONE_HEIGHT } from "@/config/app";

export const useLayoutSlotCreation = () => {
  const [isCreatingSlot, setIsCreatingSlot] = useState(false);
  const [previewPosition, setPreviewPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const { createSlot } = useLayoutMutations();

  const handleLayoutClick = (
    e: React.MouseEvent<HTMLDivElement>,
    isAddMode: boolean,
    zone: number
  ) => {
    if (!isAddMode || isCreatingSlot) return;
    // Don't create if clicking on existing slots
    const target = e.target as HTMLElement;
    if (target.closest("[data-slot-id]")) {
      return;
    }

    const dragZoneWrapper = e.currentTarget.querySelector(
      '[id="layout"]'
    ) as HTMLElement;
    if (!dragZoneWrapper) {
      console.error("DragZone element not found");
      return;
    }

    // Find the inner scaled container (the actual coordinate system)
    const innerContainer = dragZoneWrapper.firstElementChild as HTMLElement;
    if (!innerContainer) {
      console.error("Inner container not found");
      return;
    }

    const innerRect = innerContainer.getBoundingClientRect();

    // Calculate position relative to the scaled inner container
    const x = e.clientX - innerRect.left;
    const y = e.clientY - innerRect.top;

    const previewWidth = 160; // w-40 in pixels
    const previewHeight = 128; // h-32 in pixels

    const previewTopLeftX = x - previewWidth / 2;
    const previewTopLeftY = y - previewHeight / 2;

    const positionX = (previewTopLeftX / innerRect.width) * DRAG_ZONE_WIDTH;
    const positionY = (previewTopLeftY / innerRect.height) * DRAG_ZONE_HEIGHT;

    setIsCreatingSlot(true);
    setPreviewPosition(null);

    createSlot.mutate(
      {
        positionX,
        positionY,
        zone: zone ?? 1,
        tableId: null,
      } as PostLayoutRequest,
      {
        onSettled: () => {
          setIsCreatingSlot(false);
        },
        onError: (error) => {
          console.error("Failed to create slot:", error);
          setIsCreatingSlot(false);
        },
      }
    );
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    isAddMode: boolean
  ) => {
    if (!isAddMode || isCreatingSlot) {
      if (previewPosition !== null) {
        setPreviewPosition(null);
      }
      return;
    }

    const target = e.target as HTMLElement;
    if (target.closest("[data-slot-id]")) {
      if (previewPosition !== null) {
        setPreviewPosition(null);
      }
      return;
    }

    // Find the DragZone wrapper element
    const dragZoneWrapper = e.currentTarget.querySelector(
      '[id="layout"]'
    ) as HTMLElement;
    if (!dragZoneWrapper) {
      return;
    }

    // Find the inner scaled container (the actual coordinate system)
    const innerContainer = dragZoneWrapper.firstElementChild as HTMLElement;
    if (!innerContainer) {
      return;
    }

    const innerRect = innerContainer.getBoundingClientRect();

    // Calculate position relative to the scaled inner container
    const x = e.clientX - innerRect.left;
    const y = e.clientY - innerRect.top;

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
