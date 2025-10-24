"use client";
import React, { useState, useCallback } from "react";
import { FiBox, FiCheckSquare } from "react-icons/fi";
import { useTranslations } from "next-intl";
import CollapsibleSection from "./mutations/CollapsibleSection";
import DraggableTableItem from "./DragAndDropKit/DraggableTableItem";
import { useUnassignedTables } from "@/hooks/layout/useUnassignedTables";
import { useAssignedTables } from "@/hooks/layout/useAssignedTables";

type LayoutSidebarProps = {
  isAddMode: boolean;
  isMobile?: boolean;
  onToggleAddMode: () => void;
  onDragStart: (tableId: string, source: "unassigned" | "assigned") => void;
  onDragEnd: () => void;
  onUnassignDrop?: () => void;
  onCloseSidebar?: () => void;
};

const LayoutSidebar = ({
  isAddMode,
  isMobile = false,
  onToggleAddMode,
  onDragStart,
  onDragEnd,
  onUnassignDrop,
  onCloseSidebar,
}: LayoutSidebarProps) => {
  const t = useTranslations("layout");
  const { data: unassignedTables, isLoading: loadingUnassigned } =
    useUnassignedTables();
  const { data: assignedTables, isLoading: loadingAssigned } =
    useAssignedTables();
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragSource, setDragSource] = useState<
    "unassigned" | "assigned" | null
  >(null);

  const handleTableDragStart = useCallback(
    (tableId: string, source: "unassigned" | "assigned") => {
      setDragSource(source);
      onDragStart(tableId, source);
      // Close sidebar on mobile when dragging starts
      if (isMobile && onCloseSidebar) {
        onCloseSidebar();
      }
    },
    [onDragStart, isMobile, onCloseSidebar]
  );

  const handleTableDragEnd = useCallback(() => {
    setDragSource(null);
    onDragEnd();
  }, [onDragEnd]);

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

  // Only show drop zone if dragging an assigned table
  const showUnassignDropZone = isDragOver && dragSource === "assigned";

  return (
    <div
      className={`w-80 h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 flex flex-col transition-all duration-300 ${
        showUnassignDropZone
          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-400"
          : ""
      }`}
      onDragOver={dragSource === "assigned" ? handleDragOver : undefined}
      onDragLeave={dragSource === "assigned" ? handleDragLeave : undefined}
      onDrop={dragSource === "assigned" ? handleDrop : undefined}
    >
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mon">
              {t("title")}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {t("dragToMove")}
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
          title={isAddMode ? t("addModeOn") : t("addModeOff")}
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
            {isAddMode ? t("addModeOn") : t("clickToAddSlot")}
          </span>
        </button>
      </div>

      {showUnassignDropZone && (
        <div className="p-4 bg-blue-900/30 dark:bg-blue-900/30 border-b border-blue-400">
          <p className="text-sm text-blue-300 dark:text-blue-300 font-medium">
            {t("dropToUnassign")}
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <CollapsibleSection
          title={t("unassignedTables")}
          count={unassignedTables?.length}
          icon={<FiBox className="w-4 h-4 text-main" />}
        >
          {loadingUnassigned ? (
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {t("loading")}
            </div>
          ) : !unassignedTables || unassignedTables.length === 0 ? (
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {t("noUnassignedTables")}
            </div>
          ) : (
            unassignedTables.map((table) => (
              <DraggableTableItem
                key={table.id}
                table={table}
                onDragStart={(id) => handleTableDragStart(id, "unassigned")}
                onDragEnd={handleTableDragEnd}
              />
            ))
          )}
        </CollapsibleSection>

        <CollapsibleSection
          title={t("assignedTables")}
          count={assignedTables?.length}
          icon={<FiCheckSquare className="w-4 h-4 text-green-600" />}
        >
          {loadingAssigned ? (
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {t("loading")}
            </div>
          ) : !assignedTables || assignedTables.length === 0 ? (
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {t("noAssignedTables")}
            </div>
          ) : (
            assignedTables
              .filter((slot) => slot.table !== null)
              .map((slot) => (
                <DraggableTableItem
                  key={slot.id}
                  table={slot.table}
                  onDragStart={(id) => handleTableDragStart(id, "assigned")}
                  onDragEnd={handleTableDragEnd}
                  slotInfo={t("slotNumber", { number: slot.id })}
                />
              ))
          )}
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default LayoutSidebar;
