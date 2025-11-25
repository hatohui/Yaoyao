"use client";
import axios from "@/common/axios";
import {
  GetFeedbackResponse,
  PostFeedbackRequest,
  PostFeedbackResponse,
} from "@/types/api/feedback";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetFeedback = () => {
  return useQuery<GetFeedbackResponse, Error>({
    queryKey: ["feedback"],
    queryFn: () =>
      axios.get<GetFeedbackResponse>("/feedback").then((res) => res.data),
  });
};

export const useCreateFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostFeedbackRequest) =>
      axios
        .post<PostFeedbackResponse>("/feedback", data)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },
  });
};
