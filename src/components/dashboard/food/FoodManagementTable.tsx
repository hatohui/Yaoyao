"use client";
import React from "react";
import { useTranslations } from "next-intl";
import FoodRow from "../FoodRow";
import FoodGridView from "./FoodGridView";
import { TranslatedFood } from "@/types/models/food";
import { Category } from "@prisma/client";

type FoodManagementTableProps = {
  foods?: TranslatedFood[];
  categories?: (Category & { translation?: Array<{ name: string }> })[];
  onEditFood: (food: TranslatedFood) => void;
  onDeleteFood: (food: TranslatedFood) => void;
  viewMode?: "list" | "grid";
};

const FoodManagementTable = ({
  foods,
  categories,
  onEditFood,
  onDeleteFood,
  viewMode = "list",
}: FoodManagementTableProps) => {
  const t = useTranslations("menu");
  const tDashboard = useTranslations("dashboard");

  // If grid view is selected, use the grid component
  if (viewMode === "grid") {
    return (
      <FoodGridView
        foods={foods}
        categories={categories}
        onEditFood={onEditFood}
        onDeleteFood={onDeleteFood}
      />
    );
  }

  // Otherwise render the table (list view)
  if (!foods || foods.length === 0) {
    return (
      <div className="hidden md:block bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="py-16 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            {t("noFoodsMessage") || "No foods found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:block bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600">
            <tr>
              <th className="w-[40%] px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                {tDashboard("foodName") || "Food Name"}
              </th>
              <th className="w-[12%] px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                {tDashboard("category") || "Category"}
              </th>
              <th className="w-[18%] px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                {tDashboard("variants") || "Variants"}
              </th>
              <th className="w-[10%] px-3 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                {tDashboard("status") || "Status"}
              </th>
              <th className="w-[20%] px-3 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                {tDashboard("action") || "Action"}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
            {foods.map((food) => {
              const translatedName = food.translations?.[0]?.name || food.name;
              const category = categories?.find(
                (c) => c.id === food.categoryId
              );
              const categoryName =
                category?.translation?.[0]?.name || category?.name || "-";

              return (
                <FoodRow
                  key={food.id}
                  food={food}
                  translatedName={translatedName}
                  categoryName={categoryName}
                  t={t}
                  onEdit={() => onEditFood(food)}
                  onDelete={() => onDeleteFood(food)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodManagementTable;
