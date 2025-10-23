"use client";
import React, { useState } from "react";
import { TableObject } from "@/types/models/table";
import Area from "./DragAndDropKit/Area";
import DragObject from "./DragAndDropKit/DragControls/DragObject";
import DragZone from "./DragAndDropKit/DragControls/DragZone";
import "./style.css";
import Table from "./Table";

const RestaurantLayout = () => {
  const [enabled] = useState(true);

  const tables: TableObject[] = [
    {
      id: "table-1",
      x: 100, // Pixel position
      y: 100, // Pixel position
    },
  ];

  const onDragEnd = (id: string, x: number, y: number) => {
    console.log(`Table ${id} dragged to position (${x}, ${y})`);
  };

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
          <DragObject
            key={table.id}
            id={table.id}
            x={table.x}
            y={table.y}
            enabled={enabled}
            onDragEnd={onDragEnd}
          >
            <Table />
          </DragObject>
        ))}
      </DragZone>
    </div>
  );
};

export default RestaurantLayout;
