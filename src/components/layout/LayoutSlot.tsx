"use client";

import React, { useRef, useCallback, useState } from "react";
import { TableObject } from "@/types/models/table";
import DragObject from "./DragAndDropKit/DragControls/DragObject";
import useLayoutMutations from "@/hooks/layout/useLayoutMutations";
import {
  FiUnlock,
  FiGrid,
  FiUsers,
  FiTrash2,
  FiX,
  FiLink,
} from "react-icons/fi";

type LayoutSlotProps = {
  slot: TableObject;
  onDrop?: (slotId: number) => void;
};

const LayoutSlot = ({ slot, onDrop }: LayoutSlotProps) => {
  const controlsRef = useRef<HTMLDivElement>(null);
  const { updateLayout, unassignTable, deleteSlot } = useLayoutMutations();
  const [isDragOver, setIsDragOver] = useState(false);

  // Use slot.isLocked from database
  const isLocked = slot.isLocked || false;

  // Check if any mutation is in progress for this slot
  const isLoading =
    updateLayout.isPending || unassignTable.isPending || deleteSlot.isPending;

  const hasTable = !!slot.tableId;
  const isLinked =
    hasTable &&
    slot.table &&
    (slot.table.tableLink1.length > 0 || slot.table.tableLink2.length > 0);

  // Improved color coding: more subtle and accessible
  const getSlotColor = () => {
    if (isDragOver) {
      return "bg-blue-50 dark:bg-blue-900/20 border-blue-400 dark:border-blue-400 scale-105 shadow-lg";
    }
    if (!hasTable)
      return "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600";
    if (isLinked)
      return "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-300 dark:border-indigo-600";
    return "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-600";
  };

  const getLockedStyles = () => {
    if (isLocked) {
      return "ring-2 ring-red-400 dark:ring-red-500 ring-offset-2 cursor-not-allowed";
    }
    return "";
  };

  const onDragEnd = useCallback(
    (id: string, x: number, y: number) => {
      if (!isLocked) {
        updateLayout.mutate({
          id: id,
          data: {
            positionX: x,
            positionY: y,
          },
        });
      }
    },
    [updateLayout, isLocked]
  );

  const handleLock = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      // Toggle lock state in database
      updateLayout.mutate({
        id: String(slot.id),
        data: {
          isLocked: !isLocked,
        },
      });
    },
    [updateLayout, slot.id, isLocked]
  );

  const handleUnassign = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isLocked) return;
      unassignTable.mutate({ slotId: String(slot.id) });
    },
    [unassignTable, slot.id, isLocked]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isLocked) return;
      deleteSlot.mutate({ slotId: String(slot.id) });
    },
    [deleteSlot, slot.id, isLocked]
  );

  const handleMouseEnter = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.style.display = "flex";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.style.display = "none";
    }
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isLocked) {
        setIsDragOver(true);
      }
    },
    [isLocked]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      if (onDrop && !isLocked) {
        onDrop(slot.id);
      }
    },
    [onDrop, slot.id, isLocked]
  );

  return (
    <DragObject
      id={String(slot.id)}
      x={slot.positionX}
      y={slot.positionY}
      enabled={!isLocked}
      onDragEnd={onDragEnd}
    >
      <div
        data-slot-id={slot.id}
        className={`w-40 h-32 border-2 rounded-lg transition-all duration-300 ease-in-out ${getSlotColor()} ${getLockedStyles()} hover:shadow-lg relative ${
          isDragOver ? "ring-2 ring-blue-500 ring-offset-2" : ""
        } ${isLocked ? "" : "cursor-move"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-20">
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-main border-t-transparent"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                Loading...
              </span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div
          ref={controlsRef}
          style={{ display: "none" }}
          className="absolute top-1 right-1 flex gap-1 z-10 animate-fadeIn"
        >
          <button
            onClick={handleLock}
            className={`p-1 rounded shadow-md transition-all duration-200 ${
              isLocked
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300"
            }`}
            title={isLocked ? "Unlock" : "Lock"}
          >
            <FiUnlock className="w-3 h-3" />
          </button>

          {hasTable && (
            <button
              onClick={handleUnassign}
              disabled={isLocked}
              className={`p-1 rounded shadow-md transition-all duration-200 ${
                isLocked
                  ? "bg-slate-300 dark:bg-slate-600 cursor-not-allowed opacity-50"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
              title="Unassign Table"
            >
              <FiX className="w-3 h-3 text-white" />
            </button>
          )}

          <button
            onClick={handleDelete}
            disabled={isLocked}
            className={`p-1 rounded shadow-md transition-all duration-200 ${
              isLocked
                ? "bg-slate-300 dark:bg-slate-600 cursor-not-allowed opacity-50"
                : "bg-red-500 hover:bg-red-600"
            }`}
            title="Delete Slot"
          >
            <FiTrash2 className="w-3 h-3 text-white" />
          </button>
        </div>

        <div className="p-3 h-full flex flex-col justify-between">
          {hasTable ? (
            <>
              {/* Table Info */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FiGrid
                    className={`w-4 h-4 ${
                      isLinked
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  />
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
          ) : (
            <>
              {/* Empty Slot */}
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <FiGrid className="w-6 h-6 text-slate-300 dark:text-slate-600 mx-auto mb-1" />
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    Empty
                  </span>
                </div>
              </div>
              <div className="text-xs text-slate-400 dark:text-slate-500">
                Slot #{slot.id}
              </div>
            </>
          )}
        </div>
      </div>
    </DragObject>
  );
};

export default LayoutSlot;
