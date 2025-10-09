"use client";
import Categories from "@/components/menu/Categories";
import FoodGallery from "@/components/menu/FoodGallery";
import React from "react";

import { useTranslations } from "next-intl";
import SearchBar from "@/components/common/SearchBar";

const MenuPage = () => {
  const t = useTranslations("menu");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-white shadow-md border-b border-main/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-darkest">
              {t("title")}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              {t("subtitle")}
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar
            placeholder={t("searchPlaceholder") || "Search for dishes..."}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="space-y-4 sm:space-y-6">
          {/* Categories Section */}
          <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 border border-main/10">
            <Categories className="w-full" />
          </div>

          {/* Food Gallery Section */}
          <FoodGallery />
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
