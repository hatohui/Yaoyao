"use client";
import React, { useState, useEffect } from "react";
import Area from "./DragAndDropKit/Area";
import DragZone from "./DragAndDropKit/DragControls/DragZone";
import "./style.css";
import LayoutSlot from "./LayoutSlot";
import LayoutSidebar from "./LayoutSidebar";
import LayoutInstructions from "./LayoutInstructions";
import { useLayouts } from "@/hooks/layout/useLayouts";
import useLayoutMutations from "@/hooks/layout/useLayoutMutations";
import { PostLayoutRequest } from "@/types/api/layout/POST";

const RestaurantLayout = () => {
  const { data: slots, isLoading, isError, error } = useLayouts();
  const { createSlot, assignTableToSlot, swapTables, unassignTable } =
    useLayoutMutations();
  const [draggedTableId, setDraggedTableId] = useState<string | null>(null);
  const [dragSource, setDragSource] = useState<
    "unassigned" | "assigned" | null
  >(null);
  const [draggedSlotId, setDraggedSlotId] = useState<number | null>(null);
  const [isCreatingSlot, setIsCreatingSlot] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [previewPosition, setPreviewPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || "ontouchstart" in window;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate distance between two touch points
  const getTouchDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Touch handlers for mobile zoom and pan
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;

    if (e.touches.length === 2) {
      // Pinch to zoom
      setLastTouchDistance(getTouchDistance(e.touches));
    } else if (e.touches.length === 1) {
      // Pan
      setIsPanning(true);
      setStartPan({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;

    if (e.touches.length === 2) {
      // Pinch to zoom
      e.preventDefault();
      const distance = getTouchDistance(e.touches);
      if (lastTouchDistance > 0) {
        const delta = distance / lastTouchDistance;
        setScale((prev) => Math.min(Math.max(0.5, prev * delta), 3));
      }
      setLastTouchDistance(distance);
    } else if (e.touches.length === 1 && isPanning) {
      // Pan
      e.preventDefault();
      setPosition({
        x: e.touches[0].clientX - startPan.x,
        y: e.touches[0].clientY - startPan.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
    setLastTouchDistance(0);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setScale((prev) => Math.min(Math.max(0.5, prev * delta), 3));
    }
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev * 1.2, 3));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev / 1.2, 0.5));
  };

  const handleDragStart = (
    tableId: string,
    source: "unassigned" | "assigned"
  ) => {
    setDraggedTableId(tableId);
    setDragSource(source);

    // If dragging from assigned, find which slot it's in
    if (source === "assigned" && slots) {
      const slot = slots.find((s) => s.tableId === tableId);
      if (slot) {
        setDraggedSlotId(slot.id);
      }
    }
  };

  const handleDragEnd = () => {
    setDraggedTableId(null);
    setDragSource(null);
    setDraggedSlotId(null);
  };

  const handleSlotDrop = (targetSlotId: number) => {
    if (!draggedTableId) return;

    const targetSlot = slots?.find((s) => s.id === targetSlotId);
    if (!targetSlot) return;

    if (dragSource === "unassigned") {
      // Assign table to empty slot or swap if occupied
      if (targetSlot.tableId) {
        // Can't assign to occupied slot from sidebar - would need swap UI
        console.log("Cannot assign to occupied slot");
        return;
      }
      assignTableToSlot.mutate({
        slotId: String(targetSlotId),
        tableId: draggedTableId,
      });
    } else if (dragSource === "assigned" && draggedSlotId !== null) {
      // Swap tables between slots
      if (draggedSlotId === targetSlotId) {
        // Same slot, do nothing
        return;
      }

      if (targetSlot.tableId) {
        // Swap with occupied slot
        swapTables.mutate({
          slot1Id: String(draggedSlotId),
          slot2Id: String(targetSlotId),
        });
      } else {
        // Move to empty slot
        assignTableToSlot.mutate({
          slotId: String(targetSlotId),
          tableId: draggedTableId,
        });
        unassignTable.mutate({ slotId: String(draggedSlotId) });
      }
    }

    handleDragEnd();
  };

  const handleUnassignDrop = () => {
    if (!draggedTableId || !draggedSlotId || dragSource !== "assigned") return;

    unassignTable.mutate({ slotId: String(draggedSlotId) });
    handleDragEnd();
  };

  const handleLayoutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCreatingSlot) return; // Prevent creating multiple slots

    // Only create slot if in add mode
    if (!isAddMode) return;

    // Don't create if clicking on existing slots
    if ((e.target as HTMLElement).closest("[data-slot-id]")) {
      return;
    }

    const dragZone = e.currentTarget;
    const rect = dragZone.getBoundingClientRect();

    // Calculate position relative to the DragZone
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert to percentage for responsive positioning
    const positionX = (x / rect.width) * 100;
    const positionY = (y / rect.height) * 100;

    setIsCreatingSlot(true);
    createSlot.mutate(
      {
        positionX,
        positionY,
        zone: 1,
        tableId: null,
      } as PostLayoutRequest,
      {
        onSettled: () => {
          setIsCreatingSlot(false);
        },
        onError: (error) => {
          console.error("Failed to create slot:", error);
        },
      }
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAddMode || isCreatingSlot) {
      setPreviewPosition(null);
      return;
    }

    const dragZone = e.currentTarget;
    const rect = dragZone.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPreviewPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPreviewPosition(null);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
        <div className="flex-1 overflow-auto p-8">
          <div className="wall relative max-w-7xl aspect-[2/1] mx-auto">
            <div className="h-full w-full flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main mx-auto mb-4"></div>
                <div className="text-slate-600 dark:text-slate-400">
                  Loading layout...
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-80 bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-24 animate-pulse"></div>
          </div>
          <div className="p-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!slots) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-900">
        <div className="text-center max-w-md p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
          <div className="text-slate-600 dark:text-slate-400 mb-4">
            {isError ? "Error loading layout" : "No layout data available."}
          </div>
          {isError && error && (
            <div className="text-sm text-red-500 dark:text-red-400 mb-4">
              {error instanceof Error ? error.message : "Unknown error"}
            </div>
          )}
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Click the &quot;Add Slot&quot; button, then click on the layout to
            create your first slot.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
      {/* Add Slot Toggle Button */}
      <button
        onClick={() => setIsAddMode(!isAddMode)}
        className={`fixed top-20 left-4 z-50 px-4 py-3 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2 ${
          isAddMode
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600"
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

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-20 right-4 z-50 p-3 bg-main hover:bg-main/90 text-white rounded-full shadow-lg transition-all duration-200"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isSidebarOpen ? (
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Zoom Controls */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-2 border border-slate-300 dark:border-slate-600">
          <button
            onClick={zoomIn}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            title="Zoom In"
          >
            <svg
              className="w-5 h-5 text-slate-700 dark:text-slate-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
              />
            </svg>
          </button>
          <button
            onClick={resetZoom}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors text-xs font-medium text-slate-700 dark:text-slate-200"
            title="Reset Zoom"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            onClick={zoomOut}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            title="Zoom Out"
          >
            <svg
              className="w-5 h-5 text-slate-700 dark:text-slate-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Main Layout Area */}
      <div
        className="flex-1 overflow-hidden p-4 md:p-8"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        <div
          className="wall relative max-w-7xl aspect-[2/1] mx-auto shadow-2xl rounded-lg overflow-hidden"
          style={{
            transform: isMobile
              ? `translate(${position.x}px, ${position.y}px) scale(${scale})`
              : undefined,
            transition: isPanning ? "none" : "transform 0.2s ease-out",
            touchAction: "none",
          }}
        >
          <section className="absolute grid grid-cols-[1fr_4fr] grid-rows-3 h-full w-full">
            <Area full noBottom />
            <Area full noBottom />
            <Area full noTop noBottom />
            <Area full noTop noBottom />
            <Area full noTop />
            <Area full noTop />
          </section>
          <div
            onClick={handleLayoutClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`h-full w-full relative ${
              isCreatingSlot
                ? "cursor-wait"
                : isAddMode
                ? "cursor-crosshair"
                : isMobile && isPanning
                ? "cursor-grabbing"
                : isMobile
                ? "cursor-grab"
                : "cursor-default"
            }`}
          >
            {/* Preview slot when in add mode */}
            {isAddMode && previewPosition && !isCreatingSlot && (
              <div
                className="absolute w-40 h-32 border-2 border-dashed border-blue-500 bg-blue-500/10 rounded-lg pointer-events-none z-40 flex items-center justify-center"
                style={{
                  left: previewPosition.x - 80,
                  top: previewPosition.y - 64,
                }}
              >
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  Click to place
                </span>
              </div>
            )}

            {isCreatingSlot && (
              <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center pointer-events-none z-50">
                <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-main"></div>
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      Creating slot...
                    </span>
                  </div>
                </div>
              </div>
            )}
            <DragZone
              id="layout"
              className="h-full w-full"
              width={1400}
              height={700}
              responsive
            >
              {slots.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center p-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg">
                    <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                      No slots created yet
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Click the &quot;Add Slot&quot; button to start
                    </p>
                  </div>
                </div>
              ) : (
                slots.map((slot) => (
                  <LayoutSlot
                    key={slot.id}
                    slot={slot}
                    onDrop={handleSlotDrop}
                  />
                ))
              )}
            </DragZone>
          </div>
        </div>
      </div>

      {/* Sidebar - Hidden on mobile unless toggled, visible on md+ */}
      <div
        className={`fixed md:relative inset-y-0 right-0 z-40 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        <LayoutSidebar
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onUnassignDrop={handleUnassignDrop}
        />
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Instructions */}
      <LayoutInstructions />
    </div>
  );
};

export default RestaurantLayout;
