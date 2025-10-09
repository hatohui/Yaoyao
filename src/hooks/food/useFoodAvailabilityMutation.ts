"use client";
import axios from "@/common/axios";
import useMutationWithError from "@/hooks/common/useMutationWithError";
import { useQueryClient } from "@tanstack/react-query";

export const useFoodAvailabilityMutation = (foodId: string) => {
  const queryClient = useQueryClient();

  return useMutationWithError({
    mutationFn: (available: boolean) =>
      axios.put(`/foods/${foodId}`, { available }),
    successMessageKey: "availabilityUpdated",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
      queryClient.invalidateQueries({ queryKey: ["food", foodId] });
    },
  });
};
