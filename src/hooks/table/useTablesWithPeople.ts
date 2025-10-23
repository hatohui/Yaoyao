"use client";
import useTables from "./useTables";
import { TABLE_PAGINATION_SIZE } from "@/config/app";

type UseTablesWithPeopleParams = {
  isStaging?: boolean;
  search?: string;
  page?: number;
  count?: number;
  direction?: "asc" | "desc";
};

/**
 * @deprecated This hook is now just a wrapper around useTables with withPeople: true.
 * Consider using useTables directly with the withPeople parameter.
 */
const useTablesWithPeople = ({
  isStaging = false,
  search,
  page = 1,
  count = TABLE_PAGINATION_SIZE,
  direction,
}: UseTablesWithPeopleParams = {}) => {
  return useTables({
    page,
    count,
    search,
    isStaging,
    withPeople: true,
    direction,
  });
};

export default useTablesWithPeople;
