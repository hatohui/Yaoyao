import { TranslatedFood } from "@/types/models/food";

export type GetFoodsResponse = {
  foods: TranslatedFood[];
  pagination: {
    page: number;
    count: number;
    total: number;
    totalPages: number;
  };
};

export type GetFoodByIdResponse = TranslatedFood | null;
