"use client";
import React from "react";
import { useCardStaggerAnimation } from "@/hooks/common/useAnimations";
import StagingTableCard from "./StagingTableCard";
import AddTableCard from "@/components/dashboard/tables/AddTableCard";
import { GetStagingTablesResponse } from "@/types/api/staging/GET";

type StagingGridProps = {
  tables: GetStagingTablesResponse[];
};

const StagingGrid = ({ tables }: StagingGridProps) => {
  const cardsRef = useCardStaggerAnimation();

  return (
    <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {tables.map((table) => {
        const peopleWithInfo = (table.people || []).map((person) => ({
          ...person,
          isLeader: table.tableLeader?.id === person.id,
          isDuplicate: false, // Can implement duplicate detection if needed
        }));

        return (
          <div key={table.id} data-animate-card>
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
      <div data-animate-card>
        <AddTableCard isStaging={true} />
      </div>
    </div>
  );
};

export default StagingGrid;
