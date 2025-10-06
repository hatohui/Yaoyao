import { Food } from "@/generated/prisma";

export type GetFoodsResponse = Food[];
export type GetFoodByIdResponse = Food | null;
