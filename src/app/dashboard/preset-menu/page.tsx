"use client";
import usePresetMenus from "@/hooks/preset-menu/usePresetMenus";
import {
  useCreatePresetMenu,
  useDeletePresetMenu,
} from "@/hooks/preset-menu/usePresetMenuMutations";
import useFoods from "@/hooks/food/useFoods";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import { notFound } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import Loading from "@/components/common/Loading";
import PresetMenuHeader from "@/components/dashboard/preset/PresetMenuHeader";
import PresetMenuTable from "@/components/dashboard/preset/PresetMenuTable";
import FoodFormModalEnhanced, {
  FoodFormData,
} from "@/components/dashboard/food/FoodFormModalEnhanced";
import {
  useCreateFoodMutation,
  useDeleteFoodMutation,
} from "@/hooks/food/useFoodMutations";
import useCategories from "@/hooks/food/useCategories";
import AddPresetModal from "@/components/dashboard/preset/AddPresetModal";
import { Food } from "@prisma/client";

const PresetMenuPage = () => {
  const { isYaoyao } = useYaoAuth();
  const t = useTranslations("success");
  const tErrors = useTranslations("errors");
  const tDashboard = useTranslations("dashboard");
  const tCommon = useTranslations("common");
  const { data: presetData, isLoading: isLoadingPresets } =
    usePresetMenus("en");
  const { data: foodsData, isLoading: isLoadingFoods } = useFoods({
    count: 9999, // Get all foods for the dropdown
  });
  const { data: categories } = useCategories();
  const createPresetMutation = useCreatePresetMenu();
  const deletePresetMutation = useDeletePresetMenu();
  const createFoodMutation = useCreateFoodMutation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [deletingFood, setDeletingFood] = useState<Food | null>(null);

  const deleteFoodMutation = useDeleteFoodMutation(deletingFood?.id || "");

  if (!isYaoyao) {
    return notFound();
  }

  const presetMenus = presetData?.presetMenus || [];
  const foods = foodsData?.foods || [];

  const handleAddPreset = () => {
    setIsAddModalOpen(true);
  };

  const handleCreateNewFood = () => {
    setIsFoodModalOpen(true);
  };

  const handleSubmitPreset = (data: {
    foodId: string;
    variantId?: string;
    quantity: number;
  }) => {
    createPresetMutation.mutate(
      {
        foodId: data.foodId,
        variantId: data.variantId || undefined,
        quantity: data.quantity,
      },
      {
        onSuccess: () => {
          setIsAddModalOpen(false);
          toast.success("Preset menu item added successfully!");
        },
        onError: () => {
          toast.error(tErrors("GENERIC_ERROR"));
        },
      }
    );
  };

  const handleDeletePreset = (id: string) => {
    deletePresetMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Preset menu item deleted successfully!");
      },
      onError: () => {
        toast.error(tErrors("GENERIC_ERROR"));
      },
    });
  };

  const handleDeleteFood = (food: Food) => {
    setDeletingFood(food);
  };

  const handleConfirmDeleteFood = async () => {
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

  const handleCancelDeleteFood = () => {
    setDeletingFood(null);
  };

  const handleCreateFood = async (data: FoodFormData) => {
    try {
      const payload = {
        ...data,
        imageUrl: data.imageUrl || null,
        description: data.description || null,
      };

      const response = await createFoodMutation.mutateAsync(payload);
      const newFood = response.data; // Extract data from axios response
      toast.success(t("foodCreated"));
      setIsFoodModalOpen(false);

      // Automatically add the newly created food to preset menu
      // Use the first variant if available, otherwise no variant
      const firstVariantId = newFood.variants?.[0]?.id;
      createPresetMutation.mutate(
        {
          foodId: newFood.id,
          variantId: firstVariantId,
          quantity: 1,
        },
        {
          onSuccess: () => {
            toast.success("Food created and added to preset menu!");
          },
        }
      );
    } catch (error) {
      console.error("Failed to create food:", error);
      toast.error(tErrors("GENERIC_ERROR"));
    }
  };

  if (isLoadingPresets || isLoadingFoods) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <PresetMenuHeader
          totalResults={presetMenus.length}
          onAddPreset={handleAddPreset}
          onCreateNewFood={handleCreateNewFood}
        />

        <PresetMenuTable
          presetMenus={presetMenus}
          onDelete={handleDeletePreset}
          onDeleteFood={handleDeleteFood}
          isDeleting={deletePresetMutation.isPending}
        />

        <AddPresetModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          foods={foods}
          categories={categories || []}
          onSubmit={handleSubmitPreset}
          isLoading={createPresetMutation.isPending}
        />

        <FoodFormModalEnhanced
          isOpen={isFoodModalOpen}
          onClose={() => setIsFoodModalOpen(false)}
          onSubmit={handleCreateFood}
          categories={categories || []}
          isLoading={createFoodMutation.isPending}
        />

        {/* Delete Food Confirmation Dialog */}
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
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {deletingFood.name}
              </p>
              <div className="pt-2 flex gap-3">
                <button
                  onClick={handleCancelDeleteFood}
                  disabled={deleteFoodMutation.isPending}
                  className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {tCommon("cancel")}
                </button>
                <button
                  onClick={handleConfirmDeleteFood}
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
    </div>
  );
};

export default PresetMenuPage;
