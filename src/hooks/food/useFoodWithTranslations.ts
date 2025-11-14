"use client";
import axios from "@/common/axios";
import { useQuery } from "@tanstack/react-query";
import { Food, FoodVariant } from "@prisma/client";

type FoodWithAllTranslations = Food & {
  translations: {
    language: string;
    name: string;
    description?: string | null;
  }[];
  variants: Pick<
    FoodVariant,
    "id" | "label" | "price" | "currency" | "isSeasonal" | "available"
  >[];
};

const useFoodWithTranslations = (foodId: string | null) => {
  return useQuery({
    queryKey: ["food-with-translations", foodId],
    queryFn: () =>
      axios
        .get<FoodWithAllTranslations>(`/foods/${foodId}`, {
          params: { includeAllTranslations: true },
        })
        .then((res) => res.data),
    enabled: !!foodId,
  });
};

export default useFoodWithTranslations;
