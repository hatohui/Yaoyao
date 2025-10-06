import { Food } from "@/generated/prisma";

export type PostFoodRequest = Omit<Food, "id" | "createdAt" | "updatedAt">;
export type PostFoodResponse = Food;
