"use client";
"use client";
import { useLayouts } from "./useLayouts";
import { useMemo } from "react";

export const useAssignedTables = () => {
  const { data: layouts, isLoading } = useLayouts();

  const assignedLayouts = useMemo(() => {
    if (!layouts) return [];
    return layouts.filter((layout) => layout.tableId !== null);
  }, [layouts]);

  return {
    data: assignedLayouts,
    isLoading,
  };
};
