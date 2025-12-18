import axios from "@/common/axios";
import { useQuery } from "@tanstack/react-query";

type MostOrdered = {
  foodId: string;
  quantity: number;
  food: {
    id: string;
    name: string;
    imageUrl?: string | null;
    variants?: { id: string; label: string }[];
  } | null;
};

const useMostOrderedFoods = (limit = 3) => {
  return useQuery<MostOrdered[]>({
    queryKey: ["most-ordered", limit],
    queryFn: () =>
      axios
        .get<MostOrdered[]>("/foods/most-ordered", { params: { limit } })
        .then((r) => r.data),
  });
};

export default useMostOrderedFoods;
