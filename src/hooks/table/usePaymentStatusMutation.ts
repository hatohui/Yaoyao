"use client";
import axios from "@/common/axios";
import useMutationWithError from "@/hooks/common/useMutationWithError";
import { useQueryClient } from "@tanstack/react-query";

export const usePaymentStatusMutation = (tableId: string) => {
  const queryClient = useQueryClient();

  return useMutationWithError({
    mutationFn: (paid: boolean) =>
      axios.put(`/tables/${tableId}/payment`, { paid }),
    successMessageKey: "paymentStatusUpdated",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({ queryKey: ["table", tableId] });
      queryClient.invalidateQueries({ queryKey: ["tables"] });
    },
  });
};
