// GET /api/tables/[tableId]/orders
export type GetOrdersResponse = {
  id: string;
  tableId: string;
  foodId: string;
  variantId: string | null;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  food: {
    id: string;
    name: string;
    imageUrl: string | null;
    available: boolean;
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
