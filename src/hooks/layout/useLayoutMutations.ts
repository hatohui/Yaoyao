import axios from "@/common/axios";
import { PutLayoutRequest } from "@/types/api/layout/PUT";
import { PostLayoutRequest } from "@/types/api/layout/POST";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TableObject } from "@/types/models/table";

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
    // Optimistic update
    onMutate: async ({ id, data }) => {
      // Cancel any outgoing refetches to prevent overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: ["layouts"] });

      // Snapshot the previous value
      const previousLayouts = queryClient.getQueryData<TableObject[]>([
        "layouts",
      ]);

      // Optimistically update the cache
      if (previousLayouts) {
        queryClient.setQueryData<TableObject[]>(["layouts"], (old) => {
          if (!old) return old;
          return old.map((slot) => {
            if (slot.id === parseInt(id)) {
              return { ...slot, ...data };
            }
            return slot;
          });
        });
      }

      // Return context with snapshot
      return { previousLayouts };
    },
    // If mutation fails, rollback to previous value
    onError: (_err, _variables, context) => {
      if (context?.previousLayouts) {
        queryClient.setQueryData(["layouts"], context.previousLayouts);
      }
    },
    // Always refetch after error or success
    onSettled: () => {
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
    // Optimistic update
    onMutate: async ({ slotId }) => {
      await queryClient.cancelQueries({ queryKey: ["layouts"] });

      const previousLayouts = queryClient.getQueryData<TableObject[]>([
        "layouts",
      ]);

      if (previousLayouts) {
        queryClient.setQueryData<TableObject[]>(["layouts"], (old) => {
          if (!old) return old;
          return old.map((slot) => {
            if (slot.id === parseInt(slotId)) {
              // Remove table reference for optimistic update
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { table, ...slotWithoutTable } = slot;
              return { ...slotWithoutTable, tableId: null } as TableObject;
            }
            return slot;
          });
        });
      }

      return { previousLayouts };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousLayouts) {
        queryClient.setQueryData(["layouts"], context.previousLayouts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["layouts"] });
      queryClient.invalidateQueries({ queryKey: ["tables", "assigned"] });
      queryClient.invalidateQueries({ queryKey: ["tables", "unassigned"] });
    },
  });

  const deleteSlot = useMutation({
    mutationFn: async ({ slotId }: { slotId: string }) => {
      return axios.delete(`/layouts/${slotId}`).then((res) => res.data);
    },
    // Optimistic update
    onMutate: async ({ slotId }) => {
      await queryClient.cancelQueries({ queryKey: ["layouts"] });

      const previousLayouts = queryClient.getQueryData<TableObject[]>([
        "layouts",
      ]);

      if (previousLayouts) {
        queryClient.setQueryData<TableObject[]>(["layouts"], (old) => {
          if (!old) return old;
          return old.filter((slot) => slot.id !== parseInt(slotId));
        });
      }

      return { previousLayouts };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousLayouts) {
        queryClient.setQueryData(["layouts"], context.previousLayouts);
      }
    },
    onSettled: () => {
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
