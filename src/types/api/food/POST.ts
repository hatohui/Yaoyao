import { Food } from "@prisma/client";

export type PostFoodRequest = Omit<Food, "id" | "createdAt" | "updatedAt">;
export type PostFoodResponse = Food;
