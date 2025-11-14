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
} from "@/hooks/food/useFoodMutations";
import { TranslatedFood } from "@/types/models/food";

const DashboardPage = () => {
  const { isYaoyao } = useYaoAuth();
  const t = useTranslations("success");
  const tErrors = useTranslations("errors");
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

  const { data: categories } = useCategories();
  const { data: foodsData, isLoading } = useFoods({
    category: selectedCategory,
    page: currentPage,
    search: searchQuery,
  });

  // Filter foods by status on the client side
  const filteredFoods = foodsData?.foods?.filter((food) => {
    if (selectedStatus === "all") return true;
    if (selectedStatus === "available") return food.available;
    if (selectedStatus === "unavailable") return !food.available;
    return true;
  });

  const createFoodMutation = useCreateFoodMutation();
  const updateFoodMutation = useUpdateFoodMutation(editingFood?.id || "");

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
                  foods={filteredFoods}
                  categories={categories}
                  onEditFood={handleEditFood}
                />
                <FoodManagementTable
                  foods={filteredFoods}
                  categories={categories}
                  onEditFood={handleEditFood}
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
    </div>
  );
};

export default DashboardPage;
