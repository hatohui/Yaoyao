"use client";
import React, { useState } from "react";
import Area from "./DragAndDropKit/Area";
import DragZone from "./DragAndDropKit/DragControls/DragZone";
import "./style.css";
import LayoutSlot from "./LayoutSlot";
import LayoutSidebar from "./LayoutSidebar";
import { useLayouts } from "@/hooks/layout/useLayouts";

const RestaurantLayout = () => {
  const { data: slots, isLoading } = useLayouts();
  const [draggedTableId, setDraggedTableId] = useState<string | null>(null);
  const [dragSource, setDragSource] = useState<
    "unassigned" | "assigned" | null
  >(null);

  const handleDragStart = (
    tableId: string,
    source: "unassigned" | "assigned"
  ) => {
    setDraggedTableId(tableId);
    setDragSource(source);
  };

  const handleDragEnd = () => {
    setDraggedTableId(null);
    setDragSource(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-slate-600 dark:text-slate-400">
          Loading layout...
        </div>
      </div>
    );
  }

  if (!slots) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-slate-600 dark:text-slate-400">
          No layout data available.
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      {/* Main Layout Area */}
      <div className="flex-1 overflow-auto p-8">
        <div className="wall relative max-w-7xl aspect-[2/1] mx-auto">
          <section className="absolute grid grid-cols-[1fr_4fr] grid-rows-3 h-full w-full">
            <Area full noBottom />
            <Area full noBottom />
            <Area full noTop noBottom />
            <Area full noTop noBottom />
            <Area full noTop />
            <Area full noTop />
          </section>
          <DragZone
            id="layout"
            className="h-full w-full"
            width={1400}
            height={700}
            responsive
          >
            {slots.map((slot) => (
              <LayoutSlot key={slot.id} slot={slot} />
            ))}
          </DragZone>
        </div>
      </div>

      {/* Sidebar */}
      <LayoutSidebar onDragStart={handleDragStart} onDragEnd={handleDragEnd} />
    </div>
  );
};

export default RestaurantLayout;
