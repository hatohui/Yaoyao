import axios from "@/common/axios";
import { GetFoodsResponse } from "@/types/api/food/GET";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const useFoods = (category?: string | null) => {
  const locale = useSearchParams()?.get("lang") || "en";

  return useQuery({
    queryKey: ["foods", category, locale],
    queryFn: () =>
      axios
        .get<GetFoodsResponse>("/foods", { params: { category, lang: locale } })
        .then((res) => res.data),
  });
};

export default useFoods;
