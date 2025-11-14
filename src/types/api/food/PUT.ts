import { Food } from "@prisma/client";

export type PutFoodVariant = {
  id?: string;
  label: string;
  price: number | null;
  currency: string;
  available: boolean;
  isSeasonal: boolean;
};

export type PutFoodTranslation = {
  language: string;
  name: string;
  description?: string;
};

export type PutFoodRequest = Partial<
  Omit<Food, "id" | "createdAt" | "updatedAt">
> & {
  variants?: PutFoodVariant[];
  translations?: PutFoodTranslation[];
};
export type PutFoodResponse = Food;
