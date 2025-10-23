"use client";
import React from "react";
import useStagingTables from "@/hooks/staging/useStagingTables";
import useStagingFilters from "@/hooks/staging/useStagingFilters";
import Loading from "@/components/common/Loading";
import StagingControls from "@/components/staging/StagingControls";
import StagingGrid from "@/components/staging/StagingGrid";
import StagingEmpty from "@/components/staging/StagingEmpty";
import Pagination from "@/components/common/Pagination";

type TablesStagingViewProps = {
  searchQuery: string;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onSwitchToProduction?: () => void;
};

const TablesStagingView = ({
  searchQuery,
  currentPage = 1,
  onPageChange,
  onSwitchToProduction,
}: TablesStagingViewProps) => {
  const { data, isLoading } = useStagingTables({
    page: currentPage,
    search: searchQuery,
  });
  const { filteredTables, hasSearchQuery } = useStagingFilters(data?.tables);

  if (isLoading) {
    return <Loading />;
  }

  const pagination = data?.pagination;
  const isLastPage = pagination ? currentPage >= pagination.totalPages : false;

  return (
    <div className="flex flex-col h-full">
      <StagingControls onSwitchToProduction={onSwitchToProduction} />

      <div className="mt-6 flex-1 flex flex-col">
        {filteredTables.length > 0 ? (
          <>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {pagination?.total || filteredTables.length}{" "}
              {(pagination?.total || filteredTables.length) === 1
                ? "table"
                : "tables"}
              {hasSearchQuery && " (filtered)"}
            </p>
            <div className="flex-1">
              <StagingGrid tables={filteredTables} isLastPage={isLastPage} />
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && onPageChange && (
              <div className="mt-auto pt-4 pb-2">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={onPageChange}
                  className="border-t border-slate-200 dark:border-slate-700"
                />
              </div>
            )}
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
