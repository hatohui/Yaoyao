"use client";
import React from "react";
import Area from "./DragAndDropKit/Area";
import DragZone from "./DragAndDropKit/DragControls/DragZone";
import "./style.css";
import Table from "./Table";
import { useLayouts } from "@/hooks/layout/useLayouts";

const RestaurantLayout = () => {
  const { data: tables, isLoading } = useLayouts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!tables) {
    return <div>No layout data available.</div>;
  }

  return (
    <div className="wall relative max-w-7xl aspect-[2/1] mx-2 lg:mx-36 overflow-auto">
      <section className="absolute grid grid-cols-[1fr_4fr] grid-rows-3 h-full w-full">
        <Area full noBottom />
        <Area full noBottom />
        <Area full noTop noBottom />
        <Area full noTop noBottom />
        <Area full noTop />
        <Area full noTop />
      </section>
      <DragZone
        id="layout"
        className="h-full w-full"
        width={1400}
        height={700}
        responsive
      >
        {tables.map((table) => (
          <Table key={table.id} table={table} />
        ))}
      </DragZone>
    </div>
  );
};

export default RestaurantLayout;
