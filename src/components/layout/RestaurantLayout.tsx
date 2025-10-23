"use client";
import React, { useState } from "react";
import Area from "./components/Area";
import "./style.css";
import DragZone from "./components/DragControls/DragZone";
import DragObject from "./components/DragControls/DragObject";
import { TableObject } from "@/types/models/table";

const RestaurantLayout = () => {
  const [enabled] = useState(true);

  const tables: TableObject[] = [
    {
      id: "table-1",
      x: 100, // Pixel position
      y: 100, // Pixel position
    },
  ];

  return (
    <DragZone
      id="layout"
      className="grid grid-cols-[1fr_4fr] grid-rows-3 wall max-w-7xl aspect-[2/1] mx-2 lg:mx-36 overflow-auto"
      width={1400}
      height={700}
      responsive
    >
      <Area full noBottom />
      <Area full noBottom />
      <Area full noTop noBottom />
      <Area full noTop noBottom />
      <Area full noTop />
      <Area full noTop />
      {tables.map((table) => (
        <DragObject
          key={table.id}
          id={table.id}
          x={table.x}
          y={table.y}
          enabled={enabled}
        />
      ))}
    </DragZone>
  );
};

export default RestaurantLayout;
