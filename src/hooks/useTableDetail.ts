"use client";
import axios from "@/common/axios";
import { GetTableByIdResponse } from "@/types/api/table/GET";
import { useQuery } from "@tanstack/react-query";

const useTableDetail = (id: string) =>
  useQuery<GetTableByIdResponse, Error>({
    queryKey: ["tables", id],
    queryFn: () =>
      axios.get<GetTableByIdResponse>(`/tables/${id}`).then((res) => res.data),
  });

export default useTableDetail;
