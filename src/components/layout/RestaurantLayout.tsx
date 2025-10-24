"use client";
import React, { useState, useCallback } from "react";
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
    setIsPanning,
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

  // Track if a slot is being dragged to prevent canvas panning
  const [isSlotDragging, setIsSlotDragging] = useState(false);

  const handleLayoutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleLayoutClickBase(e, isAddMode);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMouseMoveBase(e, isAddMode);
  };

  const handleSlotDragStart = useCallback(() => {
    setIsSlotDragging(true);
    setIsPanning(false);
  }, [setIsPanning]);

  const handleSlotDragEnd = useCallback(() => {
    setIsSlotDragging(false);
  }, []);

  // Conditional touch handlers - only enable when not dragging a slot
  const conditionalTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!isSlotDragging) {
        handleTouchStart(e);
      }
    },
    [isSlotDragging, handleTouchStart]
  );

  const conditionalTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isSlotDragging) {
        handleTouchMove(e);
      }
    },
    [isSlotDragging, handleTouchMove]
  );

  const conditionalTouchEnd = useCallback(() => {
    if (!isSlotDragging) {
      handleTouchEnd();
    }
  }, [isSlotDragging, handleTouchEnd]);

  if (isLoading) {
    return <LayoutLoadingState />;
  }

  if (!slots) {
    return <LayoutErrorState isError={isError} error={error} />;
  }

  return (
    <div className="flex h-full overflow-hidden">
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
        isSlotDragging={isSlotDragging}
        onLayoutClick={handleLayoutClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onSlotDrop={handleSlotDrop}
        onSlotDragStart={handleSlotDragStart}
        onSlotDragEnd={handleSlotDragEnd}
        onTouchStart={conditionalTouchStart}
        onTouchMove={conditionalTouchMove}
        onTouchEnd={conditionalTouchEnd}
        onWheel={handleWheel}
      />

      <div
        className={`fixed md:relative inset-y-0 right-0 z-40 h-full transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        <LayoutSidebar
          isAddMode={isAddMode}
          isMobile={isMobile}
          onToggleAddMode={toggleAddMode}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onUnassignDrop={handleUnassignDrop}
          onCloseSidebar={closeSidebar}
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
