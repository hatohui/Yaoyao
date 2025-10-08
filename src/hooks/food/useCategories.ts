import axios from "@/common/axios";
import { useQuery } from "@tanstack/react-query";
import { GetCategoriesResponse } from "@/types/api/category/GET";
import { useSearchParams } from "next/navigation";

const useCategories = () => {
  const locale = useSearchParams()?.get("lang") || "en";

  return useQuery<GetCategoriesResponse>({
    queryKey: ["categories", locale],
    queryFn: () =>
      axios
        .get("/categories", { params: { lang: locale } })
        .then((res) => res.data),
  });
};

export default useCategories;
