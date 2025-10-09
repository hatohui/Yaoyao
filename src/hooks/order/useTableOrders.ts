"use client";
import axios from "@/common/axios";
import { GetOrdersResponse } from "@/types/api/order/GET";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const useTableOrders = (tableId: string) => {
  const locale = useSearchParams()?.get("lang") || "en";

  return useQuery<GetOrdersResponse[], Error>({
    queryKey: ["orders", tableId, locale],
    queryFn: () =>
      axios
        .get<GetOrdersResponse[]>(`/tables/${tableId}/orders`, {
          params: { lang: locale },
        })
        .then((res) => res.data),
    enabled: !!tableId,
  });
};

export default useTableOrders;
