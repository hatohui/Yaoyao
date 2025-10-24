"use client";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { GetTablesResponse } from "@/types/api/table/GET";
import { FiGrid, FiUsers, FiCheckSquare } from "react-icons/fi";

type DraggableTableItemProps = {
  table: GetTablesResponse | { name: string; id: string; capacity: number };
  onDragStart: (tableId: string) => void;
  onDragEnd: () => void;
  slotInfo?: string;
};

const DraggableTableItem = ({
  table,
  onDragStart,
  onDragEnd,
  slotInfo,
}: DraggableTableItemProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [touchPosition, setTouchPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const touchOffset = useRef<{ x: number; y: number }>({ x: 80, y: 40 }); // Center of the item
  const initialTouch = useRef<{ x: number; y: number } | null>(null);
  const dragStartTimestamp = useRef<number>(0);
  const hasMovedSignificantly = useRef<boolean>(false);

  const handleDragStart = useCallback(() => {
    if (!table) return;
    setIsDragging(true);
    onDragStart(table.id);
  }, [onDragStart, table]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setTouchPosition(null);
    initialTouch.current = null;
    onDragEnd();
  }, [onDragEnd]);

  // Touch event handlers for mobile support
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      const rect = itemRef.current?.getBoundingClientRect();

      if (rect) {
        // Calculate the offset from touch point to element's top-left
        // Store the actual width and height for centering later
        touchOffset.current = {
          x: rect.width / 2,
          y: rect.height / 2,
        };
      }

      // Store initial touch position
      initialTouch.current = { x: touch.clientX, y: touch.clientY };
      setTouchPosition({ x: touch.clientX, y: touch.clientY });

      // Reset movement tracking
      hasMovedSignificantly.current = false;
      dragStartTimestamp.current = Date.now();

      // Start drag immediately to show feedback
      handleDragStart();
    },
    [handleDragStart]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      // Ensure we have a valid touch point
      if (e.changedTouches.length === 0) {
        handleDragEnd();
        return;
      }

      const touch = e.changedTouches[0];

      // Only process as drop if moved significantly or held for a short time
      const timeSinceDragStart = Date.now() - dragStartTimestamp.current;
      const shouldProcessDrop =
        hasMovedSignificantly.current || timeSinceDragStart > 200;

      if (!shouldProcessDrop) {
        handleDragEnd();
        return;
      }

      const elementUnder = document.elementFromPoint(
        touch.clientX,
        touch.clientY
      );

      // Clean up drag-over classes
      document.querySelectorAll("[data-slot-id]").forEach((el) => {
        el.classList.remove("drag-over-mobile", "drag-over-invalid");
      });

      // Check if dropped on a slot
      const slotElement = elementUnder?.closest(
        "[data-slot-id]"
      ) as HTMLElement;
      if (slotElement) {
        // Check if slot is occupied before attempting drop
        const slotContent = slotElement.querySelector(
          '[class*="emerald"], [class*="indigo"]'
        );
        const isOccupied = slotContent !== null;

        if (!isOccupied) {
          const slotId = slotElement.getAttribute("data-slot-id");
          if (slotId) {
            // Trigger drop event only if slot is not occupied
            const dropEvent = new CustomEvent("tableDrop", {
              detail: { tableId: table.id, slotId: parseInt(slotId) },
            });
            slotElement.dispatchEvent(dropEvent);
          }
        }
        // If occupied, do nothing (drop is prevented)
      }

      handleDragEnd();
    },
    [table.id, handleDragEnd]
  );

  // Handle touch cancel (e.g., phone call, notification)
  const handleTouchCancel = useCallback(() => {
    // Clean up drag-over classes
    document.querySelectorAll("[data-slot-id]").forEach((el) => {
      el.classList.remove("drag-over-mobile", "drag-over-invalid");
    });
    handleDragEnd();
  }, [handleDragEnd]);

  // Use non-passive event listener for touchmove to allow preventDefault
  useEffect(() => {
    const element = itemRef.current;
    if (!element) return;

    const handleTouchMoveNative = (e: TouchEvent) => {
      e.preventDefault(); // This works in non-passive listener

      const touch = e.touches[0];

      // Check if moved significantly (more than 5px)
      if (initialTouch.current && !hasMovedSignificantly.current) {
        const deltaX = Math.abs(touch.clientX - initialTouch.current.x);
        const deltaY = Math.abs(touch.clientY - initialTouch.current.y);
        if (deltaX > 5 || deltaY > 5) {
          hasMovedSignificantly.current = true;
        }
      }

      setTouchPosition({ x: touch.clientX, y: touch.clientY });

      // Find element under touch point
      const elementUnder = document.elementFromPoint(
        touch.clientX,
        touch.clientY
      );

      // Check if it's over a slot
      const slotElement = elementUnder?.closest(
        "[data-slot-id]"
      ) as HTMLElement;

      // Remove all drag-over classes first
      document.querySelectorAll("[data-slot-id]").forEach((el) => {
        el.classList.remove("drag-over-mobile", "drag-over-invalid");
      });

      if (slotElement) {
        // Check if slot is occupied by checking for table content
        const slotContent = slotElement.querySelector(
          '[class*="emerald"], [class*="indigo"]'
        );
        const isOccupied = slotContent !== null;

        if (isOccupied) {
          // Show red/invalid feedback for occupied slots
          slotElement.classList.add("drag-over-invalid");
        } else {
          // Show normal drag-over feedback for empty slots
          slotElement.classList.add("drag-over-mobile");
        }
      }
    };

    // Add non-passive touchmove listener
    element.addEventListener("touchmove", handleTouchMoveNative, {
      passive: false,
    });

    return () => {
      element.removeEventListener("touchmove", handleTouchMoveNative);
    };
  }, []);

  // Guard against null table
  if (!table) {
    return null;
  }

  return (
    <>
      <div
        ref={itemRef}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        className={`p-3 mb-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-move hover:border-main hover:shadow-md transition-all ${
          isDragging ? "opacity-30" : "opacity-100"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-main/10 dark:bg-main/20 rounded-lg flex items-center justify-center">
            {slotInfo ? (
              <FiCheckSquare className="w-5 h-5 text-green-600" />
            ) : (
              <FiGrid className="w-5 h-5 text-main" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">
              {table.name}
            </p>
            <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
              <FiUsers className="w-3 h-3" />
              <span>Capacity: {table.capacity}</span>
            </div>
            {slotInfo && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {slotInfo}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Floating element during touch drag */}
      {isDragging && touchPosition && (
        <div
          className="fixed pointer-events-none z-50 opacity-80"
          style={{
            left: `${touchPosition.x - touchOffset.current.x}px`,
            top: `${touchPosition.y - touchOffset.current.y}px`,
          }}
        >
          <div className="p-3 bg-white dark:bg-slate-800 border-2 border-main dark:border-slate-700 rounded-lg shadow-2xl w-40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-main/10 dark:bg-main/20 rounded-lg flex items-center justify-center">
                {slotInfo ? (
                  <FiCheckSquare className="w-5 h-5 text-green-600" />
                ) : (
                  <FiGrid className="w-5 h-5 text-main" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">
                  {table.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DraggableTableItem;
