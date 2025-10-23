"use client";
import React from "react";
import { DragContainerProvider, useDragContainer } from "./DragContext";

/**
 * Props for DragZone
 *
 * - `width` / `height` set the container dimensions AND define the base
 *   coordinate space for drag objects. When `enableResponsiveScaling` is
 *   true, the content is scaled down to fit while maintaining aspect ratio.
 */
type DragZoneProps = {
  id: string;
  children?: React.ReactNode;
  className?: string;
  width?: number; // Container width and base coordinate system width (px)
  height?: number; // Container height and base coordinate system height (px)
  responsive?: boolean;
};

/**
 * Props for `DragZone`.
 *
 * - `width` / `height`: set container dimensions AND the base coordinate
 *   system used for pixel positions (units: pixels).
 *
 * Only the ratio between width and height matters for the coordinate system.
 *
 * @property {string} id - Unique container id (required).
 * @property {number} [width=1400] - Base container width in px.
 * @property {number} [height=700] - Base container height in px.
 * @property {boolean} [responsive] - When true the content
 *   is scaled down to fit smaller viewports while keeping aspect ratio.
 */
const DragZone = ({
  id,
  children,
  className = "",
  width = 1400,
  height = 700,
  responsive = false,
}: DragZoneProps) => {
  return (
    <DragContainerProvider containerId={id}>
      <DragZoneContent
        id={id}
        className={className}
        width={width}
        height={height}
        enableResponsiveScaling={responsive}
      >
        {children}
      </DragZoneContent>
    </DragContainerProvider>
  );
};

const DragZoneContent: React.FC<{
  id: string;
  className: string;
  width: number;
  height: number;
  enableResponsiveScaling: boolean;
  children?: React.ReactNode;
}> = ({ id, className, width, height, enableResponsiveScaling, children }) => {
  const { containerRef } = useDragContainer();
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    if (!enableResponsiveScaling || !wrapperRef.current) return;

    const updateScale = () => {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const scaleX = rect.width / width;
      const scaleY = rect.height / height;

      // Use the smaller scale to maintain aspect ratio
      const newScale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 100%
      setScale(newScale);
    };

    // Initial scale calculation
    updateScale();

    // Watch for resize
    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(wrapperRef.current);

    // Also listen to window resize for margin changes
    window.addEventListener("resize", updateScale);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, [enableResponsiveScaling, width, height]);

  const innerStyle: React.CSSProperties = enableResponsiveScaling
    ? {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: `${width}px`,
        height: `${height}px`,
      }
    : {};

  return (
    <div
      ref={wrapperRef}
      id={id}
      className={`relative border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800/50 overflow-hidden ${className}`}
    >
      <div ref={containerRef} style={innerStyle}>
        {children}
      </div>
    </div>
  );
};

export default DragZone;
