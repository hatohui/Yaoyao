"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { FiUsers } from "react-icons/fi";
import { useCardStaggerAnimation } from "@/hooks/common/useAnimations";
import DashboardTableCard from "../DashboardTableCard";
import Pagination from "@/components/common/Pagination";
import { GetTablesWithPeopleResponse } from "@/types/api/table/GET";

type TablesNormalViewProps = {
  tables?: GetTablesWithPeopleResponse[];
  pagination?: {
    page: number;
    count: number;
    total: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
};

const TablesNormalView = ({
  tables,
  pagination,
  onPageChange,
}: TablesNormalViewProps) => {
  const t = useTranslations("tables");
  const cardsRef = useCardStaggerAnimation([tables]);

  if (!tables || tables.length === 0) {
    return (
      <div className="text-center py-12">
        <FiUsers className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
          {t("noTables") || "No tables found"}
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          {t("noTablesMessage") || "No tables match the selected filter"}
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        ref={cardsRef}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
      >
        {tables.map((table) => (
          <div key={table.id} data-animate-card>
            <DashboardTableCard table={table} isStaging={false} />
          </div>
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && onPageChange && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export default TablesNormalView;
