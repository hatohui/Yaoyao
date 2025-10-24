"use client";
import React, { useState, useCallback } from "react";
import { FiBox, FiCheckSquare } from "react-icons/fi";
import CollapsibleSection from "./CollapsibleSection";
import DraggableTableItem from "./DraggableTableItem";
import { useUnassignedTables } from "@/hooks/layout/useUnassignedTables";
import { useAssignedTables } from "@/hooks/layout/useAssignedTables";

type LayoutSidebarProps = {
  onDragStart: (tableId: string, source: "unassigned" | "assigned") => void;
  onDragEnd: () => void;
  onUnassignDrop?: () => void;
};

const LayoutSidebar = ({
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
      className={`w-80 bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 flex flex-col transition-all duration-300 ${
        isDragOver ? "bg-blue-50 dark:bg-blue-900/20 border-blue-400" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Tables
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Drag tables to assign them to slots
        </p>
      </div>

      {isDragOver && (
        <div className="p-4 bg-blue-100 dark:bg-blue-900/30 border-b border-blue-400">
          <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
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
