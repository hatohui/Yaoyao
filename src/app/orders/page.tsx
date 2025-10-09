"use client";

import useTableDetail from "@/hooks/table/useTableDetail";
import { notFound, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import Loading from "@/components/common/Loading";

const OrderPage = () => {
  const params = useSearchParams();
  const tableId = params?.get("table");
  const id = params?.get("id");

  const { data: table, isLoading } = useTableDetail(tableId || "");

  useEffect(() => {
    if (isLoading) return;

    if (!tableId || !table || !id || table.tableLeader?.id !== id) {
      notFound();
    }
  }, [table, tableId, id, isLoading]);

  if (isLoading) return <Loading />;

  return <div>{`Table: ${table?.name}, ID: ${id}`}</div>;
};

export default OrderPage;
