"use client";
import axios from "@/common/axios";
import { TABLE_PAGINATION_SIZE } from "@/config/app";
import { GetTablesWithPaginationResponse } from "@/types/api/table/GET";
import { useQuery } from "@tanstack/react-query";

type UseTablesParams = {
  page?: number;
  count?: number;
  search?: string;
  isStaging?: boolean;
  withPeople?: boolean;
};

const useTables = ({
  page = 1,
  count = TABLE_PAGINATION_SIZE,
  search,
  isStaging = false,
  withPeople = false,
}: UseTablesParams = {}) => {
  return useQuery<GetTablesWithPaginationResponse, Error>({
    queryKey: ["tables", page, count, search, isStaging, withPeople],
    queryFn: () =>
      axios
        .get<GetTablesWithPaginationResponse>("/tables", {
          params: {
            page,
            count,
            search,
            isStaging,
            people: withPeople,
          },
        })
        .then((res) => res.data),
  });
};

export default useTables;
