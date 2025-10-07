import { TranslatedFood } from "@/types/models/food";

export const mapFoodToResponse = (food: TranslatedFood): TranslatedFood => {
  return {
    id: food.id,
    name: food.translations?.[0].name ? food.translations[0].name : food.name,
    description: food.translations?.[0].description
      ? food.translations[0].description
      : food.description,
    available: food.available,
    imageUrl: food.imageUrl,
    categoryId: food.categoryId,
    createdAt: food.createdAt,
    updatedAt: food.updatedAt,
    variants: food.variants,
  };
};
