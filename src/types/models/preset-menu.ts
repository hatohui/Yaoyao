import { PresetMenu, Food, FoodVariant, FoodTranslation } from "@prisma/client";

export type TranslatedPresetMenu = PresetMenu & {
  food: Food & {
    translations?: Pick<FoodTranslation, "name" | "description">[];
  };
  variant: FoodVariant | null;
};
