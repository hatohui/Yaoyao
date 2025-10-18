import { Food, FoodTranslation, FoodVariant } from "@prisma/client";

export type TranslatedFood = Food & {
  translations?: Pick<FoodTranslation, "name" | "description">[];
  variants?: Pick<
    FoodVariant,
    "id" | "label" | "price" | "currency" | "isSeasonal" | "available"
  >[];
};
