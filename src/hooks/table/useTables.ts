"use client";
import axios from "@/common/axios";
import { TABLE_PAGINATION_SIZE } from "@/config/app";
import {
  GetTablesWithPaginationResponse,
  GetTablesWithPeopleResponse,
} from "@/types/api/table/GET";
import { useQuery } from "@tanstack/react-query";

type UseTablesParams = {
  page?: number;
  count?: number;
  search?: string;
  isStaging?: boolean;
  withPeople?: boolean;
  direction?: "asc" | "desc";
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

type TablesResponse<T extends boolean> = T extends true
  ? TablesWithPeoplePaginatedResponse
  : GetTablesWithPaginationResponse;

const useTables = <T extends boolean = false>({
  page = 1,
  count = TABLE_PAGINATION_SIZE,
  search,
  isStaging = false,
  withPeople = false as T,
  direction,
}: UseTablesParams & { withPeople?: T }) => {
  return useQuery<TablesResponse<T>, Error>({
    queryKey: ["tables", page, count, search, isStaging, withPeople, direction],
    queryFn: () =>
      axios
        .get<TablesResponse<T>>("/tables", {
          params: {
            page,
            count,
            search,
            isStaging,
            people: withPeople,
            direction,
          },
        })
        .then((res) => res.data),
    retry: false,
  });
};

export default useTables;
