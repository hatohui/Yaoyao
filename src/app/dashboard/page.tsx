"use client";
import useFoods from "@/hooks/food/useFoods";
import useCategories from "@/hooks/food/useCategories";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import { useTranslations } from "next-intl";
import { notFound, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import Loading from "@/components/common/Loading";
import FoodRow from "@/components/dashboard/FoodRow";
import FoodCardMobile from "@/components/dashboard/FoodCardMobile";
import SearchBar from "@/components/common/SearchBar";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/common/usePagination";

const DashboardPage = () => {
  const { isYaoyao } = useYaoAuth();
  const t = useTranslations("menu");
  const tDashboard = useTranslations("dashboard");
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search") || "";
  const { currentPage, goToPage, resetPage } = usePagination();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: categories } = useCategories();
  const { data: foodsData, isLoading } = useFoods({
    category: selectedCategory,
    page: currentPage,
    search: searchQuery,
  });
  const foods = foodsData?.foods;
  const pagination = foodsData?.pagination;

  // Reset to page 1 when search or category changes
  useEffect(() => {
    if (currentPage !== 1) {
      resetPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory]);

  // Security: Only Yaoyao can access dashboard
  if (!isYaoyao) {
    return notFound();
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <SearchBar
                placeholder={t("searchPlaceholder") || "Search dishes..."}
              />
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
          {pagination && (
            <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              {pagination.total} {t("dishes")} {tDashboard("found") || "found"}
            </div>
          )}
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4 mb-6">
          {foods?.map((food) => {
            const translatedName = food.translations?.[0]?.name || food.name;
            const category = categories?.find((c) => c.id === food.categoryId);
            const categoryName =
              category?.translation?.[0]?.name || category?.name || "-";

            return (
              <FoodCardMobile
                key={food.id}
                food={food}
                translatedName={translatedName}
                categoryName={categoryName}
              />
            );
          })}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600">
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
                {foods?.map((food) => {
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
        </div>

        {/* Empty State */}
        {(!foods || foods.length === 0) && !isLoading && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 py-12 text-center">
            <p className="text-slate-500 dark:text-slate-400">
              {t("noFoodsMessage") || "No foods found"}
            </p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={goToPage}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
