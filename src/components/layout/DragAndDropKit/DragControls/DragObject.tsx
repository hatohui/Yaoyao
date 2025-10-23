"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { useDragContainer } from "./DragContext";

gsap.registerPlugin(useGSAP, Draggable);

/**
 * Internal state used by the DragObject component.
 *
 * x/y are pixel coordinates in the DragZone's coordinate space. When
 * `DragZone.enableResponsiveScaling` is active those coordinates are defined
 * relative to the `width`/`height` base size and the whole content is scaled
 * using CSS transform to fit the real container.
 */
export type DragObjectState = {
  x: number;
  y: number;
  enabled: boolean;
};

/**
 * Props for DragObject
 *
 * - `x` / `y` are pixel coordinates inside the DragZone base coordinate
 *   system. If the DragZone scales the entire content these values should be
 *   provided relative to the DragZone `width` / `height` and will visually
 *   scale.
 * - `width` / `height` define the object's size and are used for optional
 *   collision detection.
 * - `onPositionChange` receives the updated coordinates after drag. These
 *   values are in the same coordinate system as the incoming `x`/`y`.
 */
type DragObjectProps = {
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  enabled?: boolean;
  hasCollision?: boolean;
  onPositionChange?: (id: string, x: number, y: number) => void;
  onDragEnd?: (id: string, x: number, y: number) => void;
  onDragStart?: () => void;
  children?: React.ReactNode;
  className?: string;
  lockedClassName?: string;
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
  lockedClassName = "",
  hasCollision = false,
  onPositionChange,
  onDragEnd,
  onDragStart,
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

  useEffect(() => {
    setState((prev) => ({ ...prev, enabled }));
  }, [enabled]);

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
    onDragStart?.();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      draggableInstance.current = Draggable.create(objectRef.current, {
        type: "x,y",
        bounds: containerRef?.current || undefined,
        edgeResistance: 0.65,
        inertia: true,
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
          if (hasCollision && checkCollision()) {
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

      gsap.set(objectRef.current, { x: state.x, y: state.y });
    },
    {
      dependencies: [
        handleDragEnd,
        handleDragStart,
        checkCollision,
        hasCollision,
        state.x,
        state.y,
        id,
        onPositionChange,
      ],
      revertOnUpdate: true,
      scope: containerRef?.current ? containerRef : undefined,
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

  return (
    <div
      ref={objectRef}
      className={`absolute select-none ${className} ${
        state.enabled ? "cursor-grab active:cursor-grabbing" : lockedClassName
      }`}
      style={{
        touchAction: state.enabled ? "none" : "auto",
        zIndex: isDragging ? 9999 : "auto",
      }}
    >
      {children || (
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
          <div className="font-bold mb-1">Object #{id}</div>
          <div className="text-xs opacity-80">Container: {containerId}</div>
          <div className="text-xs opacity-80">
            x: {Math.round(state.x)}, y: {Math.round(state.y)}
          </div>
        </div>
      )}
    </div>
  );
};

export default DragObject;
