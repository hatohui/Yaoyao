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
import EmptySlotContent from "../EmptySlotContent";

const StaticRestaurantLayout = () => {
  const [zone, setZone] = useState<number>(1);
  const { data, isLoading, isError, error } = useLayouts();

  // derive slots for the selected zone
  const slots = useMemo(
    () => data?.filter((slot) => slot.zone === zone) || [],
    [data, zone]
  );

  const wallRef = useRef<HTMLDivElement | null>(null);

  // Apply GSAP transforms to each slot element in the static view
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
      <div className="wall relative max-w-7xl aspect-[2/1] mx-auto shadow-2xl rounded-lg overflow-hidden">
        <div className="h-full w-full flex items-center justify-center">
          <Loading message="Loading layout..." />
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
    <div className="wall relative max-w-7xl aspect-[2/1] mx-auto shadow-2xl rounded-lg overflow-hidden">
      <div className="absolute top-4 right-4 z-20">
        <label htmlFor="zone-select" className="sr-only">
          Select floor
        </label>
        <select
          id="zone-select"
          value={zone}
          onChange={(e) => setZone(Number(e.target.value))}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-white px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value={1}>First Floor</option>
          <option value={2}>Second Floor</option>
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
            // Derived state
            const hasTable = hasAssignedTable(slot);
            const isLinked = isTableLinked(slot);
            const slotColorClasses = getSlotColorClasses(
              hasTable,
              isLinked,
              false
            );

            return (
              <div
                key={slot.id}
                data-slot-id={slot.id}
                className={`w-40 h-32 border-2 rounded-xl transition-all duration-300 ease-in-out ${slotColorClasses} hover:shadow-xl hover:scale-105`}
              >
                <div className="p-3 h-full flex flex-col justify-between">
                  {hasTable ? (
                    <TableSlotContent slot={slot} isLinked={isLinked} />
                  ) : (
                    <EmptySlotContent slotId={slot.id} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DragZone>
    </div>
  );
};

export default StaticRestaurantLayout;
