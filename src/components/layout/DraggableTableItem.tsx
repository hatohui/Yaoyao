"use client";
import React from "react";
import { Table } from "@prisma/client";
import { FiGrid, FiUsers } from "react-icons/fi";

type DraggableTableItemProps = {
  table: Table;
  onDragStart: (tableId: string) => void;
  onDragEnd: () => void;
};

const DraggableTableItem = ({
  table,
  onDragStart,
  onDragEnd,
}: DraggableTableItemProps) => {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(table.id)}
      onDragEnd={onDragEnd}
      className="p-3 mb-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-move hover:border-main hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-main/10 dark:bg-main/20 rounded-lg flex items-center justify-center">
          <FiGrid className="w-5 h-5 text-main" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">
            {table.name}
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
            <FiUsers className="w-3 h-3" />
            <span>Capacity: {table.capacity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraggableTableItem;
