import { Food } from "@prisma/client";

export type PutFoodVariant = {
  id?: string;
  label: string;
  price: number | null;
  currency: string;
  available: boolean;
  isSeasonal: boolean;
};

export type PutFoodRequest = Partial<
  Omit<Food, "id" | "createdAt" | "updatedAt">
> & {
  variants?: PutFoodVariant[];
};
export type PutFoodResponse = Food;
