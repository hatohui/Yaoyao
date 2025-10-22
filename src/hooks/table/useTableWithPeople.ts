"use client";
import axios from "@/common/axios";
import { GetTablesWithPeopleResponse } from "@/types/api/table/GET";
import { TABLE_PAGINATION_SIZE } from "@/config/app";
import { useQuery } from "@tanstack/react-query";

type TablesWithPeoplePaginatedResponse = {
  tables: GetTablesWithPeopleResponse[];
  pagination: {
    page: number;
    count: number;
    total: number;
    totalPages: number;
  };
};

const useTablesWithPeople = () =>
  useQuery<GetTablesWithPeopleResponse[], Error>({
    queryKey: ["tables", "with-people"],
    queryFn: () =>
      axios
        .get<TablesWithPeoplePaginatedResponse>("/tables", {
          params: {
            people: true,
            count: TABLE_PAGINATION_SIZE,
          },
        })
        .then((res) => res.data.tables),
  });

export default useTablesWithPeople;
