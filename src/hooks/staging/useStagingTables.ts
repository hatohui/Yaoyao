"use client";
import axios from "@/common/axios";
import { TABLE_PAGINATION_SIZE } from "@/config/app";
import { GetStagingTablesWithPaginationResponse } from "@/types/api/staging/GET";
import { useQuery } from "@tanstack/react-query";

type UseStagingTablesParams = {
  page?: number;
  count?: number;
  search?: string;
  direction?: "asc" | "desc";
};

const useStagingTables = ({
  page = 1,
  count = TABLE_PAGINATION_SIZE,
  search,
  direction,
}: UseStagingTablesParams = {}) => {
  return useQuery<GetStagingTablesWithPaginationResponse, Error>({
    queryKey: ["staging-tables", page, count, search, direction],
    queryFn: () =>
      axios
        .get<GetStagingTablesWithPaginationResponse>("/tables/staging", {
          params: { page, count, search, direction },
        })
        .then((res) => res.data),
  });
};

export default useStagingTables;
