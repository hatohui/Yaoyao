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
    return "bg-blue-100 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400 scale-105 shadow-xl";
  }
  if (!hasTable) {
    return "bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500";
  }
  if (isLinked) {
    return "bg-purple-50 dark:bg-purple-900/30 border-purple-400 dark:border-purple-500 shadow-md";
  }
  return "bg-main-light/20 dark:bg-main-dark/30 border-main dark:border-main-light shadow-md";
};

/**
 * Returns the locked state styling classes
 */
export const getLockedStyleClasses = (isLocked: boolean): string => {
  if (isLocked) {
    return "ring-4 ring-red-500 dark:ring-red-400 ring-offset-2 opacity-75 cursor-not-allowed";
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
    ? "text-purple-600 dark:text-purple-400"
    : "text-main-dark dark:text-main-light";
};
