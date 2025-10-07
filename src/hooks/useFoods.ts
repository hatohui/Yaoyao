import axios from "@/common/axios";
import { GetFoodsResponse } from "@/types/api/food/GET";
import { useQuery } from "@tanstack/react-query";
import useLanguage from "@/hooks/useLanguage";

const useFoods = (category?: string | null) => {
  const { locale } = useLanguage();
  const lang = locale !== "en" ? locale : undefined;

  return useQuery({
    queryKey: ["foods", category, lang],
    queryFn: () =>
      axios
        .get<GetFoodsResponse>("/foods", { params: { category, lang } })
        .then((res) => res.data),
  });
};

export default useFoods;
