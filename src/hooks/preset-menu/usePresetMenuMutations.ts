import axios from "@/common/axios";
import { DeletePresetMenuResponse } from "@/types/api/preset-menu/DELETE";
import {
  PostPresetMenuRequest,
  PostPresetMenuResponse,
} from "@/types/api/preset-menu/POST";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePresetMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostPresetMenuRequest) =>
      axios
        .post<PostPresetMenuResponse>("/preset-menu", data)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["preset-menus"] });
    },
  });
};

export const useDeletePresetMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      axios
        .delete<DeletePresetMenuResponse>(`/preset-menu/${id}`)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["preset-menus"] });
    },
  });
};
