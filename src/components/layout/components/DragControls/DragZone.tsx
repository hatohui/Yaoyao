"use client";
import React from "react";
import { DragContainerProvider, useDragContainer } from "./DragContext";

type DragZoneProps = {
  id: string;
  children?: React.ReactNode;
  className?: string;
  height?: number | string;
  width?: number | string;
};

const DragZone = ({
  id,
  children,
  className = "",
  height,
  width,
}: DragZoneProps) => {
  const style = (function getStyle() {
    const style: React.CSSProperties = {};

    if (height) {
      style.height = height ?? "auto";
    }

    if (width) {
      style.width = width ?? "auto";
    }

    return style;
  })();

  return (
    <DragContainerProvider containerId={id}>
      <DragZoneContent id={id} style={style} className={className}>
        {children}
      </DragZoneContent>
    </DragContainerProvider>
  );
};

const DragZoneContent: React.FC<{
  id: string;
  style: React.CSSProperties;
  className: string;
  children?: React.ReactNode;
}> = ({ id, style, className, children }) => {
  const { containerRef } = useDragContainer();

  return (
    <div
      ref={containerRef}
      id={id}
      style={style}
      className={`relative border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800/50 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default DragZone;
