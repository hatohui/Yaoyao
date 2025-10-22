"use client";
import React from "react";
import { useTranslations } from "next-intl";

type TableCardHeaderProps = {
  tableName: string;
  peopleCount: number;
  capacity: number;
  isFull: boolean;
  occupancyPercentage: number;
  isStaging?: boolean;
  referenceId?: string | null;
};

const TableCardHeader = ({
  tableName,
  peopleCount,
  capacity,
  isFull,
  occupancyPercentage,
  isStaging,
  referenceId,
}: TableCardHeaderProps) => {
  const t = useTranslations("tables");

  return (
    <div className="bg-slate-50 dark:bg-slate-700/50 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {tableName}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            <span className="font-bold">{peopleCount}</span>
            <span className="opacity-75"> / {capacity}</span>
          </span>
          {isFull && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-red-500 text-white rounded">
              {t("full")}
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            isFull
              ? "bg-red-500"
              : occupancyPercentage > 75
              ? "bg-yellow-500"
              : "bg-main"
          }`}
          style={{ width: `${Math.min(occupancyPercentage, 100)}%` }}
        ></div>
      </div>

      {/* Reference ID for staging */}
      {isStaging && referenceId && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          {t("reference")}: {referenceId}
        </p>
      )}
    </div>
  );
};

export default TableCardHeader;
