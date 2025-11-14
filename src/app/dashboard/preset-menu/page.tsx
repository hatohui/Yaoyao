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
import { useCreateFoodMutation } from "@/hooks/food/useFoodMutations";
import useCategories from "@/hooks/food/useCategories";
import AddPresetModal from "@/components/dashboard/preset/AddPresetModal";

const PresetMenuPage = () => {
  const { isYaoyao } = useYaoAuth();
  const t = useTranslations("success");
  const tErrors = useTranslations("errors");
  const { data: presetData, isLoading: isLoadingPresets } = usePresetMenus();
  const { data: foodsData, isLoading: isLoadingFoods } = useFoods({
    count: 9999, // Get all foods for the dropdown
  });
  const { data: categories } = useCategories();
  const createPresetMutation = useCreatePresetMenu();
  const deletePresetMutation = useDeletePresetMenu();
  const createFoodMutation = useCreateFoodMutation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);

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
      </div>
    </div>
  );
};

export default PresetMenuPage;
