import { Food } from "@prisma/client";

export type GetFoodsResponse = Food[];
export type GetFoodByIdResponse = Food | null;
