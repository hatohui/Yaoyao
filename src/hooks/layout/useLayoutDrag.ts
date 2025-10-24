import { useState } from "react";
import { GetLayouts } from "@/types/api/layout/GET";
import useLayoutMutations from "./useLayoutMutations";

export const useLayoutDrag = (slots: GetLayouts | undefined) => {
  const [draggedTableId, setDraggedTableId] = useState<string | null>(null);
  const [dragSource, setDragSource] = useState<
    "unassigned" | "assigned" | null
  >(null);
  const [draggedSlotId, setDraggedSlotId] = useState<number | null>(null);

  const { assignTableToSlot, swapTables, unassignTable } = useLayoutMutations();

  const handleDragStart = (
    tableId: string,
    source: "unassigned" | "assigned"
  ) => {
    setDraggedTableId(tableId);
    setDragSource(source);

    // If dragging from assigned, find which slot it's in
    if (source === "assigned" && slots) {
      const slot = slots.find((s) => s.tableId === tableId);
      if (slot) {
        setDraggedSlotId(slot.id);
      }
    }
  };

  const handleDragEnd = () => {
    setDraggedTableId(null);
    setDragSource(null);
    setDraggedSlotId(null);
  };

  const handleSlotDrop = (targetSlotId: number) => {
    if (!draggedTableId) return;

    const targetSlot = slots?.find((s) => s.id === targetSlotId);
    if (!targetSlot) return;

    if (dragSource === "unassigned") {
      // Assign table to empty slot or swap if occupied
      if (targetSlot.tableId) {
        // Can't assign to occupied slot from sidebar - would need swap UI
        console.log("Cannot assign to occupied slot");
        return;
      }
      assignTableToSlot.mutate({
        slotId: String(targetSlotId),
        tableId: draggedTableId,
      });
    } else if (dragSource === "assigned" && draggedSlotId !== null) {
      // Swap tables between slots
      if (draggedSlotId === targetSlotId) {
        // Same slot, do nothing
        return;
      }

      if (targetSlot.tableId) {
        // Swap with occupied slot
        swapTables.mutate({
          slot1Id: String(draggedSlotId),
          slot2Id: String(targetSlotId),
        });
      } else {
        // Move to empty slot
        assignTableToSlot.mutate({
          slotId: String(targetSlotId),
          tableId: draggedTableId,
        });
        unassignTable.mutate({ slotId: String(draggedSlotId) });
      }
    }

    handleDragEnd();
  };

  const handleUnassignDrop = () => {
    if (!draggedTableId || !draggedSlotId || dragSource !== "assigned") return;

    unassignTable.mutate({ slotId: String(draggedSlotId) });
    handleDragEnd();
  };

  return {
    draggedTableId,
    dragSource,
    draggedSlotId,
    handleDragStart,
    handleDragEnd,
    handleSlotDrop,
    handleUnassignDrop,
  };
};
