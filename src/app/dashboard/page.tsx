"use client";
import useFoods from "@/hooks/food/useFoods";
import useCategories from "@/hooks/food/useCategories";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import { notFound, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import Loading from "@/components/common/Loading";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/common/usePagination";
import FoodManagementHeader from "@/components/dashboard/food/FoodManagementHeader";
import FoodManagementTable from "@/components/dashboard/food/FoodManagementTable";
import FoodManagementMobileList from "@/components/dashboard/food/FoodManagementMobileList";
import FoodFormModalEnhanced, {
  FoodFormData,
} from "@/components/dashboard/food/FoodFormModalEnhanced";
import {
  useCreateFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
} from "@/hooks/food/useFoodMutations";
import { TranslatedFood } from "@/types/models/food";

const DashboardPage = () => {
  const { isYaoyao } = useYaoAuth();
  const t = useTranslations("success");
  const tErrors = useTranslations("errors");
  const tDashboard = useTranslations("dashboard");
  const tCommon = useTranslations("common");
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search") || "";
  const { currentPage, goToPage, resetPage } = usePagination();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "available" | "unavailable"
  >("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<TranslatedFood | null>(null);
  const [deletingFood, setDeletingFood] = useState<TranslatedFood | null>(null);

  const { data: categories } = useCategories();
  const { data: foodsData, isLoading } = useFoods({
    category: selectedCategory,
    page: currentPage,
    search: searchQuery,
    available:
      selectedStatus === "all" ? undefined : selectedStatus === "available",
  });

  const createFoodMutation = useCreateFoodMutation();
  const updateFoodMutation = useUpdateFoodMutation(editingFood?.id || "");
  const deleteFoodMutation = useDeleteFoodMutation(deletingFood?.id || "");

  // Reset to page 1 when search or category changes
  useEffect(() => {
    if (currentPage !== 1 && (searchQuery || selectedCategory)) {
      resetPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory]);

  const handleAddFood = () => {
    setEditingFood(null);
    setIsModalOpen(true);
  };

  const handleEditFood = (food: TranslatedFood) => {
    setEditingFood(food);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFood(null);
  };

  const handleSubmitFood = async (data: FoodFormData) => {
    try {
      const payload = {
        ...data,
        imageUrl: data.imageUrl || null,
        description: data.description || null,
      };

      if (editingFood) {
        await updateFoodMutation.mutateAsync(payload);
        toast.success(t("foodUpdated"));
      } else {
        await createFoodMutation.mutateAsync(payload);
        toast.success(t("foodCreated"));
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving food:", error);
      toast.error(tErrors("GENERIC_ERROR"));
    }
  };

  const handleDeleteFood = (food: TranslatedFood) => {
    setDeletingFood(food);
  };

  const handleConfirmDelete = async () => {
    if (!deletingFood) return;

    try {
      await deleteFoodMutation.mutateAsync();
      toast.success(t("foodDeleted"));
      setDeletingFood(null);
    } catch (error) {
      console.error("Error deleting food:", error);
      toast.error(tErrors("GENERIC_ERROR"));
    }
  };

  const handleCancelDelete = () => {
    setDeletingFood(null);
  };

  if (!isYaoyao) {
    return notFound();
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col flex-1 overflow-hidden">
          {/* Header with filters */}
          <div className="mb-6 flex-shrink-0">
            <FoodManagementHeader
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              totalResults={foodsData?.pagination?.total}
              onAddFood={handleAddFood}
            />
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <Loading />
              </div>
            ) : (
              <div className="pb-6">
                <FoodManagementMobileList
                  foods={foodsData?.foods}
                  categories={categories}
                  onEditFood={handleEditFood}
                  onDeleteFood={handleDeleteFood}
                />
                <FoodManagementTable
                  foods={foodsData?.foods}
                  categories={categories}
                  onEditFood={handleEditFood}
                  onDeleteFood={handleDeleteFood}
                  viewMode={viewMode}
                />
              </div>
            )}
          </div>

          {/* Pagination - Fixed at bottom */}
          {foodsData?.pagination && foodsData.pagination.totalPages > 1 && (
            <div className="flex-shrink-0 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
              <div className="py-3 px-2">
                <Pagination
                  currentPage={foodsData.pagination.page}
                  totalPages={foodsData.pagination.totalPages}
                  onPageChange={goToPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Food Form Modal */}
      <FoodFormModalEnhanced
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitFood}
        categories={categories}
        food={editingFood}
        isLoading={createFoodMutation.isPending || updateFoodMutation.isPending}
      />

      {/* Delete Confirmation Dialog */}
      {deletingFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-600 dark:text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {tDashboard("deleteFood")}
                </h3>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              {tDashboard("confirmDeleteFood")}
            </p>
            <div className="pt-2 flex gap-3">
              <button
                onClick={handleCancelDelete}
                disabled={deleteFoodMutation.isPending}
                className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {tCommon("cancel")}
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleteFoodMutation.isPending}
                className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-500 text-white hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleteFoodMutation.isPending ? "..." : tCommon("delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
