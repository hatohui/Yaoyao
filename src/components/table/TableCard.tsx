"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiGrid, FiUsers, FiLoader } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { GetTablesResponse } from "@/types/api/table/GET";

type TableCardProps = {
  table: GetTablesResponse;
  buildUrlWithParams: (tableId: string) => string;
};

const TableCard = ({ table, buildUrlWithParams }: TableCardProps) => {
  const t = useTranslations("tables");
  const [isNavigating, setIsNavigating] = useState(false);

  const peopleCount = table.peopleCount ?? 0;
  const isFull = peopleCount >= table.capacity;
  const isLoadingCount = table.peopleCount === undefined;

  const handleClick = () => {
    setIsNavigating(true);
    // Navigation will happen automatically via Link
  };

  return (
    <Link
      href={buildUrlWithParams(table.id)}
      className="group block h-full"
      onClick={handleClick}
    >
      <div
        data-table-card
        className={`
          relative overflow-hidden rounded-lg border transition-all duration-200 h-full flex flex-col bg-white dark:bg-slate-800 shadow-md
          ${
            isFull
              ? "border-red-200 dark:border-red-900/50 hover:shadow-red-200/50 dark:hover:shadow-red-900/30"
              : "border-main/10 dark:border-slate-700 hover:shadow-main/20 dark:hover:shadow-main/10"
          }
          ${isNavigating ? "opacity-75 pointer-events-none" : ""}
        `}
      >
        {isNavigating && (
          <div className="absolute inset-0 bg-white/50 dark:bg-slate-800/50 flex items-center justify-center z-10">
            <FiLoader className="w-8 h-8 text-main animate-spin" />
          </div>
        )}
        <div className="p-3 sm:p-4 flex-1">
          {/* Table Icon & Name */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`
                w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200
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
                {isLoadingCount ? (
                  <span className="inline-flex items-center gap-1">
                    <span className="inline-block h-4 w-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    <span>/</span>
                    <span className="inline-block h-4 w-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                  </span>
                ) : (
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {peopleCount}/{table.capacity}
                  </span>
                )}
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
};

export default TableCard;
