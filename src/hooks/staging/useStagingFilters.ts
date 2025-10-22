import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { GetStagingTablesResponse } from "@/types/api/staging/GET";

export const useStagingFilters = (tables?: GetStagingTablesResponse[]) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search") || "";

  const filteredTables = useMemo(() => {
    if (!tables) return [];
    if (!searchQuery) return tables;

    const query = searchQuery.toLowerCase();
    return tables.filter(
      (table) =>
        table.name.toLowerCase().includes(query) ||
        table.tableLeader?.name.toLowerCase().includes(query)
    );
  }, [tables, searchQuery]);

  return {
    filteredTables,
    searchQuery,
    hasSearchQuery: !!searchQuery,
  };
};

export default useStagingFilters;
