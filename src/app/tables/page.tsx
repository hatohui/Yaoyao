"use client";
import TableHeader from "@/components/table/TableHeader";
import TableMap from "@/components/table/TableMap";
import { TABLE_PUBLIC_ENABLED } from "@/config/app";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import { useTranslations } from "next-intl";
import React from "react";
import useSearch from "@/hooks/common/useSearch";

const TableStagingPage = () => {
  const t = useTranslations("tables");
  const { isYaoyao } = useYaoAuth();
  const { searchQuery } = useSearch();

  return (
    <div className="nav-spacer bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      {/* Header Section */}
      <TableHeader />

      {/* Main Content */}
      {TABLE_PUBLIC_ENABLED || isYaoyao ? (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
          <TableMap searchQuery={searchQuery} />
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
