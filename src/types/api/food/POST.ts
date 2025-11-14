import { Food } from "@prisma/client";

export type PostFoodVariant = {
  label: string;
  price: number | null;
  currency: string;
  available: boolean;
  isSeasonal: boolean;
};

export type PostFoodTranslation = {
  language: string;
  name: string;
  description?: string;
};

export type PostFoodRequest = Omit<Food, "id" | "createdAt" | "updatedAt"> & {
  variants?: PostFoodVariant[];
  translations?: PostFoodTranslation[];
};
export type PostFoodResponse = Food;
