"use client";
import React from "react";
import { Category } from "@prisma/client";
import { FiPlus } from "react-icons/fi";
import { useTranslations } from "next-intl";
import FoodSearchBar from "./FoodSearchBar";
import CategoryFilter from "./CategoryFilter";
import StatusFilter from "./StatusFilter";
import ViewToggle from "./ViewToggle";
import ResultsCount from "./ResultsCount";

type FoodManagementHeaderProps = {
  categories?: (Category & { translation?: Array<{ name: string }> })[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedStatus: "all" | "available" | "unavailable";
  onStatusChange: (status: "all" | "available" | "unavailable") => void;
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
  totalResults?: number;
  onAddFood: () => void;
};

const FoodManagementHeader = ({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  viewMode,
  onViewModeChange,
  totalResults,
  onAddFood,
}: FoodManagementHeaderProps) => {
  const t = useTranslations("dashboard");

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="p-4">
        <div className="flex flex-col gap-3">
          {/* Top row - Search, Category, Add */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <FoodSearchBar />
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={onCategoryChange}
            />
            <button
              onClick={onAddFood}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-main hover:bg-main/90 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm hover:shadow"
            >
              <FiPlus className="w-5 h-5" />
              <span className="hidden sm:inline">{t("addFood")}</span>
            </button>
          </div>

          {/* Bottom row - Status Filter & View Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <StatusFilter
              selectedStatus={selectedStatus}
              onStatusChange={onStatusChange}
            />
            <ViewToggle
              viewMode={viewMode}
              onViewModeChange={onViewModeChange}
            />
          </div>
        </div>
        <ResultsCount totalResults={totalResults} />
      </div>
    </div>
  );
};

export default FoodManagementHeader;
