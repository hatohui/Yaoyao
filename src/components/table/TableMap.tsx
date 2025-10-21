"use client";
import useTables from "@/hooks/table/useTables";
import Link from "next/link";
import React from "react";
import { FiInbox, FiSearch, FiGrid, FiUsers } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import useFilteredTables from "@/hooks/table/useFilteredTables";

export interface TableMapProps {
  searchQuery?: string;
}

const TableMap = ({ searchQuery = "" }: TableMapProps) => {
  const { data, isLoading } = useTables();
  const searchParams = useSearchParams();
  const t = useTranslations("tables");

  const tables = data?.sort((a, b) =>
    Number(a.name.split(" ")[1]) > Number(b.name.split(" ")[1]) ? 1 : -1
  );

  const filteredTables = useFilteredTables(tables, searchQuery);

  const buildUrlWithParams = (tableId: string) => {
    const params = searchParams?.toString();
    return params ? `/tables/${tableId}?${params}` : `/tables/${tableId}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-main border-r-transparent"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            {t("loading")}
          </p>
        </div>
      </div>
    );
  }

  if (!tables || tables.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 mb-4">
          <FiInbox className="w-8 h-8 text-slate-400 dark:text-slate-500" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
          {t("noTables")}
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          {t("noTablesMessage")}
        </p>
      </div>
    );
  }

  if (filteredTables.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 mb-4">
          <FiSearch className="w-8 h-8 text-slate-400 dark:text-slate-500" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
          {t("noSearchResults") || "No results found"}
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          {t("tryDifferentSearch") ||
            `No tables found matching "${searchQuery}"`}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {filteredTables?.map((table) => {
        const peopleCount = table.peopleCount || 0;
        const isFull = peopleCount >= table.capacity;
        const statusText = isFull ? t("full") : t("available");

        return (
          <Link
            key={table.id}
            href={buildUrlWithParams(table.id)}
            className="group block h-full"
          >
            <div
              className={`
              relative overflow-hidden rounded-lg border transition-all duration-200 h-full flex flex-col bg-white dark:bg-slate-800 shadow-md hover:shadow-lg
              ${
                isFull
                  ? "border-red-200 dark:border-red-900/50 hover:border-red-300 dark:hover:border-red-900/70"
                  : "border-main/10 dark:border-slate-700 hover:border-main/30 dark:hover:border-main/50"
              }
            `}
            >
              {/* Status Badge */}
              <div
                className={`
                absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold shadow-sm
                ${isFull ? "bg-red-500 text-white" : "bg-available text-white"}
              `}
              >
                {statusText}
              </div>

              <div className="p-3 sm:p-4 flex-1">
                {/* Table Icon & Name */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`
                    w-12 h-12 rounded-lg flex items-center justify-center
                    ${
                      isFull
                        ? "bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900/50"
                        : "bg-main/10 dark:bg-main/20 border border-main/20 dark:border-main/30"
                    }
                  `}
                  >
                    <FiGrid
                      className={`w-6 h-6 ${
                        isFull ? "text-red-600 dark:text-red-400" : "text-main"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-main transition-colors">
                      {table.name}
                    </h3>
                  </div>
                </div>

                {/* Table Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <FiUsers
                      className={`w-4 h-4 flex-shrink-0 ${
                        isFull ? "text-red-500 dark:text-red-400" : "text-main"
                      }`}
                    />
                    <span>
                      {t("capacity")}:{" "}
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {peopleCount}/{table.capacity}
                      </span>
                    </span>
                  </div>

                  {table.tableLeader ? (
                    <div className="pt-3 border-t border-main/10 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex-shrink-0 ${
                            isFull ? "bg-red-500" : "bg-main"
                          } flex items-center justify-center text-white text-xs font-bold`}
                        >
                          {table.tableLeader.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            {t("partyLeader")}
                          </p>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                            {table.tableLeader.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-3 border-t border-main/10 dark:border-slate-700">
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic">
                        {t("noParty")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TableMap;
