import React from "react";
import FoodCard from "./FoodCard";
import { TranslatedFood } from "@/types/models/food";

type FoodGalleryGridProps = {
  foods: TranslatedFood[];
  t: (key: string) => string;
  className?: string;
};

const FoodGalleryGrid = ({
  foods,
  t,
  className = "",
}: FoodGalleryGridProps) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 ${className}`}
    >
      {foods.map((food) => {
        const translatedName = food.translations?.[0]?.name || food.name;
        const translatedDescription =
          food.translations?.[0]?.description || food.description;

        return (
          <FoodCard
            key={food.id}
            food={food}
            translatedName={translatedName}
            translatedDescription={translatedDescription}
            t={t}
          />
        );
      })}
    </div>
  );
};

export default FoodGalleryGrid;
