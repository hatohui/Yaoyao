"use client";
import React from "react";
import { Category } from "@prisma/client";
import FoodSearchBar from "./FoodSearchBar";
import CategoryFilter from "./CategoryFilter";
import ResultsCount from "./ResultsCount";

type FoodManagementHeaderProps = {
  categories?: (Category & { translation?: Array<{ name: string }> })[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  totalResults?: number;
};

const FoodManagementHeader = ({
  categories,
  selectedCategory,
  onCategoryChange,
  totalResults,
}: FoodManagementHeaderProps) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <FoodSearchBar />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>
        <ResultsCount totalResults={totalResults} />
      </div>
    </div>
  );
};

export default FoodManagementHeader;
