import axios from "@/common/axios";
import { useQuery } from "@tanstack/react-query";
import { Language } from "@/common/language";
import { GetCategoriesResponse } from "@/types/api/category/GET";

const useCategories = (locale: Language) => {
  const lang: Language | undefined = locale !== "en" ? locale : undefined;

  return useQuery<GetCategoriesResponse>({
    queryKey: ["categories", lang],
    queryFn: () =>
      axios
        .get("/categories", lang ? { params: { lang } } : {})
        .then((res) => res.data),
  });
};

export default useCategories;
