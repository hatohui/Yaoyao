import axios from "@/common/axios";
import { TableObject } from "@/types/models/table";
import { useQuery } from "@tanstack/react-query";

export const useLayouts = () => {
  return useQuery<TableObject[]>({
    queryKey: ["layouts"],
    queryFn: async () => axios.get("/layouts").then((res) => res.data),
  });
};
