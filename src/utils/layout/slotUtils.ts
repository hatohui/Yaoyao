import { TableObject } from "@/types/models/table";

/**
 * Determines the background color and border styles for a slot based on its state
 */
export const getSlotColorClasses = (
  hasTable: boolean,
  isLinked: boolean,
  isDragOver: boolean
): string => {
  if (isDragOver) {
    return "bg-blue-50 dark:bg-blue-900/20 border-blue-400 dark:border-blue-400 scale-105 shadow-lg";
  }
  if (!hasTable) {
    return "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600";
  }
  if (isLinked) {
    return "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-300 dark:border-indigo-600";
  }
  return "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-600";
};

/**
 * Returns the locked state styling classes
 */
export const getLockedStyleClasses = (isLocked: boolean): string => {
  if (isLocked) {
    return "ring-2 ring-red-400 dark:ring-red-500 ring-offset-2 cursor-not-allowed";
  }
  return "";
};

/**
 * Checks if a slot has a table assigned
 */
export const hasAssignedTable = (slot: TableObject): boolean => {
  return !!slot.tableId;
};

/**
 * Checks if the table in a slot is linked to other tables
 */
export const isTableLinked = (slot: TableObject): boolean => {
  return (
    hasAssignedTable(slot) &&
    !!slot.table &&
    (slot.table.tableLink1.length > 0 || slot.table.tableLink2.length > 0)
  );
};

/**
 * Gets the icon color class based on slot state
 */
export const getIconColorClass = (isLinked: boolean): string => {
  return isLinked
    ? "text-indigo-600 dark:text-indigo-400"
    : "text-emerald-600 dark:text-emerald-400";
};
