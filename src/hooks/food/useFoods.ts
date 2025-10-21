import axios from "@/common/axios";
import { MENU_PAGINATION_SIZE } from "@/config/app";
import { GetFoodsResponse } from "@/types/api/food/GET";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

type UseFoodsParams = {
  category?: string | null;
  page?: number;
  count?: number;
  search?: string;
};

const useFoods = ({
  category,
  page = 1,
  count = MENU_PAGINATION_SIZE,
  search,
}: UseFoodsParams = {}) => {
  const locale = useSearchParams()?.get("lang") || "en";

  return useQuery({
    queryKey: ["foods", category, page, count, search, locale],
    queryFn: () =>
      axios
        .get<GetFoodsResponse>("/foods", {
          params: { category, lang: locale, page, count, search },
        })
        .then((res) => res.data),
  });
};

export default useFoods;
