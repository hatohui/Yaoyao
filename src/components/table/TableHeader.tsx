import React from "react";
import { useTranslations } from "next-intl";

const TableHeader = () => {
  const t = useTranslations("tables");

  return (
    <div className="bg-white shadow-md border-b border-main/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-darkest">
              {t("tableOverview")}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              {t("tableOverviewSubtitle")}
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-green-50 rounded-lg border border-green-200">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs sm:text-sm font-medium text-green-700">
                {t("available")}
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-red-50 rounded-lg border border-red-200">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs sm:text-sm font-medium text-red-700">
                {t("full")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
