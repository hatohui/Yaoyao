"use client";
import React from "react";
import useTables from "@/hooks/table/useTables";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import { useTranslations } from "next-intl";
import { notFound, useSearchParams } from "next/navigation";
import Loading from "@/components/common/Loading";
import { FiUsers } from "react-icons/fi";
import {
  usePageAnimation,
  useCardStaggerAnimation,
} from "@/hooks/common/useAnimations";
import useFilteredTables from "@/hooks/table/useFilteredTables";
import SearchBar from "@/components/common/SearchBar";

const DashboardTablesPage = () => {
  const { isYaoyao } = useYaoAuth();
  const tTables = useTranslations("tables");
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search") || "";
  const { data, isLoading } = useTables({ count: 100 }); // Get all tables for dashboard

  const tables = data?.tables;
  const filteredTables = useFilteredTables(tables, searchQuery);

  const pageRef = usePageAnimation();
  const cardsRef = useCardStaggerAnimation([filteredTables]);

  if (!isYaoyao) {
    return notFound();
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Search Bar */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4 mb-4">
          <SearchBar
            placeholder={
              tTables("searchPlaceholder") ||
              "Search tables, leaders, or guests..."
            }
          />
        </div>

        {/* Tables Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTables?.map((table) => (
            <div key={table.id} data-animate-card></div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTables?.length === 0 && (
          <div className="text-center py-12">
            <FiUsers className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
              {tTables("noTables") || "No tables found"}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {tTables("noTablesMessage") ||
                "No tables match the selected filter"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTablesPage;
