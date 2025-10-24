import { useCallback } from "react";
import useLayoutMutations from "./useLayoutMutations";

/**
 * Custom hook for managing slot actions (lock, unassign, delete)
 */
export const useSlotActions = (slotId: number, isLocked: boolean) => {
  const { updateLayout, unassignTable, deleteSlot } = useLayoutMutations();

  const handleLock = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      // Toggle lock state in database
      updateLayout.mutate({
        id: String(slotId),
        data: {
          isLocked: !isLocked,
        },
      });
    },
    [updateLayout, slotId, isLocked]
  );

  const handleUnassign = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isLocked) return;
      unassignTable.mutate({ slotId: String(slotId) });
    },
    [unassignTable, slotId, isLocked]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isLocked) return;
      deleteSlot.mutate({ slotId: String(slotId) });
    },
    [deleteSlot, slotId, isLocked]
  );

  const isLoading =
    updateLayout.isPending || unassignTable.isPending || deleteSlot.isPending;

  return {
    handleLock,
    handleUnassign,
    handleDelete,
    isLoading,
  };
};
