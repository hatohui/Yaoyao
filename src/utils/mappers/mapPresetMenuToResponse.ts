import { TranslatedPresetMenu } from "@/types/models/preset-menu";

export const mapPresetMenuToResponse = (
  presetMenu: TranslatedPresetMenu
): TranslatedPresetMenu => {
  return {
    id: presetMenu.id,
    foodId: presetMenu.foodId,
    variantId: presetMenu.variantId,
    quantity: presetMenu.quantity,
    food: {
      ...presetMenu.food,
      name: presetMenu.food.translations?.[0]?.name
        ? presetMenu.food.translations[0].name
        : presetMenu.food.name,
      description: presetMenu.food.translations?.[0]?.description
        ? presetMenu.food.translations[0].description
        : presetMenu.food.description,
    },
    variant: presetMenu.variant,
  };
};
