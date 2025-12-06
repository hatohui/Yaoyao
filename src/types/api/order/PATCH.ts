// PATCH /api/tables/[tableId]/orders/[orderId]
export type PatchOrderRequest = {
  quantity?: number;
  taggedPersonId?: string | null;
};

export type PatchOrderResponse = {
  id: string;
  tableId: string;
  foodId: string;
  variantId: string | null;
  quantity: number;
  taggedPersonId: string | null;
  createdAt: string;
  updatedAt: string;
};
