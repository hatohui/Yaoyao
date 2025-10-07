"use client";
import Categories from "@/components/menu/Categories";
import FoodGallery from "@/components/menu/FoodGallery";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useTranslations } from "next-intl";

const MenuPage = () => {
  const category = useSearchParams()?.get("category");
  const t = useTranslations("menu");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-white shadow-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{t("title")}</h1>
            <p className="mt-1 text-sm text-slate-600">{t("subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Categories Section */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <Categories className="w-full" />
          </div>

          {/* Food Gallery Section */}
          <FoodGallery category={category} />
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
