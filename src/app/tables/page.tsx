"use client";
import TableHeader from "@/components/table/TableHeader";
import TableMap from "@/components/table/TableMap";
import Pagination from "@/components/common/Pagination";
import { TABLE_PUBLIC_ENABLED } from "@/config/app";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import usePagination from "@/hooks/common/usePagination";
import useSearch from "@/hooks/common/useSearch";
import useTables from "@/hooks/table/useTables";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

const TableStagingPage = () => {
  const t = useTranslations("tables");
  const { isYaoyao } = useYaoAuth();
  const { searchQuery } = useSearch();
  const { currentPage, goToPage, resetPage } = usePagination();
  const { data } = useTables({ page: currentPage, search: searchQuery });

  // Reset to page 1 when search changes
  useEffect(() => {
    if (currentPage !== 1) {
      resetPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <div className="nav-spacer bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      {/* Header Section */}
      <TableHeader />

      {/* Main Content */}
      {TABLE_PUBLIC_ENABLED || isYaoyao ? (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
          <TableMap page={currentPage} searchQuery={searchQuery} />

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
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
          <p className="text-center text-gray-500 dark:text-slate-400 text-sm sm:text-base">
            {t("noTables")}
          </p>
        </div>
      )}
    </div>
  );
};

export default TableStagingPage;
