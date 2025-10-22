import React from "react";
import { useTranslations } from "next-intl";
import { FiClock } from "react-icons/fi";
import SearchBar from "../common/SearchBar";

const StagingHeader = () => {
  const t = useTranslations("staging");

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md border-b border-main/20 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-main/10 dark:bg-main/20 rounded-lg">
            <FiClock className="w-6 h-6 sm:w-7 sm:h-7 text-main dark:text-dark-main" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-darkest dark:text-dark-text">
              {t("title") || "Staging Environment"}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-dark-text-secondary">
              {t("subtitle") ||
                "Plan and test table arrangements before committing to production"}
            </p>
          </div>
        </div>
        <SearchBar
          placeholder={t("searchPlaceholder") || "Search staging tables..."}
        />
      </div>
    </div>
  );
};

export default StagingHeader;
