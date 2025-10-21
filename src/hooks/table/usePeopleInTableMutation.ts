import axios from "@/common/axios";
import { People } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import useMutationWithError from "../common/useMutationWithError";

const usePeopleInTableMutation = () => {
  const client = useQueryClient();

  const addPeople = useMutationWithError({
    mutationFn: (data: { tableId: string; name: string; userId?: string }) =>
      axios.post<People>(`/tables/${data.tableId}/people`, {
        name: data.name,
      }),
    successMessageKey: "personAdded",
    onSuccessCallback: () => {
      client.invalidateQueries({
        queryKey: ["tables"],
      });
    },
  });

  const removePeople = useMutationWithError({
    mutationFn: (data: { tableId: string; personId: string }) =>
      axios.delete(`/tables/${data.tableId}/people/${data.personId}`),
    onSuccessCallback: () => {
      client.invalidateQueries({
        queryKey: ["tables"],
      });
    },
  });

  const assignLeader = useMutationWithError({
    mutationFn: (data: { tableId: string; personId: string }) =>
      axios.put(`/tables/${data.tableId}/leader`, {
        id: data.personId,
      }),
    onSuccessCallback: () => {
      client.invalidateQueries({
        queryKey: ["tables"],
      });
    },
  });

  const removeLeader = useMutationWithError({
    mutationFn: (data: { tableId: string }) =>
      axios.delete(`/tables/${data.tableId}/leader`),
    onSuccessCallback: () => {
      client.invalidateQueries({ queryKey: ["tables"] });
    },
  });

  return { addPeople, removePeople, assignLeader, removeLeader };
};

export default usePeopleInTableMutation;
