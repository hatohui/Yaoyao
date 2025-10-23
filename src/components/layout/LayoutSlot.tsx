"use client";

import React, { useState, useRef, useCallback } from "react";
import { TableObject } from "@/types/models/table";
import TableControl from "./TableControl";
import DragObject from "./DragAndDropKit/DragControls/DragObject";
import useLayoutMutations from "@/hooks/layout/useLayoutMutations";

type LayoutSlotProps = {
  slot: TableObject;
};

const LayoutSlot = ({ slot }: LayoutSlotProps) => {
  const [isLocked, setIsLocked] = useState(false);
  const isHoveringRef = useRef(false);
  const isDraggingRef = useRef(false);
  const controlsRef = useRef<HTMLDivElement>(null);
  const { updateLayout } = useLayoutMutations();

  const onDragEnd = useCallback(
    (id: string, x: number, y: number) => {
      console.log(`Table ${id} dragged to (${x}, ${y})`);

      isDraggingRef.current = false;
      if (controlsRef.current && isHoveringRef.current) {
        controlsRef.current.style.display = "flex";
      }
      updateLayout.mutate({
        id: id,
        data: {
          positionX: x,
          positionY: y,
        },
      });
    },
    [updateLayout]
  );

  const onDragStart = useCallback(() => {
    isDraggingRef.current = true;
    if (controlsRef.current) {
      controlsRef.current.style.display = "none";
    }
  }, []);

  const handleLock = useCallback(() => {
    setIsLocked((prev) => !prev);
  }, []);

  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
    if (controlsRef.current && !isDraggingRef.current) {
      controlsRef.current.style.display = "flex";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    if (controlsRef.current) {
      controlsRef.current.style.display = "none";
    }
  }, []);

  const handleAssignTable = useCallback(() => {
    console.log("Assign Table");
  }, []);

  const handleDeleteTable = useCallback(() => {
    console.log("Delete Table");
  }, []);

  return (
    <DragObject
      id={String(slot.id) ?? ""}
      x={slot.positionX}
      y={slot.positionY}
      enabled={!isLocked}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      <div
        className={`size-40 border-2 border-black bg-white ${
          isLocked ? "opacity-60" : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={controlsRef} style={{ display: "none" }}>
          <TableControl
            isLocked={isLocked}
            onLock={handleLock}
            onAssignTable={handleAssignTable}
            onDeleteTable={handleDeleteTable}
          />
        </div>
        <p>Index {slot.id}</p>
        <p>{isLocked ? "Locked" : "Unlocked"}</p>
        <p>
          Position: ({slot.positionX}, {slot.positionY})
        </p>
        <p>Table: {slot.table.name} </p>
      </div>
    </DragObject>
  );
};

export default LayoutSlot;
