"use client";
import React from "react";
import useStagingTables from "@/hooks/staging/useStagingTables";
import useStagingFilters from "@/hooks/staging/useStagingFilters";
import Loading from "@/components/common/Loading";
import StagingControls from "@/components/staging/StagingControls";
import StagingGrid from "@/components/staging/StagingGrid";
import StagingEmpty from "@/components/staging/StagingEmpty";

type TablesStagingViewProps = {
  searchQuery: string;
  onSwitchToProduction?: () => void;
};

const TablesStagingView = ({
  searchQuery,
  onSwitchToProduction,
}: TablesStagingViewProps) => {
  const { data, isLoading } = useStagingTables({ count: 100 });
  const { filteredTables, hasSearchQuery } = useStagingFilters(data?.tables);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <StagingControls onSwitchToProduction={onSwitchToProduction} />

      <div className="mt-6">
        {filteredTables.length > 0 ? (
          <>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {filteredTables.length}{" "}
              {filteredTables.length === 1 ? "table" : "tables"}
              {hasSearchQuery && " (filtered)"}
            </p>
            <StagingGrid tables={filteredTables} />
          </>
        ) : (
          <StagingEmpty
            hasSearchQuery={hasSearchQuery}
            searchQuery={searchQuery}
          />
        )}
      </div>
    </div>
  );
};

export default TablesStagingView;
