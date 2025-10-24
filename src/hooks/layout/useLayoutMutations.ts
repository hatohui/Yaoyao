import axios from "@/common/axios";
import { PutLayoutRequest } from "@/types/api/layout/PUT";
import { PostLayoutRequest } from "@/types/api/layout/POST";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLayoutMutations = () => {
  const queryClient = useQueryClient();

  const updateLayout = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: PutLayoutRequest;
    }) => {
      return axios.put(`/layouts/${id}`, data).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["layouts"] });
      queryClient.invalidateQueries({ queryKey: ["tables", "assigned"] });
      queryClient.invalidateQueries({ queryKey: ["tables", "unassigned"] });
    },
  });

  const assignTableToSlot = useMutation({
    mutationFn: async ({
      slotId,
      tableId,
    }: {
      slotId: string;
      tableId: string;
    }) => {
      return axios
        .put(`/layouts/${slotId}`, { tableId })
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["layouts"] });
      queryClient.invalidateQueries({ queryKey: ["tables", "assigned"] });
      queryClient.invalidateQueries({ queryKey: ["tables", "unassigned"] });
    },
  });

  const unassignTable = useMutation({
    mutationFn: async ({ slotId }: { slotId: string }) => {
      return axios
        .put(`/layouts/${slotId}`, { tableId: null })
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["layouts"] });
      queryClient.invalidateQueries({ queryKey: ["tables", "assigned"] });
      queryClient.invalidateQueries({ queryKey: ["tables", "unassigned"] });
    },
  });

  const deleteSlot = useMutation({
    mutationFn: async ({ slotId }: { slotId: string }) => {
      return axios.delete(`/layouts/${slotId}`).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["layouts"] });
      queryClient.invalidateQueries({ queryKey: ["tables", "assigned"] });
      queryClient.invalidateQueries({ queryKey: ["tables", "unassigned"] });
    },
  });

  const swapTables = useMutation({
    mutationFn: async ({
      slot1Id,
      slot2Id,
    }: {
      slot1Id: string;
      slot2Id: string;
    }) => {
      return axios
        .post("/layouts/swap", { slot1Id, slot2Id })
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["layouts"] });
      queryClient.invalidateQueries({ queryKey: ["tables", "assigned"] });
    },
  });

  const createSlot = useMutation({
    mutationFn: async (data: PostLayoutRequest) => {
      return axios.post("/layouts", data).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["layouts"] });
    },
  });

  return {
    updateLayout,
    assignTableToSlot,
    unassignTable,
    deleteSlot,
    swapTables,
    createSlot,
  };
};

export default useLayoutMutations;
