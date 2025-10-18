import axios from "@/common/axios";
import { GetFoodByIdResponse } from "@/types/api/food/GET";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const useFoodById = (id: string | null) => {
  const locale = useSearchParams()?.get("lang") || "en";

  return useQuery<GetFoodByIdResponse>({
    queryKey: ["food", id, locale],
    queryFn: async () => {
      const response = await axios.get(`/foods/${id}`, {
        params: { lang: locale },
      });
      return response.data;
    },
    enabled: !!id, // Only run query if id exists
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export default useFoodById;
