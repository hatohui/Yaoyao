import React from "react";
import { FiGrid, FiUsers, FiLink } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { TableObject } from "@/types/models/table";
import { getIconColorClass } from "@/utils/layout/slotUtils";

type TableSlotContentProps = {
  slot: TableObject;
  isLinked: boolean;
};

/**
 * Content displayed for slots with assigned tables
 */
const TableSlotContent = ({ slot, isLinked }: TableSlotContentProps) => {
  const t = useTranslations("layout");

  // Guard against null table during optimistic updates
  if (!slot.table) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-slate-400 dark:text-slate-500 text-sm">
          {t("loading")}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Table Info */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FiGrid className={`w-5 h-5 ${getIconColorClass(isLinked)}`} />
          <span className="font-bold truncate text-nowrap text-base text-slate-900 dark:text-white font-mon">
            {slot.table.name}
          </span>
          {isLinked && (
            <FiLink
              className="w-4 h-4 text-purple-600 dark:text-purple-400"
              title="Linked Table"
            />
          )}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
          <FiUsers className="w-4 h-4" />
          <span className="font-medium">
            {t("capacity")}: {slot.table.capacity}
          </span>
        </div>
      </div>
      {/* Slot ID */}
      <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
        {`#${slot.id}`}
      </div>
    </>
  );
};

export default TableSlotContent;
