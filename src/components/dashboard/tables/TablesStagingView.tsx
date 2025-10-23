"use client";
import React from "react";
import useStagingTables from "@/hooks/staging/useStagingTables";
import useStagingFilters from "@/hooks/staging/useStagingFilters";
import Loading from "@/components/common/Loading";
import StagingControls from "@/components/staging/StagingControls";
import StagingGrid from "@/components/staging/StagingGrid";
import StagingEmpty from "@/components/staging/StagingEmpty";
import Pagination from "@/components/common/Pagination";
import SortButton from "./SortButton";

type TablesStagingViewProps = {
  searchQuery: string;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onSwitchToProduction?: () => void;
  sortDirection?: "asc" | "desc";
  onSortChange?: (direction: "asc" | "desc" | undefined) => void;
};

const TablesStagingView = ({
  searchQuery,
  currentPage = 1,
  onPageChange,
  onSwitchToProduction,
  sortDirection: externalSortDirection,
  onSortChange,
}: TablesStagingViewProps) => {
  const { data, isLoading } = useStagingTables({
    page: currentPage,
    search: searchQuery,
    direction: externalSortDirection,
  });
  const { filteredTables, hasSearchQuery } = useStagingFilters(data?.tables);

  const isSorted = !!externalSortDirection;
  const sortDirection = externalSortDirection || "asc";

  const handleSort = () => {
    if (!onSortChange) return;

    if (!isSorted) {
      onSortChange("asc");
      return;
    }

    if (isSorted && sortDirection === "asc") {
      onSortChange("desc");
    } else if (sortDirection === "desc") {
      onSortChange(undefined);
    }
  };

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
            <div className="flex w-full items-center justify-between mb-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {pagination?.total || filteredTables.length}{" "}
                {(pagination?.total || filteredTables.length) === 1
                  ? "table"
                  : "tables"}
                {hasSearchQuery && " (filtered)"}
              </p>
              <SortButton
                isSorted={isSorted}
                direction={sortDirection}
                handleSort={handleSort}
              />
            </div>
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
