"use client";
import React, { useState, useEffect } from "react";
import useTablesWithPeople from "@/hooks/table/useTablesWithPeople";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import { notFound, useSearchParams } from "next/navigation";
import Loading from "@/components/common/Loading";
import { usePageAnimation } from "@/hooks/common/useAnimations";
import TablesHeader from "@/components/dashboard/tables/TablesHeader";
import TablesNormalView from "@/components/dashboard/tables/TablesNormalView";
import TablesStagingView from "@/components/dashboard/tables/TablesStagingView";
import usePagination from "@/hooks/common/usePagination";

const STAGING_MODE_KEY = "dashboard_tables_staging_mode";

const DashboardTablesPage = () => {
  const { isYaoyao } = useYaoAuth();
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search") || "";

  // Initialize isStaging from localStorage
  const [isStaging, setIsStaging] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STAGING_MODE_KEY);
      return saved === "true";
    }
    return false;
  });

  const { currentPage, goToPage, resetPage } = usePagination();

  // Persist isStaging to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STAGING_MODE_KEY, String(isStaging));
  }, [isStaging]);

  const { data, isLoading } = useTablesWithPeople({
    isStaging: false,
    search: searchQuery,
    page: currentPage,
  });

  const pageRef = usePageAnimation();

  // Reset to page 1 when search changes
  useEffect(() => {
    if (currentPage !== 1) {
      resetPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  if (!isYaoyao) {
    return notFound();
  }

  return (
    <div
      ref={pageRef}
      className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950"
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <div className="mb-6 flex-shrink-0">
            <TablesHeader
              isStaging={isStaging}
              onToggleStaging={setIsStaging}
            />
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {isStaging ? (
              <TablesStagingView searchQuery={searchQuery} />
            ) : (
              <>
                {isLoading ? (
                  <div className="flex items-center justify-center h-full min-h-[400px]">
                    <Loading />
                  </div>
                ) : (
                  <TablesNormalView
                    tables={data?.tables}
                    pagination={data?.pagination}
                    onPageChange={goToPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTablesPage;
