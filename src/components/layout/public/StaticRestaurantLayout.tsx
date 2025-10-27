"use client";

import "../style.css";
import { useLayouts } from "@/hooks/layout/useLayouts";
import Loading from "@/components/common/Loading";
import LayoutErrorState from "../states/LayoutErrorState";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import FirstFloor from "../floors/FirstFloor";
import SecondFloor from "../floors/SecondFloor";
import DragZone from "../DragAndDropKit/DragControls/DragZone";
import { DRAG_ZONE_HEIGHT, DRAG_ZONE_WIDTH } from "@/config/app";
import TableSlotContent from "../TableSlotContent";
import {
  getSlotColorClasses,
  hasAssignedTable,
  isTableLinked,
} from "@/utils/layout/slotUtils";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  FiMapPin,
  FiInfo,
  FiZoomIn,
  FiZoomOut,
  FiMaximize2,
} from "react-icons/fi";
import { useMobileDetection } from "@/hooks/layout/useMobileDetection";
import { useLayoutZoom } from "@/hooks/layout/useLayoutZoom";

const StaticRestaurantLayout = () => {
  const [zone, setZone] = useState<number>(1);
  const { data, isLoading, isError, error } = useLayouts();
  const t = useTranslations("layout");
  const isMobile = useMobileDetection();

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
  } = useLayoutZoom(isMobile);

  const slots = useMemo(
    () => data?.filter((slot) => slot.zone === zone) || [],
    [data, zone]
  );

  const wallRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wallRef.current) return;

    slots.forEach((slot) => {
      const el = wallRef.current!.querySelector(
        `[data-slot-id\="${slot.id}"]`
      ) as HTMLElement | null;

      if (!el) return;

      // Ensure absolute positioning so translate(x,y) works as expected
      el.style.position = "absolute";
      el.style.left = "0";
      el.style.top = "0";

      // Use gsap to set the transform so it matches draggable layout objects
      gsap.set(el, {
        x: slot.positionX ?? 0,
        y: slot.positionY ?? 0,
      });
    });
  }, [slots]);

  if (isLoading) {
    return (
      <div className="flex-1 h-screen overflow-hidden p-4 md:p-8">
        <div className="max-w-7xl mx-auto mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FiMapPin className="w-7 h-7 md:w-8 md:h-8 text-main" />
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              {t("publicTitle")}
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base ml-10 md:ml-11">
            {t("publicSubtitle")}
          </p>
        </div>
        <div className="wall relative max-w-7xl aspect-[2/1] mx-auto shadow-2xl rounded-lg overflow-hidden">
          <div className="h-full w-full flex items-center justify-center">
            <Loading message="Loading layout..." />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <LayoutErrorState
        isError={Boolean(isError)}
        error={error as Error | null}
      />
    );
  }

  return (
    <div className="flex-1 h-screen overflow-hidden p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FiMapPin className="w-7 h-7 md:w-8 md:h-8 text-main" />
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            {t("publicTitle")}
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base ml-10 md:ml-11">
          {t("publicSubtitle")}
        </p>
        {/* Info banner */}
        <div className="mt-4 ml-10 md:ml-11 flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <FiInfo className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700 dark:text-amber-300">
            {t("publicInfoBanner")}
          </p>
        </div>
      </div>

      {/* Floor selector and zoom controls - positioned outside zoomable area on mobile */}
      <div className="max-w-7xl mx-auto mb-4 flex justify-between items-center md:hidden">
        <select
          id="zone-select-mobile"
          value={zone}
          onChange={(e) => setZone(Number(e.target.value))}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-white px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value={1}>{t("firstFloor")}</option>
          <option value={2}>{t("secondFloor")}</option>
        </select>

        {/* Mobile zoom controls */}
        <div className="flex gap-2">
          <button
            onClick={zoomOut}
            className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            aria-label="Zoom out"
          >
            <FiZoomOut className="w-5 h-5 text-slate-700 dark:text-white" />
          </button>
          <button
            onClick={resetZoom}
            className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            aria-label="Reset zoom"
          >
            <FiMaximize2 className="w-5 h-5 text-slate-700 dark:text-white" />
          </button>
          <button
            onClick={zoomIn}
            className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            aria-label="Zoom in"
          >
            <FiZoomIn className="w-5 h-5 text-slate-700 dark:text-white" />
          </button>
        </div>
      </div>

      <div
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        style={{
          touchAction: "none",
        }}
      >
        <div
          className="wall relative max-w-7xl aspect-[2/1] mx-auto shadow-2xl rounded-lg overflow-hidden"
          style={{
            transform: isMobile
              ? `translate(${position.x}px, ${position.y}px) scale(${scale})`
              : undefined,
            transition: isPanning ? "none" : "transform 0.2s ease-out",
            touchAction: "none",
            cursor:
              isMobile && isPanning
                ? "grabbing"
                : isMobile
                ? "grab"
                : "default",
          }}
        >
          {/* Floor selector (desktop only - inside canvas) */}
          <div className="absolute top-4 right-4 z-20 hidden md:block">
            <label htmlFor="zone-select" className="sr-only">
              {t("selectFloor")}
            </label>
            <select
              id="zone-select"
              value={zone}
              onChange={(e) => setZone(Number(e.target.value))}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-white px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={1}>{t("firstFloor")}</option>
              <option value={2}>{t("secondFloor")}</option>
            </select>
          </div>

          <DragZone
            id="layout"
            className="h-full w-full"
            width={DRAG_ZONE_WIDTH}
            height={DRAG_ZONE_HEIGHT}
            responsive
          >
            {/* inner wrapper is positioned relative so children can be absolutely positioned */}
            <div ref={wallRef} className="h-full w-full relative">
              {/* Flooring */}
              {zone == 1 && <FirstFloor />}
              {zone == 2 && <SecondFloor />}
              {slots.map((slot) => {
                const hasTable = hasAssignedTable(slot);
                const isLinked = isTableLinked(slot);
                const slotColorClasses = getSlotColorClasses(
                  hasTable,
                  isLinked,
                  false
                );

                // If slot has a table, wrap in Link
                if (hasTable && slot.table) {
                  return (
                    <Link
                      key={slot.id}
                      href={`/tables/${slot.table.id}`}
                      data-slot-id={slot.id}
                      className={`block w-40 h-32 border-2 rounded-xl transition-all duration-300 ease-in-out ${slotColorClasses} hover:shadow-xl hover:scale-105 hover:ring-2 hover:ring-main/50 cursor-pointer`}
                    >
                      <div className="p-3 h-full flex flex-col justify-between">
                        <TableSlotContent slot={slot} isLinked={isLinked} />
                      </div>
                    </Link>
                  );
                }
              })}
            </div>
          </DragZone>
        </div>
      </div>
    </div>
  );
};

export default StaticRestaurantLayout;
