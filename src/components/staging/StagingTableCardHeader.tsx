import React from "react";
import StagingBadge from "./StagingBadge";

type StagingTableCardHeaderProps = {
  tableName: string;
  peopleCount: number;
  capacity: number;
  occupancyPercentage: number;
  isFull: boolean;
  referenceId?: string | null;
};

const StagingTableCardHeader = ({
  tableName,
  peopleCount,
  capacity,
  occupancyPercentage,
  isFull,
  referenceId,
}: StagingTableCardHeaderProps) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-700/50 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            {tableName}
          </h3>
          <StagingBadge />
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              isFull
                ? "bg-red-500 dark:bg-red-600 text-white"
                : occupancyPercentage > 75
                ? "bg-amber-500 dark:bg-amber-600 text-white"
                : "bg-available dark:bg-dark-success text-white"
            }`}
          >
            {peopleCount} / {capacity}
          </span>
        </div>
      </div>

      {/* Capacity Bar */}
      <div className="mt-2">
        <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-1 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              isFull
                ? "bg-red-400 dark:bg-red-500"
                : occupancyPercentage > 75
                ? "bg-available dark:bg-dark-success"
                : "bg-available dark:bg-dark-success"
            }`}
            style={{ width: `${Math.min(occupancyPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Reference Info */}
      {referenceId && (
        <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
          Copied from production
        </div>
      )}
    </div>
  );
};

export default StagingTableCardHeader;
