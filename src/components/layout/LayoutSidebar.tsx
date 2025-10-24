"use client";
import React from "react";
import { FiBox, FiCheckSquare } from "react-icons/fi";
import CollapsibleSection from "./CollapsibleSection";
import DraggableTableItem from "./DraggableTableItem";
import { useUnassignedTables } from "@/hooks/layout/useUnassignedTables";
import { useAssignedTables } from "@/hooks/layout/useAssignedTables";

type LayoutSidebarProps = {
  onDragStart: (tableId: string, source: "unassigned" | "assigned") => void;
  onDragEnd: () => void;
};

const LayoutSidebar = ({ onDragStart, onDragEnd }: LayoutSidebarProps) => {
  const { data: unassignedTables, isLoading: loadingUnassigned } =
    useUnassignedTables();
  const { data: assignedTables, isLoading: loadingAssigned } =
    useAssignedTables();

  return (
    <div className="w-80 bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 flex flex-col">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Tables
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <CollapsibleSection
          title="Available Tables"
          count={unassignedTables?.length}
          icon={<FiBox className="w-4 h-4 text-main" />}
        >
          {loadingUnassigned ? (
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Loading...
            </div>
          ) : !unassignedTables || unassignedTables.length === 0 ? (
            <div className="text-sm text-slate-500 dark:text-slate-400">
              No available tables
            </div>
          ) : (
            unassignedTables.map((table) => (
              <DraggableTableItem
                key={table.id}
                table={table}
                onDragStart={(id) => onDragStart(id, "unassigned")}
                onDragEnd={onDragEnd}
              />
            ))
          )}
        </CollapsibleSection>

        <CollapsibleSection
          title="Assigned Tables"
          count={assignedTables?.length}
          icon={<FiCheckSquare className="w-4 h-4 text-green-600" />}
        >
          {loadingAssigned ? (
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Loading...
            </div>
          ) : !assignedTables || assignedTables.length === 0 ? (
            <div className="text-sm text-slate-500 dark:text-slate-400">
              No assigned tables
            </div>
          ) : (
            assignedTables.map((slot) => (
              <div
                key={slot.id}
                className="p-3 mb-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <FiCheckSquare className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                      {slot.table.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Slot #{slot.id}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default LayoutSidebar;
