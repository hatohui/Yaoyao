"use client";
import { useRef, useEffect } from "react";
import { useDragContainer } from "./DragContext";

/**
 * Configuration for useCollision hook.
 *
 * - `id` unique identifier for the object
 * - `width` / `height` used for collision bounding calculations
 * - `enabled` toggles registration
 */
export type CollisionConfig = {
  id: string;
  width: number;
  height: number;
  enabled?: boolean;
};

/**
 * useCollision
 *
 * Small helper hook that registers a ref in the DragZone collision registry.
 * Returns a ref which should be attached to the draggable element. The hook
 * takes care of registering/unregistering when the element mounts/unmounts.
 *
 * Example:
 * const ref = useCollision({ id: 'table-1', width: 120, height: 100 })
 * <div ref={ref} />
 */
export const useCollision = ({
  id,
  width,
  height,
  enabled = true,
}: CollisionConfig) => {
  const ref = useRef<HTMLDivElement>(null);
  const { registerObject, unregisterObject } = useDragContainer();

  useEffect(() => {
    if (enabled && ref.current) {
      registerObject({
        id,
        ref,
        width,
        height,
        hasCollision: true,
      });

      return () => {
        unregisterObject(id);
      };
    }
  }, [id, width, height, enabled, registerObject, unregisterObject]);

  return ref;
};
