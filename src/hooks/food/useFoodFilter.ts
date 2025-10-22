import { GetFoodsResponse } from "@/types/api/food/GET";
import { useMemo } from "react";

const useFoodFilter = (
  foods: GetFoodsResponse | undefined,
  searchQuery: string
) => {
  return useMemo(() => {
    if (!foods) return [];
    if (!searchQuery?.trim()) return foods;

    const query = searchQuery.toLowerCase().trim();
    return foods.foods.filter((food) => {
      const translatedName = food.translations?.[0]?.name || food.name;
      const translatedDescription =
        food.translations?.[0]?.description || food.description;

      return (
        translatedName.toLowerCase().includes(query) ||
        food.name.toLowerCase().includes(query) ||
        (translatedDescription &&
          translatedDescription.toLowerCase().includes(query))
      );
    });
  }, [foods, searchQuery]);
};

export default useFoodFilter;
