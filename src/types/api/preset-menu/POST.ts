// POST /api/preset-menu
export type PostPresetMenuRequest = {
  foodId: string;
  variantId?: string;
  quantity?: number;
};

export type PostPresetMenuResponse = {
  message: string;
  presetMenu: {
    id: string;
    foodId: string;
    variantId: string | null;
    quantity: number;
  };
};
