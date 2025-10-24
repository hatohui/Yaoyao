"use client";
import React from "react";
import "./style.css";
import LayoutSidebar from "./LayoutSidebar";
import LayoutCanvas from "./canvas/LayoutCanvas";
import LayoutMobileControls from "./mutations/LayoutMobileControls";
import LayoutLoadingState from "./states/LayoutLoadingState";
import LayoutErrorState from "./states/LayoutErrorState";
import { useLayouts } from "@/hooks/layout/useLayouts";
import { useMobileDetection } from "@/hooks/layout/useMobileDetection";
import { useLayoutMode } from "@/hooks/layout/useLayoutMode";
import { useLayoutZoom } from "@/hooks/layout/useLayoutZoom";
import { useLayoutDrag } from "@/hooks/layout/useLayoutDrag";
import { useLayoutSlotCreation } from "@/hooks/layout/useLayoutSlotCreation";

const RestaurantLayout = () => {
  const { data: slots, isLoading, isError, error } = useLayouts();
  const isMobile = useMobileDetection();
  const {
    isAddMode,
    isSidebarOpen,
    toggleAddMode,
    toggleSidebar,
    closeSidebar,
  } = useLayoutMode();
  const {
    scale,
    position,
    isPanning,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleWheel,
    resetZoom,
    zoomIn,
    zoomOut,
  } = useLayoutZoom(isMobile);
  const { handleDragStart, handleDragEnd, handleSlotDrop, handleUnassignDrop } =
    useLayoutDrag(slots);
  const {
    isCreatingSlot,
    previewPosition,
    handleLayoutClick: handleLayoutClickBase,
    handleMouseMove: handleMouseMoveBase,
    handleMouseLeave,
  } = useLayoutSlotCreation();

  const handleLayoutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleLayoutClickBase(e, isAddMode);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMouseMoveBase(e, isAddMode);
  };

  if (isLoading) {
    return <LayoutLoadingState />;
  }

  if (!slots) {
    return <LayoutErrorState isError={isError} error={error} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
      <LayoutMobileControls
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        scale={scale}
        onToggleSidebar={toggleSidebar}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onResetZoom={resetZoom}
      />

      <LayoutCanvas
        slots={slots}
        isMobile={isMobile}
        isPanning={isPanning}
        scale={scale}
        position={position}
        isAddMode={isAddMode}
        isCreatingSlot={isCreatingSlot}
        previewPosition={previewPosition}
        onLayoutClick={handleLayoutClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onSlotDrop={handleSlotDrop}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      />

      <div
        className={`fixed md:relative inset-y-0 right-0 z-40 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        <LayoutSidebar
          isAddMode={isAddMode}
          onToggleAddMode={toggleAddMode}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onUnassignDrop={handleUnassignDrop}
        />
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
};

export default RestaurantLayout;
