"use client";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("menu");
  const { data: food, isLoading, isError } = useFoodById(foodId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError || !food) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <FoodDetailHeader name={food.name} available={food.available} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Image Section */}
          <div>
            <FoodDetailImages imageUrl={food.imageUrl} name={food.name} />
          </div>

          {/* Info Section */}
          <div>
            <FoodDetailInfo
              description={food.description}
              variants={food.variants}
            />
          </div>
        </div>

        {/* Share Button */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("shareThisDish")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailContent;
