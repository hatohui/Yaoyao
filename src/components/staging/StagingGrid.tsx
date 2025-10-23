"use client";
import React from "react";
import { useCardStaggerAnimation } from "@/hooks/common/useAnimations";
import StagingTableCard from "./StagingTableCard";
import AddTableCard from "@/components/dashboard/tables/AddTableCard";
import { GetStagingTablesResponse } from "@/types/api/staging/GET";

type StagingGridProps = {
  tables: GetStagingTablesResponse[];
  isLastPage?: boolean;
};

const StagingGrid = ({ tables, isLastPage }: StagingGridProps) => {
  const cardsRef = useCardStaggerAnimation();

  return (
    <div
      ref={cardsRef}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden"
    >
      {tables.map((table) => {
        const peopleWithInfo = (table.people || []).map((person) => ({
          ...person,
          isLeader: table.tableLeader?.id === person.id,
          isDuplicate: false, // Can implement duplicate detection if needed
        }));

        return (
          <div key={table.id} data-animate-card className="min-w-0">
            <StagingTableCard
              tableName={table.name}
              tableId={table.id}
              people={peopleWithInfo}
              capacity={table.capacity}
              referenceId={table.referenceId}
            />
          </div>
        );
      })}

      {/* Add Table Card */}
      {isLastPage && (
        <div data-animate-card className="min-w-0">
          <AddTableCard isStaging={true} />
        </div>
      )}
    </div>
  );
};

export default StagingGrid;
