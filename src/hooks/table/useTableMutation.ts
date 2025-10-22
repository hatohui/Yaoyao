import axios from "@/common/axios";
import { useQueryClient } from "@tanstack/react-query";
import useMutationWithError from "../common/useMutationWithError";
import { Table } from "@prisma/client";

const useTableMutation = () => {
  const client = useQueryClient();

  const createTable = useMutationWithError<
    Table,
    Error,
    { name: string; capacity?: number; isStaging?: boolean }
  >({
    mutationFn: (data) =>
      axios
        .post("/tables", {
          name: data.name,
          capacity: data.capacity || 2,
          tableLeaderId: null,
          referenceId: null,
          isStaging: data.isStaging || false,
        })
        .then((res) => res.data),
    successMessageKey: "success",
    onSuccessCallback: () => {
      client.invalidateQueries({ queryKey: ["tables"] });
      client.invalidateQueries({ queryKey: ["staging-tables"] });
    },
  });

  const changeCapacity = useMutationWithError({
    mutationFn: (data: { newCapacity: number; tableId: string }) =>
      axios
        .put(`/tables/${data.tableId}`, {
          capacity: data.newCapacity,
        })
        .then((res) => res.data),
    successMessageKey: "success",
    onSuccessCallback: () => {
      client.invalidateQueries({ queryKey: ["tables"] });
    },
  });

  const changeName = useMutationWithError({
    mutationFn: (data: { newName: string; tableId: string }) =>
      axios
        .put(`/tables/${data.tableId}`, {
          name: data.newName,
        })
        .then((res) => res.data),
    successMessageKey: "success",
    onSuccessCallback: () => {
      client.invalidateQueries({ queryKey: ["tables"] });
    },
  });

  return { createTable, changeCapacity, changeName };
};

export default useTableMutation;
