import React from "react";
import DragZone from "../DragAndDropKit/DragControls/DragZone";
import LayoutSlot from "../LayoutSlot";
import { GetLayouts } from "@/types/api/layout/GET";
import LayoutCreatingOverlay from "../states/LayoutCreatingOverlay";
import LayoutPreview from "../states/LayoutPreview";
import FirstFloor from "../floors/FirstFloor";

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
}

const LayoutCanvas: React.FC<LayoutCanvasProps> = ({
  slots,
  isMobile,
  isPanning,
  scale,
  position,
  isAddMode,
  isCreatingSlot,
  previewPosition,
  isSlotDragging,
  onLayoutClick,
  onMouseMove,
  onMouseLeave,
  onSlotDrop,
  onSlotDragStart,
  onSlotDragEnd,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onWheel,
}) => {
  return (
    <div
      className="flex-1 overflow-hidden p-4 md:p-8"
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
        <FirstFloor />
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
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center p-8 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl shadow-lg">
                  <p className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-mon">
                    No slots created yet
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Click the &quot;Add Slot&quot; button to start
                  </p>
                </div>
              </div>
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
  );
};

export default LayoutCanvas;
