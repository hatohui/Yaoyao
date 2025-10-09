// POST /api/tables/[tableId]/orders
export type PostOrderRequest = {
  foodId: string;
  variantId?: string;
  quantity: number;
};

export type PostOrderResponse = {
  id: string;
  tableId: string;
  foodId: string;
  variantId: string | null;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};
