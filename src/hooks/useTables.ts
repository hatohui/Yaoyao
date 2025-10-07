"use client";
import axios from "@/common/axios";
import { GetTablesResponse } from "@/types/api/table/GET";
import { useQuery } from "@tanstack/react-query";

const useTables = () =>
  useQuery<GetTablesResponse[], Error>({
    queryKey: ["tables"],
    queryFn: () =>
      axios.get<GetTablesResponse[]>("/tables").then((res) => res.data),
  });

export default useTables;
