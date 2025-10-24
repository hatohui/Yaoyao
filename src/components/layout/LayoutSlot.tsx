"use client";

import React, { useEffect, useRef } from "react";
import { TableObject } from "@/types/models/table";
import DragObject from "./DragAndDropKit/DragControls/DragObject";
import { useSlotActions } from "@/hooks/layout/useSlotActions";
import { useSlotDrag } from "@/hooks/layout/useSlotDrag";
import { useSlotHover } from "@/hooks/layout/useSlotHover";
import {
  getSlotColorClasses,
  getLockedStyleClasses,
  hasAssignedTable,
  isTableLinked,
} from "@/utils/layout/slotUtils";
import SlotLoadingOverlay from "./SlotLoadingOverlay";
import SlotControls from "./SlotControls";
import SlotContent from "./SlotContent";

type LayoutSlotProps = {
  slot: TableObject;
  onDrop?: (slotId: number) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
};

const LayoutSlot = ({
  slot,
  onDrop,
  onDragStart: onSlotDragStart,
  onDragEnd: onSlotDragEnd,
}: LayoutSlotProps) => {
  const slotRef = useRef<HTMLDivElement>(null);

  // Use slot.isLocked from database
  const isLocked = slot.isLocked || false;

  // Derived state
  const hasTable = hasAssignedTable(slot);
  const isLinked = isTableLinked(slot);

  // Custom hooks
  const { handleLock, handleUnassign, handleDelete, isLoading } =
    useSlotActions(slot.id, isLocked);

  const { isDragOver, onDragEnd, handleDragOver, handleDragLeave, handleDrop } =
    useSlotDrag(slot.id, isLocked, onDrop);

  const { controlsRef, handleMouseEnter, handleMouseLeave, handleTapToggle } =
    useSlotHover();

  // Listen for custom tableDrop event from mobile drag
  useEffect(() => {
    const slotElement = slotRef.current;
    if (!slotElement) return;

    const handleTableDrop = (e: Event) => {
      const customEvent = e as CustomEvent<{ tableId: string; slotId: number }>;
      if (customEvent.detail.slotId === slot.id && onDrop) {
        onDrop(slot.id);
      }
    };

    slotElement.addEventListener("tableDrop", handleTableDrop);
    return () => {
      slotElement.removeEventListener("tableDrop", handleTableDrop);
    };
  }, [slot.id, onDrop]);

  // Style classes
  const slotColorClasses = getSlotColorClasses(hasTable, isLinked, isDragOver);
  const lockedStyleClasses = getLockedStyleClasses(isLocked);

  const handleDragEnd = (id: string, x: number, y: number) => {
    onDragEnd(id, x, y);
    onSlotDragEnd?.();
  };

  const handleSlotClick = (e: React.MouseEvent) => {
    // Only toggle controls, don't prevent propagation for all clicks
    // This allows layout clicks to work normally
    if ("ontouchstart" in window) {
      e.stopPropagation();
      handleTapToggle(e);
    }
  };

  return (
    <DragObject
      id={String(slot.id)}
      x={slot.positionX}
      y={slot.positionY}
      enabled={!isLocked}
      onDragStart={onSlotDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        ref={slotRef}
        data-slot-id={slot.id}
        className={`w-40 h-32 border-2 rounded-xl transition-all duration-300 ease-in-out ${slotColorClasses} ${lockedStyleClasses} hover:shadow-xl hover:scale-105 relative ${
          isDragOver ? "ring-4 ring-blue-500 ring-offset-2" : ""
        } ${isLocked ? "cursor-not-allowed" : "cursor-move"}`}
        onClick={handleSlotClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <SlotLoadingOverlay isLoading={isLoading} />

        <SlotControls
          controlsRef={controlsRef}
          isLocked={isLocked}
          hasTable={hasTable}
          onLock={handleLock}
          onUnassign={handleUnassign}
          onDelete={handleDelete}
        />

        <SlotContent slot={slot} hasTable={hasTable} isLinked={isLinked} />
      </div>
    </DragObject>
  );
};

export default LayoutSlot;
