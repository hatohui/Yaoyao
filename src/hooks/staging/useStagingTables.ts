"use client";
import axios from "@/common/axios";
import { TABLE_PAGINATION_SIZE } from "@/config/app";
import { GetStagingTablesWithPaginationResponse } from "@/types/api/staging/GET";
import { useQuery } from "@tanstack/react-query";

type UseStagingTablesParams = {
  page?: number;
  count?: number;
  search?: string;
};

const useStagingTables = ({
  page = 1,
  count = TABLE_PAGINATION_SIZE,
  search,
}: UseStagingTablesParams = {}) => {
  return useQuery<GetStagingTablesWithPaginationResponse, Error>({
    queryKey: ["staging-tables", page, count, search],
    queryFn: () =>
      axios
        .get<GetStagingTablesWithPaginationResponse>("/tables/staging", {
          params: { page, count, search },
        })
        .then((res) => res.data),
  });
};

export default useStagingTables;
