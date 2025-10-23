"use client";
import React, { createContext, useContext, useRef, useCallback } from "react";

export type DragObjectInfo = {
  id: string;
  ref: React.RefObject<HTMLDivElement | null>;
  width: number;
  height: number;
  hasCollision: boolean;
};

type DragContainerContextType = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  containerId: string;
  registerObject: (info: DragObjectInfo) => void;
  unregisterObject: (id: string) => void;
  getOtherObjects: (excludeId: string) => DragObjectInfo[];
};

const DragContainerContext = createContext<DragContainerContextType | null>(
  null
);

export const useDragContainer = () => {
  const context = useContext(DragContainerContext);
  if (!context) {
    throw new Error("useDragContainer must be used within a DragZone");
  }
  return context;
};

export const DragContainerProvider: React.FC<{
  containerId: string;
  children: React.ReactNode;
}> = ({ containerId, children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const objectsRegistry = useRef<Map<string, DragObjectInfo>>(new Map());

  const registerObject = useCallback((info: DragObjectInfo) => {
    objectsRegistry.current.set(info.id, info);
  }, []);

  const unregisterObject = useCallback((id: string) => {
    objectsRegistry.current.delete(id);
  }, []);

  const getOtherObjects = useCallback((excludeId: string): DragObjectInfo[] => {
    return Array.from(objectsRegistry.current.values()).filter(
      (obj) => obj.id !== excludeId
    );
  }, []);

  return (
    <DragContainerContext.Provider
      value={{
        containerRef,
        containerId,
        registerObject,
        unregisterObject,
        getOtherObjects,
      }}
    >
      {children}
    </DragContainerContext.Provider>
  );
};
