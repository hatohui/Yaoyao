import { PresetMenu, Food, FoodVariant } from "@prisma/client";

// GET /api/preset-menu
export type GetPresetMenuResponse = {
  presetMenus: (PresetMenu & {
    food: Food;
    variant: FoodVariant | null;
  })[];
};
