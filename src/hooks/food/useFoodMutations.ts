"use client";
import axios from "@/common/axios";
import useMutationWithError from "@/hooks/common/useMutationWithError";
import { useQueryClient } from "@tanstack/react-query";
import { PostFoodRequest } from "@/types/api/food/POST";
import { PutFoodRequest } from "@/types/api/food/PUT";

export const useCreateFoodMutation = () => {
  const queryClient = useQueryClient();

  return useMutationWithError({
    mutationFn: (data: PostFoodRequest) => axios.post("/foods", data),
    successMessageKey: "foodCreated",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });
};

export const useUpdateFoodMutation = (foodId: string) => {
  const queryClient = useQueryClient();

  return useMutationWithError({
    mutationFn: (data: PutFoodRequest) => axios.put(`/foods/${foodId}`, data),
    successMessageKey: "foodUpdated",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
      queryClient.invalidateQueries({ queryKey: ["food", foodId] });
    },
  });
};

export const useDeleteFoodMutation = (foodId: string) => {
  const queryClient = useQueryClient();

  return useMutationWithError({
    mutationFn: () => axios.delete(`/foods/${foodId}`),
    successMessageKey: "foodDeleted",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });
};
