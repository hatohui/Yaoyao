"use client";
import TableMap from "@/components/table/TableMap";
import Pagination from "@/components/common/Pagination";
import SearchBar from "@/components/common/SearchBar";
import SortDropdown, { SortOption } from "@/components/common/SortDropdown";
import { TABLE_PUBLIC_ENABLED } from "@/config/app";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import usePagination from "@/hooks/common/usePagination";
import useSearch from "@/hooks/common/useSearch";
import useTables from "@/hooks/table/useTables";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const TableStagingPage = () => {
  const t = useTranslations("tables");
  const { isYaoyao } = useYaoAuth();
  const { searchQuery } = useSearch();
  const { currentPage, goToPage, resetPage } = usePagination();
  const [sortOption, setSortOption] = useState<SortOption>("none");

  // Convert sort option to direction and sortBy
  const getSortParams = (option: SortOption) => {
    switch (option) {
      case "name-asc":
        return { direction: "asc" as const, sortBy: "name" as const };
      case "name-desc":
        return { direction: "desc" as const, sortBy: "name" as const };
      case "number-asc":
        return { direction: "asc" as const, sortBy: "layout" as const };
      case "number-desc":
        return { direction: "desc" as const, sortBy: "layout" as const };
      default:
        return { direction: undefined, sortBy: undefined };
    }
  };

  const { direction, sortBy } = getSortParams(sortOption);
  const { data } = useTables({
    page: currentPage,
    search: searchQuery,
    direction,
    sortBy,
  });

  return (
    <div className="nav-spacer anti-nav min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 space-y-4">
        <SearchBar
          placeholder={t("searchPlaceholder") || "Search for tables..."}
          hint={t("searchHint") || "Search by table's name, number or people"}
        />
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
            {t("sortBy") || "Sort by:"}
          </span>
          <SortDropdown value={sortOption} onChange={setSortOption} />
        </div>
      </div>

      {/* Main Content */}
      {TABLE_PUBLIC_ENABLED || isYaoyao ? (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pb-8">
          <TableMap
            page={currentPage}
            searchQuery={searchQuery}
            resetPage={resetPage}
            direction={direction}
            sortBy={sortBy}
          />

          {data && data.pagination.totalPages > 1 && (
            <Pagination
              currentPage={data.pagination.page}
              totalPages={data.pagination.totalPages}
              onPageChange={goToPage}
              className="mt-6"
            />
          )}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pb-8">
          <p className="text-center text-gray-500 dark:text-slate-400 text-sm sm:text-base">
            {t("noTables")}
          </p>
        </div>
      )}
    </div>
  );
};

export default TableStagingPage;
