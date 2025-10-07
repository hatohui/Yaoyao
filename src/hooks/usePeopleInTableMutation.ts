import axios from "@/common/axios";
import { People } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePeopleInTableMutation = () => {
  const client = useQueryClient();

  const addPeople = useMutation({
    mutationFn: (data: { tableId: string; name: string }) =>
      axios.post<People>(`/tables/${data.tableId}`, { name: data.name }),
    onSuccess: (_data, variables) => {
      client.invalidateQueries({
        queryKey: ["tables", variables.tableId, "people"],
      });
    },
  });

  const removePeople = useMutation({
    mutationFn: (data: { tableId: string; personId: string }) =>
      axios.delete(`/tables/${data.tableId}/people/${data.personId}`),
    onSuccess: (_data, variables) => {
      client.invalidateQueries({
        queryKey: ["tables", variables.tableId, "people"],
      });
    },
  });

  const assignLeader = useMutation({
    mutationFn: (data: { tableId: string; personId: string }) =>
      axios.put(`/tables/${data.tableId}/leader`, {
        id: data.personId,
      }),
    onSuccess: (_data, variables) => {
      client.invalidateQueries({
        queryKey: ["tables", variables.tableId],
      });
    },
  });

  const removeLeader = useMutation({
    mutationFn: (data: { tableId: string }) =>
      axios.delete(`/tables/${data.tableId}/leader`),
    onSuccess: (_data, variables) => {
      client.invalidateQueries({
        queryKey: ["tables", variables.tableId],
      });
    },
  });

  return { addPeople, removePeople, assignLeader, removeLeader };
};

export default usePeopleInTableMutation;
