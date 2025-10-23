"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { FiUsers, FiPlus } from "react-icons/fi";
import { useCardStaggerAnimation } from "@/hooks/common/useAnimations";
import Pagination from "@/components/common/Pagination";
import { GetTablesWithPeopleResponse } from "@/types/api/table/GET";
import useTableMutation from "@/hooks/table/useTableMutation";
import DashboardTableCard from "./DashboardTableCard";
import AddTableCard from "./AddTableCard";

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
  const cardsRef = useCardStaggerAnimation();
  const { createTable } = useTableMutation();
  const [isCreating, setIsCreating] = useState(false);
  const [newTableName, setNewTableName] = useState("");

  const isLastPage = pagination
    ? pagination.page >= pagination.totalPages
    : false;

  const handleCreateTable = () => {
    if (!newTableName.trim()) return;

    createTable.mutate(
      { name: newTableName.trim(), capacity: 2, isStaging: false },
      {
        onSuccess: () => {
          setNewTableName("");
          setIsCreating(false);
        },
      }
    );
  };

  if (!tables || tables.length === 0) {
    return (
      <div className="text-center py-12">
        <FiUsers className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
          {t("noTables") || "No tables found"}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          {t("noTablesMessage") || "No tables match the selected filter"}
        </p>

        {isCreating ? (
          <div className="max-w-sm mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTableName}
                onChange={(e) => setNewTableName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreateTable();
                  if (e.key === "Escape") {
                    setIsCreating(false);
                    setNewTableName("");
                  }
                }}
                placeholder={t("tableName") || "Table name"}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-main"
                autoFocus
              />
              <button
                onClick={handleCreateTable}
                disabled={!newTableName.trim() || createTable.isPending}
                className="px-4 py-2 bg-main hover:bg-main-dark disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                {t("create") || "Create"}
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setNewTableName("");
                }}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
              >
                {t("cancel") || "Cancel"}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-main hover:bg-main-dark text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            <FiPlus className="w-5 h-5" />
            {t("addTable") || "Add Table"}
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Table count */}
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        {pagination?.total || tables.length}{" "}
        {(pagination?.total || tables.length) === 1 ? "table" : "tables"}
      </p>

      <div
        ref={cardsRef}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 overflow-hidden"
      >
        {tables.map((table) => (
          <div key={table.id} data-animate-card className="min-w-0">
            <DashboardTableCard table={table} isStaging={false} />
          </div>
        ))}

        {/* Add Table Card */}
        {isLastPage && (
          <div data-animate-card className="min-w-0">
            <AddTableCard isStaging={false} />
          </div>
        )}
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
  );
};

export default TablesNormalView;
