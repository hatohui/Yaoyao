"use client";

import React from "react";
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
};

const LayoutSlot = ({ slot, onDrop }: LayoutSlotProps) => {
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

  const { controlsRef, handleMouseEnter, handleMouseLeave } = useSlotHover();

  // Style classes
  const slotColorClasses = getSlotColorClasses(hasTable, isLinked, isDragOver);
  const lockedStyleClasses = getLockedStyleClasses(isLocked);

  return (
    <DragObject
      id={String(slot.id)}
      x={slot.positionX}
      y={slot.positionY}
      enabled={!isLocked}
      onDragEnd={onDragEnd}
    >
      <div
        data-slot-id={slot.id}
        className={`w-40 h-32 border-2 rounded-lg transition-all duration-300 ease-in-out ${slotColorClasses} ${lockedStyleClasses} hover:shadow-lg relative ${
          isDragOver ? "ring-2 ring-blue-500 ring-offset-2" : ""
        } ${isLocked ? "" : "cursor-move"}`}
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
