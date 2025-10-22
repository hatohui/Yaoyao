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
    <div className="bg-gradient-to-r from-main to-main-light dark:from-main/80 dark:to-main-light/80 px-4 py-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-white dark:text-dark-text">
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
                ? "bg-available dark:bg-dark-success text-white"
                : "bg-available dark:bg-dark-success text-white"
            }`}
          >
            {peopleCount} / {capacity}
          </span>
        </div>
      </div>

      {/* Capacity Bar */}
      <div className="mt-2">
        <div className="w-full bg-white/30 dark:bg-slate-950/50 rounded-full h-1 overflow-hidden">
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
        <div className="mt-1 text-xs text-white/80 dark:text-dark-text-secondary">
          Copied from production
        </div>
      )}
    </div>
  );
};

export default StagingTableCardHeader;
