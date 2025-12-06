import { PresetMenu, Food, FoodVariant } from "@prisma/client";

// GET /api/tables/[tableId]/orders
export type GetOrdersResponse = {
  id: string;
  tableId: string;
  foodId: string;
  variantId: string | null;
  quantity: number;
  taggedPersonId: string | null;
  taggedPerson?: {
    id: string;
    name: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  food: {
    id: string;
    name: string;
    imageUrl: string | null;
    available: boolean;
    isHidden?: boolean | null;
    translations?: {
      name: string;
      description: string | null;
    }[];
    variants: {
      id: string;
      label: string;
      price: number | null;
      currency: string | null;
      available: boolean;
    }[];
  };
  variant?: {
    id: string;
    label: string;
    price: number | null;
    currency: string | null;
    available: boolean;
  } | null;
};

export type GetOrdersWithPresetsResponse = {
  orders: GetOrdersResponse[];
  presetMenus: (PresetMenu & {
    food: Food;
    variant: FoodVariant | null;
  })[];
};
