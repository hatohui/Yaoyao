"use client";
import React, { useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { useDragContainer } from "./DragContext";

gsap.registerPlugin(useGSAP, Draggable);

export type DragObjectState = {
  x: number;
  y: number;
  enabled: boolean;
};

type DragObjectProps = {
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  enabled?: boolean;
  canSwitchContainers?: boolean;
  hasCollision?: boolean; // Whether this object should check for collisions
  onPositionChange?: (id: string, x: number, y: number) => void;
  onDragEnd?: (id: string, x: number, y: number) => void;
  children?: React.ReactNode;
  className?: string;
};

const DragObject = ({
  id,
  x,
  y,
  width = 120,
  height = 100,
  enabled = true,
  children,
  className = "",
  canSwitchContainers = false,
  hasCollision = false,
  onPositionChange,
  onDragEnd,
}: DragObjectProps) => {
  const {
    containerRef,
    containerId,
    registerObject,
    unregisterObject,
    getOtherObjects,
  } = useDragContainer();
  const objectRef = useRef<HTMLDivElement>(null);
  const draggableInstance = useRef<Draggable[] | null>(null);
  const lastValidPosition = useRef({ x, y });

  const [state, setState] = useState<DragObjectState>({
    x,
    y,
    enabled,
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = useCallback(
    (newX: number, newY: number) => {
      setState((prev) => ({ ...prev, x: newX, y: newY }));
      setIsDragging(false);
      onDragEnd?.(id, newX, newY);
    },
    [id, onDragEnd]
  );

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    lastValidPosition.current = { x: state.x, y: state.y };
  }, [state.x, state.y]);

  // Collision detection helper
  const checkCollision = useCallback(() => {
    if (!hasCollision || !objectRef.current) return false;

    const otherObjects = getOtherObjects(id);
    const currentRect = objectRef.current.getBoundingClientRect();

    for (const other of otherObjects) {
      if (!other.hasCollision || !other.ref.current) continue;

      const otherRect = other.ref.current.getBoundingClientRect();

      // Check if rectangles overlap
      const isOverlapping = !(
        currentRect.right < otherRect.left ||
        currentRect.left > otherRect.right ||
        currentRect.bottom < otherRect.top ||
        currentRect.top > otherRect.bottom
      );

      if (isOverlapping) {
        return true;
      }
    }

    return false;
  }, [hasCollision, getOtherObjects, id]);

  // Register this object in the collision registry
  useGSAP(
    () => {
      if (hasCollision && objectRef.current) {
        registerObject({
          id,
          ref: objectRef,
          width,
          height,
          hasCollision: true,
        });

        return () => {
          unregisterObject(id);
        };
      }
    },
    {
      dependencies: [
        hasCollision,
        id,
        width,
        height,
        registerObject,
        unregisterObject,
      ],
    }
  );

  useGSAP(
    () => {
      if (!objectRef.current) return;

      const bounds = canSwitchContainers
        ? undefined
        : containerRef?.current || undefined;

      draggableInstance.current = Draggable.create(objectRef.current, {
        type: "x,y",
        bounds: bounds,
        edgeResistance: 0.65,
        inertia: true,
        zIndexBoost: canSwitchContainers,
        onDragStart: function () {
          handleDragStart();
        },
        onDrag: function () {
          // Check for collision during drag if enabled
          if (hasCollision && checkCollision()) {
            // Revert to last valid position
            gsap.set(objectRef.current, {
              x: lastValidPosition.current.x,
              y: lastValidPosition.current.y,
            });
            this.update(); // Update Draggable instance
          } else {
            // Update last valid position if no collision
            lastValidPosition.current = { x: this.x, y: this.y };
          }
        },
        onDragEnd: function () {
          // Final collision check
          if (hasCollision && checkCollision()) {
            // Snap back to last valid position
            gsap.to(objectRef.current, {
              x: lastValidPosition.current.x,
              y: lastValidPosition.current.y,
              duration: 0.3,
              ease: "back.out",
            });
            handleDragEnd(
              lastValidPosition.current.x,
              lastValidPosition.current.y
            );
            onPositionChange?.(
              id,
              lastValidPosition.current.x,
              lastValidPosition.current.y
            );
          } else {
            handleDragEnd(this.x, this.y);
            onPositionChange?.(id, this.x, this.y);
          }
        },
      });

      gsap.set(objectRef.current, { x, y });
    },
    {
      dependencies: [
        canSwitchContainers,
        handleDragEnd,
        handleDragStart,
        checkCollision,
        hasCollision,
        x,
        y,
        id,
        onPositionChange,
      ],
      revertOnUpdate: true,
      scope: containerRef,
    }
  );

  useGSAP(
    () => {
      if (draggableInstance.current) {
        if (state.enabled) {
          draggableInstance.current[0].enable();
        } else {
          draggableInstance.current[0].disable();
        }
      }
    },
    {
      dependencies: [state.enabled],
    }
  );

  const toggleEnabled = () => {
    setState((prev) => ({ ...prev, enabled: !prev.enabled }));
  };

  return (
    <div
      ref={objectRef}
      className={`absolute select-none ${className} ${
        state.enabled
          ? "cursor-grab active:cursor-grabbing"
          : "cursor-not-allowed opacity-60"
      }`}
      style={{
        touchAction: state.enabled ? "none" : "auto",
        zIndex: isDragging && canSwitchContainers ? 9999 : "auto",
        position: canSwitchContainers ? "fixed" : "absolute",
      }}
    >
      <div className="relative">
        {children || (
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
            <div className="font-bold mb-1">Object #{id}</div>
            <div className="text-xs opacity-80">Container: {containerId}</div>
            <div className="text-xs opacity-80">
              x: {Math.round(state.x)}, y: {Math.round(state.y)}
            </div>
          </div>
        )}
        <button
          onClick={toggleEnabled}
          className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold shadow-lg transition-colors ${
            state.enabled
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
          title={state.enabled ? "Disable dragging" : "Enable dragging"}
        >
          {state.enabled ? "✓" : "✗"}
        </button>
      </div>
    </div>
  );
};

export default DragObject;
