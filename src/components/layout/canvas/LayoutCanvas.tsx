import React from "react";
import DragZone from "../DragAndDropKit/DragControls/DragZone";
import LayoutSlot from "../LayoutSlot";
import { GetLayouts } from "@/types/api/layout/GET";
import LayoutCreatingOverlay from "../states/LayoutCreatingOverlay";
import LayoutPreview from "../states/LayoutPreview";
import FirstFloor from "../floors/FirstFloor";
import SecondFloor from "../floors/SecondFloor";
import EmptySlot from "../states/EmptySlot";

interface LayoutCanvasProps {
  slots: GetLayouts;
  isMobile: boolean;
  isPanning: boolean;
  scale: number;
  position: { x: number; y: number };
  isAddMode: boolean;
  isCreatingSlot: boolean;
  previewPosition: { x: number; y: number } | null;
  isSlotDragging: boolean;
  zone: number;
  onLayoutClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
  onSlotDrop: (targetSlotId: number) => void;
  onSlotDragStart: () => void;
  onSlotDragEnd: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  onWheel: (e: React.WheelEvent) => void;
  setZone: React.Dispatch<React.SetStateAction<number>>;
}

const LayoutCanvas: React.FC<LayoutCanvasProps> = ({
  slots,
  isMobile,
  isPanning,
  scale,
  zone,
  position,
  isAddMode,
  isCreatingSlot,
  previewPosition,
  isSlotDragging,
  onLayoutClick,
  onMouseMove,
  onMouseLeave,
  onSlotDrop,
  setZone,
  onSlotDragStart,
  onSlotDragEnd,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onWheel,
}) => {
  return (
    <div className="flex-1 overflow-hidden p-4 md:p-8">
      {/* Floor selector - positioned outside zoomable area on mobile */}
      <div className="max-w-7xl mx-auto mb-4 flex justify-end md:hidden">
        <label htmlFor="zone-select" className="sr-only">
          Select floor
        </label>
        <select
          id="zone-select"
          value={zone}
          onChange={(e) => setZone(Number(e.target.value))}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-white px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value={1}>First Floor</option>
          <option value={2}>Second Floor</option>
        </select>
      </div>

      <div
        className="relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onWheel={onWheel}
        style={{
          touchAction: isSlotDragging ? "none" : "auto",
        }}
      >
        <div
          className="wall relative max-w-7xl aspect-[2/1] mx-auto shadow-2xl rounded-lg overflow-hidden"
          style={{
            transform: isMobile
              ? `translate(${position.x}px, ${position.y}px) scale(${scale})`
              : undefined,
            transition:
              isPanning || isSlotDragging ? "none" : "transform 0.2s ease-out",
            touchAction: "none",
          }}
        >
          {/* Floor selector (desktop only - inside canvas) */}
          <div className="absolute top-4 right-4 z-20 hidden md:block">
            <label htmlFor="zone-select-desktop" className="sr-only">
              Select floor
            </label>
            <select
              id="zone-select-desktop"
              value={zone}
              onChange={(e) => setZone(Number(e.target.value))}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-white px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={1}>First Floor</option>
              <option value={2}>Second Floor</option>
            </select>
          </div>
          {/* Flooring */}
          {zone == 1 && <FirstFloor />}
          {zone == 2 && <SecondFloor />}

          {/* Content goes here  */}
          <div
            onClick={onLayoutClick}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
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
            <LayoutPreview
              isAddMode={isAddMode}
              previewPosition={previewPosition}
              isCreatingSlot={isCreatingSlot}
            />

            <LayoutCreatingOverlay isCreatingSlot={isCreatingSlot} />

            <DragZone
              id="layout"
              className="h-full w-full"
              width={1400}
              height={700}
              responsive
            >
              {slots.length === 0 ? (
                <EmptySlot />
              ) : (
                slots.map((slot) => (
                  <LayoutSlot
                    key={slot.id}
                    slot={slot}
                    onDrop={onSlotDrop}
                    onDragStart={onSlotDragStart}
                    onDragEnd={onSlotDragEnd}
                  />
                ))
              )}
            </DragZone>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutCanvas;
