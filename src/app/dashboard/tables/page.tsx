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

const DashboardTablesPage = () => {
  const { isYaoyao } = useYaoAuth();
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search") || "";
  const [isStaging, setIsStaging] = useState(false);
  const { currentPage, goToPage, resetPage } = usePagination();

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
      className="min-h-screen max-h-screen overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <TablesHeader isStaging={isStaging} onToggleStaging={setIsStaging} />

        {isStaging ? (
          <TablesStagingView searchQuery={searchQuery} />
        ) : (
          <>
            {isLoading ? (
              <Loading />
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
  );
};

export default DashboardTablesPage;
