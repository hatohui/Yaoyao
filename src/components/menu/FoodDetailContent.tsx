"use client";
import { notFound } from "next/navigation";
import FoodDetailHeader from "@/components/menu/FoodDetailHeader";
import FoodDetailImages from "@/components/menu/FoodDetailImages";
import FoodDetailInfo from "@/components/menu/FoodDetailInfo";
import Loading from "@/components/common/Loading";
import useFoodById from "@/hooks/food/useFoodById";

type FoodDetailContentProps = {
  foodId: string;
};

const FoodDetailContent = ({ foodId }: FoodDetailContentProps) => {
  const { data: food, isLoading, isError } = useFoodById(foodId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError || !food) {
    notFound();
  }

  return (
    <div className="nav-spacer bg-slate-50 dark:bg-slate-900">
      {/* Compact Header */}
      <FoodDetailHeader name={food.name} available={food.available} />

      {/* Main Content - Compact Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Image Section - 1/3 width on large screens */}
          <div className="lg:col-span-1">
            <FoodDetailImages imageUrl={food.imageUrl} name={food.name} />
          </div>

          {/* Info Section - 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <FoodDetailInfo
              description={food.description}
              variants={food.variants}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailContent;
