"use client";
import useFoods from "@/hooks/food/useFoods";
import useCategories from "@/hooks/food/useCategories";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useState } from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import Loading from "@/components/common/Loading";
import FoodRow from "@/components/dashboard/FoodRow";

const DashboardPage = () => {
  const { isYaoyao } = useYaoAuth();
  const t = useTranslations("menu");
  const tDashboard = useTranslations("dashboard");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categories } = useCategories();
  const { data: foods, isLoading } = useFoods(selectedCategory);

  const filteredFoods = foods?.filter((food) => {
    if (!searchQuery) return true;
    const translatedName = food.translations?.[0]?.name || food.name;
    const translatedDesc =
      food.translations?.[0]?.description || food.description || "";
    return (
      translatedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      translatedDesc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Security: Only Yaoyao can access dashboard
  if (!isYaoyao) {
    return notFound();
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-darkest dark:text-slate-100">
            {tDashboard("title") || "Food Management Dashboard"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {tDashboard("subtitle") ||
              "Manage food availability for all menu items"}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t("searchPlaceholder") || "Search dishes..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-main focus:border-main bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="sm:w-64">
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
                <select
                  value={selectedCategory || ""}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-main focus:border-main appearance-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                >
                  <option value="">
                    {t("allCategories") || "All Categories"}
                  </option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.translation?.[0]?.name || cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            {filteredFoods?.length || 0} {t("dishes")}{" "}
            {tDashboard("found") || "found"}
          </div>
        </div>

        {/* Foods Table */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {tDashboard("foodName") || "Food Name"}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {tDashboard("category") || "Category"}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {tDashboard("variants") || "Variants"}
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {tDashboard("status") || "Status"}
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {tDashboard("action") || "Action"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredFoods?.map((food) => {
                  const translatedName =
                    food.translations?.[0]?.name || food.name;
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

          {/* Empty State */}
          {(!filteredFoods || filteredFoods.length === 0) && (
            <div className="py-12 text-center">
              <p className="text-slate-500 dark:text-slate-400">
                {t("noFoodsMessage") || "No foods found"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
