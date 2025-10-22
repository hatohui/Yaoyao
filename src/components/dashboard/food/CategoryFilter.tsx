"use client";
import React from "react";
import { FiFilter } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { Category } from "@prisma/client";

type CategoryFilterProps = {
  categories?: (Category & { translation?: Array<{ name: string }> })[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
};

const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  const t = useTranslations("menu");

  return (
    <div className="sm:w-64 flex-shrink-0">
      <div className="relative">
        <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5 pointer-events-none z-10" />
        <select
          value={selectedCategory || ""}
          onChange={(e) => onCategoryChange(e.target.value || null)}
          className="w-full h-[42px] pl-10 pr-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-main focus:border-main appearance-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm cursor-pointer transition-colors"
        >
          <option value="">{t("allCategories") || "All Categories"}</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.translation?.[0]?.name || cat.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategoryFilter;
