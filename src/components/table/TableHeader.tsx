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
        </div>
        <SearchBar
          placeholder={t("searchPlaceholder") || "Search for tables..."}
        />
      </div>
    </div>
  );
};

export default TableHeader;
