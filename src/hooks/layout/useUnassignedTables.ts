"use client";
import { useLayouts } from "./useLayouts";
import useTables from "../table/useTables";
import { useMemo } from "react";

export const useUnassignedTables = () => {
  const { data: layouts, isLoading: layoutsLoading } = useLayouts();
  const { data: tablesData, isLoading: tablesLoading } = useTables({
    count: 1000, // Get all tables
    isStaging: false,
  });

  const unassignedTables = useMemo(() => {
    if (!layouts || !tablesData) return [];

    const assignedTableIds = new Set(
      layouts.filter((l) => l.tableId).map((l) => l.tableId)
    );

    return tablesData.tables.filter((table) => !assignedTableIds.has(table.id));
  }, [layouts, tablesData]);

  return {
    data: unassignedTables,
    isLoading: layoutsLoading || tablesLoading,
  };
};
