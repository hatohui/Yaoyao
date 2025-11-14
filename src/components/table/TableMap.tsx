"use client";
import useTables from "@/hooks/table/useTables";
import React, { useEffect } from "react";
import { FiInbox, FiSearch } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import TableMapLoading from "./TableMapLoading";
import TableMapEmpty from "./TableMapEmpty";
import TableMapGrid from "./TableMapGrid";

export interface TableMapProps {
  page: number;
  searchQuery?: string;
  resetPage: () => void;
  direction?: "asc" | "desc";
  sortBy?: "name" | "layout";
}

const TableMap = ({
  page,
  searchQuery = "",
  resetPage,
  direction,
  sortBy,
}: TableMapProps) => {
  const { data, isLoading } = useTables({
    page,
    search: searchQuery,
    direction,
    sortBy,
  });
  const searchParams = useSearchParams();
  const t = useTranslations("tables");

  useEffect(() => {
    if (page !== 1 && (searchQuery || searchParams?.get("category"))) {
      resetPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, searchParams, page]);

  const buildUrlWithParams = (tableId: string) => {
    const params = searchParams?.toString();
    return params ? `/tables/${tableId}?${params}` : `/tables/${tableId}`;
  };

  if (isLoading) {
    return <TableMapLoading message={t("loading")} />;
  }

  if (!data || data.tables.length === 0) {
    if (searchQuery) {
      return (
        <TableMapEmpty
          icon={FiSearch}
          title={t("noSearchResults") || "No results found"}
          message={
            t("tryDifferentSearch") ||
            `No tables found matching "${searchQuery}"`
          }
        />
      );
    }

    return (
      <TableMapEmpty
        icon={FiInbox}
        title={t("noTables")}
        message={t("noTablesMessage")}
      />
    );
  }

  return (
    <>
      {searchQuery && (
        <div className="mb-4 px-1">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t("searchResultsFor", {
              query: searchQuery,
              count: data.pagination.total,
            })}
          </p>
        </div>
      )}
      <TableMapGrid
        tables={data.tables}
        buildUrlWithParams={buildUrlWithParams}
      />
    </>
  );
};

export default TableMap;
