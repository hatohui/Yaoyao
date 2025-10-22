"use client";
import React, { useRef } from "react";
import { GetTablesResponse } from "@/types/api/table/GET";
import TableCard from "./TableCard";

type TableMapGridProps = {
  tables: GetTablesResponse[];
  buildUrlWithParams: (tableId: string) => string;
};

const TableMapGrid = ({ tables, buildUrlWithParams }: TableMapGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
    >
      {tables.map((table) => (
        <div key={table.id}>
          <TableCard table={table} buildUrlWithParams={buildUrlWithParams} />
        </div>
      ))}
    </div>
  );
};

export default TableMapGrid;
