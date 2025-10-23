"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

type PeopleInTableHeaderProps = {
  currentCount: number;
  capacity: number;
  isFull: boolean;
  isCollapsed: boolean;
  isRefetching: boolean;
  isLoading: boolean;
  onToggle: () => void;
  isMutating?: boolean;
};

const PeopleInTableHeader = ({
  currentCount,
  capacity,
  isFull,
  isCollapsed,
  isRefetching,
  isLoading,
  onToggle,
  isMutating = false,
}: PeopleInTableHeaderProps) => {
  const t = useTranslations("tables");
  const occupancyPercentage =
    capacity > 0 ? (currentCount / capacity) * 100 : 0;
  
  const showLoadingState = isLoading || isMutating || isRefetching;

  return (
    <div
      className="bg-darkest dark:bg-slate-900 px-4 py-2.5 cursor-pointer hover:bg-darkest/90 dark:hover:bg-slate-900/90 transition-colors"
      onClick={onToggle}
    >
      <div className="flex items-center justify-between">
        <h2
          className={`text-sm font-semibold text-white flex items-center gap-1.5 ${
            isRefetching ? "animate-pulse" : ""
          }`}
        >
          {t("partyMembers")}
          {isFull && (
            <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold bg-red-500 text-white rounded">
              {t("full")}
            </span>
          )}
        </h2>
        <div className="flex items-center gap-2">
          <div
            className={`text-white text-sm ${
              isRefetching ? "animate-pulse" : ""
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-1">
                <div className="h-4 w-6 bg-white/20 rounded animate-pulse" />
                <span className="opacity-90">/</span>
                <div className="h-4 w-6 bg-white/20 rounded animate-pulse" />
              </div>
            ) : (
              <>
                <span className="font-bold">{currentCount}</span>
                <span className="opacity-90"> / {capacity}</span>
              </>
            )}
          </div>
          {isCollapsed ? (
            <FiChevronDown className="w-4 h-4 text-white" />
          ) : (
            <FiChevronUp className="w-4 h-4 text-white" />
          )}
        </div>
      </div>
      <div className="mt-2">
        <div className="w-full bg-darkest/50 dark:bg-slate-950/50 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              isFull
                ? "bg-red-400"
                : occupancyPercentage > 75
                ? "bg-yellow-400"
                : "bg-main"
            }`}
            style={{ width: `${Math.min(occupancyPercentage, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PeopleInTableHeader;
