"use client";
import React from "react";
import useStagingTables from "@/hooks/staging/useStagingTables";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import { notFound } from "next/navigation";
import Loading from "@/components/common/Loading";
import { usePageAnimation } from "@/hooks/common/useAnimations";
import StagingControls from "@/components/staging/StagingControls";
import StagingEmpty from "@/components/staging/StagingEmpty";
import StagingGrid from "@/components/staging/StagingGrid";
import useStagingFilters from "@/hooks/staging/useStagingFilters";
import SearchBar from "@/components/common/SearchBar";
import { useTranslations } from "next-intl";

const StagingPage = () => {
  const { isYaoyao } = useYaoAuth();
  const t = useTranslations("staging");
  const { data, isLoading } = useStagingTables({ count: 100 });
  const { filteredTables, searchQuery, hasSearchQuery } = useStagingFilters(
    data?.tables
  );

  const pageRef = usePageAnimation();

  if (!isYaoyao) {
    return notFound();
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      ref={pageRef}
      className="h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        {/* Search and Controls */}
        <div className="mb-6">
          <SearchBar
            placeholder={t("searchPlaceholder") || "Search staging tables..."}
          />
        </div>

        <StagingControls />

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
    </div>
  );
};

export default StagingPage;
