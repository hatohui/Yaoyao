"use client";
import React, { useState } from "react";
import { FiClock, FiSearch, FiPlus } from "react-icons/fi";
import useTableMutation from "@/hooks/table/useTableMutation";
import { useTranslations } from "next-intl";

type StagingEmptyProps = {
  hasSearchQuery: boolean;
  searchQuery?: string;
};

const StagingEmpty = ({ hasSearchQuery, searchQuery }: StagingEmptyProps) => {
  const t = useTranslations("tables");
  const { createTable } = useTableMutation();
  const [isCreating, setIsCreating] = useState(false);
  const [newTableName, setNewTableName] = useState("");

  const handleCreateTable = () => {
    if (!newTableName.trim()) return;

    createTable.mutate(
      { name: newTableName.trim(), capacity: 2, isStaging: true },
      {
        onSuccess: () => {
          setNewTableName("");
          setIsCreating(false);
        },
      }
    );
  };

  if (hasSearchQuery) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 mb-4">
          <FiSearch className="w-8 h-8 text-slate-400 dark:text-slate-500" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-dark-text mb-2">
          No staging tables found
        </h3>
        <p className="text-slate-600 dark:text-dark-text-secondary mb-4">
          No tables matching &quot;{searchQuery}&quot;
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Try adjusting your search query
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-main/10 dark:bg-main/20 mb-4">
        <FiClock className="w-8 h-8 text-main dark:text-dark-main" />
      </div>
      <h3 className="text-lg font-medium text-slate-900 dark:text-dark-text mb-2">
        No staging tables
      </h3>
      <p className="text-slate-600 dark:text-dark-text-secondary mb-6">
        Copy from production to start planning or create a new staging table
      </p>

      {isCreating ? (
        <div className="max-w-sm mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTableName}
              onChange={(e) => setNewTableName(e.target.value)}
              onKeyPress={(e) => {
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
          {t("addStagingTable") || "Add Staging Table"}
        </button>
      )}
    </div>
  );
};

export default StagingEmpty;
