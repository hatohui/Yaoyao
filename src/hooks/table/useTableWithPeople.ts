"use client";
import axios from "@/common/axios";
import { GetTablesWithPeopleResponse } from "@/types/api/table/GET";
import { useQuery } from "@tanstack/react-query";

const useTablesWithPeople = () =>
  useQuery<GetTablesWithPeopleResponse[], Error>({
    queryKey: ["tables", "with-people"],
    queryFn: () =>
      axios
        .get<GetTablesWithPeopleResponse[]>("/tables?people=true")
        .then((res) => res.data),
  });

export default useTablesWithPeople;
