import { GetTablesResponse } from "@/types/api/table/GET";
import { useMemo } from "react";

const useFilteredTables = (
  tables: GetTablesResponse[] | undefined,
  searchQuery: string
) => {
  return useMemo(() => {
    if (!tables) return [];
    if (!searchQuery.trim()) return tables;

    const query = searchQuery.toLowerCase().trim();
    return tables.filter((table) => {
      const nameMatch = table.name.toLowerCase().includes(query);
      const leaderMatch = table?.name.toLowerCase().includes(query);

      return nameMatch || leaderMatch;
    });
  }, [tables, searchQuery]);
};

export default useFilteredTables;
