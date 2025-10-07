import { Food, FoodTranslation } from "@prisma/client";

export type TranslatedFood = Food & {
  translation?: [Pick<FoodTranslation, "name" | "description">];
};
