"use client";
import axios from "@/common/axios";
import useMutationWithError from "@/hooks/common/useMutationWithError";
import { PostOrderRequest } from "@/types/api/order/POST";
import { PatchOrderRequest } from "@/types/api/order/PATCH";
import { useQueryClient } from "@tanstack/react-query";

export const useAddOrder = (tableId: string) => {
  const queryClient = useQueryClient();

  return useMutationWithError({
    mutationFn: (data: PostOrderRequest) =>
      axios.post(`/tables/${tableId}/orders`, data),
    successMessageKey: "orderAdded",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", tableId] });
    },
  });
};

export const useUpdateOrder = (tableId: string, orderId: string) => {
  const queryClient = useQueryClient();

  return useMutationWithError({
    mutationFn: (data: PatchOrderRequest) =>
      axios.put(`/tables/${tableId}/orders/${orderId}`, data),
    successMessageKey: "orderUpdated",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", tableId] });
    },
  });
};

export const useDeleteOrder = (tableId: string, orderId: string) => {
  const queryClient = useQueryClient();

  return useMutationWithError({
    mutationFn: () => axios.delete(`/tables/${tableId}/orders/${orderId}`),
    successMessageKey: "orderRemoved",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", tableId] });
    },
  });
};
