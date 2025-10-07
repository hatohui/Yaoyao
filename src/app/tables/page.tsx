"use client";
import TableMap from "@/components/table/TableMap";
import React from "react";
import { useTranslations } from "next-intl";

const TablePage = () => {
  const t = useTranslations("tables");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-white shadow-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {t("tableOverview")}
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                {t("tableOverviewSubtitle")}
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700">
                  {t("available")}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg border border-red-200">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-red-700">
                  {t("full")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TableMap />
      </div>
    </div>
  );
};

export default TablePage;
