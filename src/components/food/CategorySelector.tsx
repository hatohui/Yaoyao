import React from "react";

import { useTranslations } from "next-intl";
import { GetCategoriesResponse } from "@/types/api/category/GET";

type CategorySelectorProps = {
  categories: GetCategoriesResponse | undefined;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
};

const CategorySelector = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategorySelectorProps) => {
  const tMenu = useTranslations("menu");

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => setSelectedCategory(null)}
        className={`px-3 md:px-4 py-2 cursor-pointer rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
          selectedCategory === null
            ? "bg-main-dark text-white"
            : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
        }`}
      >
        {tMenu("allCategories")}
      </button>
      {categories?.map((cat) => {
        const categoryKey = cat.key.split(" ")[0].toLowerCase();
        return (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(categoryKey)}
            className={`px-3 md:px-4 py-2 cursor-pointer rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === categoryKey
                ? "bg-main-dark text-white"
                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}
          >
            {cat.translation?.[0]?.name || cat.name}
          </button>
        );
      })}
    </div>
  );
};

export default CategorySelector;
