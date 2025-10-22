"use client";
import React from "react";
import { useTranslations } from "next-intl";
import FoodRow from "../FoodRow";
import { TranslatedFood } from "@/types/models/food";
import { Category } from "@prisma/client";

type FoodManagementTableProps = {
  foods?: TranslatedFood[];
  categories?: (Category & { translation?: Array<{ name: string }> })[];
};

const FoodManagementTable = ({
  foods,
  categories,
}: FoodManagementTableProps) => {
  const t = useTranslations("menu");
  const tDashboard = useTranslations("dashboard");

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
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600">
            <tr>
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                {tDashboard("foodName") || "Food Name"}
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                {tDashboard("category") || "Category"}
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                {tDashboard("variants") || "Variants"}
              </th>
              <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                {tDashboard("status") || "Status"}
              </th>
              <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
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
