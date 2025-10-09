// PATCH /api/tables/[tableId]/orders/[orderId]
export type PatchOrderRequest = {
  quantity: number;
};

export type PatchOrderResponse = {
  id: string;
  tableId: string;
  foodId: string;
  variantId: string | null;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};
