"use client";

import React, { useRef, useCallback } from "react";
import { TableObject } from "@/types/models/table";
import DragObject from "./DragAndDropKit/DragControls/DragObject";
import useLayoutMutations from "@/hooks/layout/useLayoutMutations";
import { FiUnlock, FiGrid, FiUsers, FiTrash2, FiX } from "react-icons/fi";

type LayoutSlotProps = {
  slot: TableObject;
};

const LayoutSlot = ({ slot }: LayoutSlotProps) => {
  const isLockedRef = useRef(false);
  const controlsRef = useRef<HTMLDivElement>(null);
  const lockButtonRef = useRef<HTMLButtonElement>(null);
  const { updateLayout, unassignTable, deleteSlot } = useLayoutMutations();

  const hasTable = !!slot.tableId;

  // Color coding: empty=gray, occupied=green
  const getSlotColor = () => {
    if (!hasTable)
      return "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600";
    return "bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-600";
  };

  const onDragEnd = useCallback(
    (id: string, x: number, y: number) => {
      if (!isLockedRef.current) {
        updateLayout.mutate({
          id: id,
          data: {
            positionX: x,
            positionY: y,
          },
        });
      }
    },
    [updateLayout]
  );

  const handleLock = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    isLockedRef.current = !isLockedRef.current;

    // Update button background color
    if (lockButtonRef.current) {
      if (isLockedRef.current) {
        lockButtonRef.current.style.backgroundColor = "#dc2626"; // red-600
      } else {
        lockButtonRef.current.style.backgroundColor = "";
      }
    }
  }, []);

  const handleUnassign = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isLockedRef.current) return;
      unassignTable.mutate({ slotId: String(slot.id) });
    },
    [unassignTable, slot.id]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isLockedRef.current) return;
      deleteSlot.mutate({ slotId: String(slot.id) });
    },
    [deleteSlot, slot.id]
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

  return (
    <DragObject
      id={String(slot.id)}
      x={slot.positionX}
      y={slot.positionY}
      enabled={!isLockedRef.current}
      onDragEnd={onDragEnd}
    >
      <div
        className={`w-40 h-32 border-2 rounded-lg transition-all duration-200 ${getSlotColor()} cursor-move hover:shadow-lg relative`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Controls */}
        <div
          ref={controlsRef}
          style={{ display: "none" }}
          className="absolute top-1 right-1 flex gap-1"
        >
          <button
            ref={lockButtonRef}
            onClick={handleLock}
            className="p-1 bg-white dark:bg-slate-700 rounded shadow-md hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
            title="Lock/Unlock"
          >
            <FiUnlock className="w-3 h-3 text-slate-600 dark:text-slate-300" />
          </button>

          {hasTable && (
            <button
              onClick={handleUnassign}
              className="p-1 bg-yellow-500 hover:bg-yellow-600 rounded shadow-md transition-colors"
              title="Unassign Table"
            >
              <FiX className="w-3 h-3 text-white" />
            </button>
          )}

          <button
            onClick={handleDelete}
            className="p-1 bg-red-500 hover:bg-red-600 rounded shadow-md transition-colors"
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
                  <FiGrid className="w-4 h-4 text-green-600" />
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {slot.table.name}
                  </span>
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
                  <FiGrid className="w-6 h-6 text-slate-400 dark:text-slate-600 mx-auto mb-1" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Empty
                  </span>
                </div>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
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
