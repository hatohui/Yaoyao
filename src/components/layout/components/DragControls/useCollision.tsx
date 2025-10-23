"use client";
import { useRef, useEffect } from "react";
import { useDragContainer } from "./DragContext";

export type CollisionConfig = {
  id: string;
  width: number;
  height: number;
  enabled?: boolean;
};

/**
 * Hook to register a static collision object (like walls, obstacles)
 * that other draggable objects should not overlap with.
 *
 * @example
 * ```tsx
 * const Wall = ({ id, x, y, width, height }) => {
 *   const ref = useCollision({ id, width, height });
 *   return (
 *     <div
 *       ref={ref}
 *       className="absolute bg-gray-800"
 *       style={{ left: x, top: y, width, height }}
 *     />
 *   );
 * };
 * ```
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
