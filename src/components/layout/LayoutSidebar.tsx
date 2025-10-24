"use client";
import React, { useState, useCallback } from "react";
import { FiBox, FiCheckSquare } from "react-icons/fi";
import CollapsibleSection from "./mutations/CollapsibleSection";
import DraggableTableItem from "./DragAndDropKit/DraggableTableItem";
import { useUnassignedTables } from "@/hooks/layout/useUnassignedTables";
import { useAssignedTables } from "@/hooks/layout/useAssignedTables";

type LayoutSidebarProps = {
  isAddMode: boolean;
  onToggleAddMode: () => void;
  onDragStart: (tableId: string, source: "unassigned" | "assigned") => void;
  onDragEnd: () => void;
  onUnassignDrop?: () => void;
};

const LayoutSidebar = ({
  isAddMode,
  onToggleAddMode,
  onDragStart,
  onDragEnd,
  onUnassignDrop,
}: LayoutSidebarProps) => {
  const { data: unassignedTables, isLoading: loadingUnassigned } =
    useUnassignedTables();
  const { data: assignedTables, isLoading: loadingAssigned } =
    useAssignedTables();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (onUnassignDrop) {
        onUnassignDrop();
      }
    },
    [onUnassignDrop]
  );

  return (
    <div
      className={`w-80 h-full bg-slate-800 dark:bg-slate-900 border-l border-slate-700 dark:border-slate-700 flex flex-col transition-all duration-300 ${
        isDragOver ? "bg-blue-900/30 dark:bg-blue-900/20 border-blue-400" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="p-4 border-b border-slate-700 dark:border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-100 dark:text-slate-100">
              Tables
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-400 mt-1">
              Drag tables to assign them to slots
            </p>
          </div>
        </div>

        {/* Add Mode Button */}
        <button
          onClick={onToggleAddMode}
          className={`w-full px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 border ${
            isAddMode
              ? "bg-red-600 hover:bg-red-700 text-white border-red-600"
              : "bg-main hover:bg-main/90 text-white border-main"
          }`}
          title={isAddMode ? "Exit Add Mode" : "Enter Add Mode"}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isAddMode ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            )}
          </svg>
          <span className="font-medium">
            {isAddMode ? "Exit Add Mode" : "Add Slot"}
          </span>
        </button>
      </div>

      {isDragOver && (
        <div className="p-4 bg-blue-900/30 dark:bg-blue-900/30 border-b border-blue-400">
          <p className="text-sm text-blue-300 dark:text-blue-300 font-medium">
            Drop here to unassign table
          </p>
        </div>
      )}

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
              <DraggableTableItem
                key={slot.id}
                table={slot.table}
                onDragStart={(id) => onDragStart(id, "assigned")}
                onDragEnd={onDragEnd}
                slotInfo={`Slot #${slot.id}`}
              />
            ))
          )}
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default LayoutSidebar;
