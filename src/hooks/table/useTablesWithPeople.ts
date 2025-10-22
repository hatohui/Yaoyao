"use client";
import axios from "@/common/axios";
import { GetTablesWithPeopleResponse } from "@/types/api/table/GET";
import { TABLE_PAGINATION_SIZE } from "@/config/app";
import { useQuery } from "@tanstack/react-query";

type UseTablesWithPeopleParams = {
  isStaging?: boolean;
  search?: string;
  page?: number;
  count?: number;
};

type TablesWithPeoplePaginatedResponse = {
  tables: GetTablesWithPeopleResponse[];
  pagination: {
    page: number;
    count: number;
    total: number;
    totalPages: number;
  };
};

const useTablesWithPeople = ({
  isStaging = false,
  search,
  page = 1,
  count = TABLE_PAGINATION_SIZE,
}: UseTablesWithPeopleParams = {}) => {
  return useQuery<TablesWithPeoplePaginatedResponse, Error>({
    queryKey: ["tables-with-people", isStaging, search, page, count],
    queryFn: () =>
      axios
        .get<TablesWithPeoplePaginatedResponse>("/tables", {
          params: { people: true, isStaging, search, page, count },
        })
        .then((res) => res.data),
  });
};

export default useTablesWithPeople;
