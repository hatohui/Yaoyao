import React from "react";
import { useTranslations } from "next-intl";
import SearchBar from "../common/SearchBar";

const TableHeader = () => {
  const t = useTranslations("tables");

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md border-b border-main/20 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-darkest dark:text-slate-100">
              {t("tableOverview")}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {t("tableOverviewSubtitle")}
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-900/50">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-400">
                {t("available")}
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-900/50">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs sm:text-sm font-medium text-red-700 dark:text-red-400">
                {t("full")}
              </span>
            </div>
          </div>
        </div>
        <SearchBar
          placeholder={t("searchPlaceholder") || "Search for tables..."}
        />
      </div>
    </div>
  );
};

export default TableHeader;
