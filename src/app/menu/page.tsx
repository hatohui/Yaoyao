"use client";
import Categories from "@/components/menu/Categories";
import FoodGallery from "@/components/menu/gallery/FoodGallery";
import React from "react";

import { useTranslations } from "next-intl";
import SearchBar from "@/components/common/SearchBar";

const MenuPage = () => {
  const t = useTranslations("menu");

  return (
    <div className="h-screen flex flex-col nav-spacer bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header Section - Fixed */}
      <div className="flex-shrink-0 bg-white dark:bg-slate-800 border-b border-main/20 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
          <SearchBar
            placeholder={t("searchPlaceholder") || "Search for dishes..."}
          />
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="space-y-4 sm:space-y-6">
            {/* Categories Section */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-3 sm:p-4 border border-main/10 dark:border-slate-700">
              <Categories className="w-full" />
            </div>

            {/* Food Gallery Section */}
            <FoodGallery />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
