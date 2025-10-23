"use client";
import { useRef, useEffect } from "react";
import { useDragContainer } from "./DragContext";

export type CollisionConfig = {
  id: string;
  width: number;
  height: number;
  enabled?: boolean;
};

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
