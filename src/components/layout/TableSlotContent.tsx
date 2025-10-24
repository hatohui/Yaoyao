import React from "react";
import { FiGrid, FiUsers, FiLink } from "react-icons/fi";
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
  return (
    <>
      {/* Table Info */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FiGrid className={`w-4 h-4 ${getIconColorClass(isLinked)}`} />
          <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
            {slot.table.name}
          </span>
          {isLinked && (
            <FiLink
              className="w-3 h-3 text-indigo-600 dark:text-indigo-400"
              title="Linked Table"
            />
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
          <FiUsers className="w-3 h-3" />
          <span>Capacity: {slot.table.capacity}</span>
        </div>
      </div>
      {/* Slot ID */}
      <div className="text-xs text-slate-500 dark:text-slate-400">
        Slot #{slot.id}
      </div>
    </>
  );
};

export default TableSlotContent;
