import axios from "@/common/axios";
import { GetLayouts } from "@/types/api/layout/GET";
import { useQuery } from "@tanstack/react-query";

export const useLayouts = () => {
  return useQuery<GetLayouts>({
    queryKey: ["layouts"],
    queryFn: async () => axios.get("/layouts").then((res) => res.data),
  });
};
