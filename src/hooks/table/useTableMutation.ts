import axios from "@/common/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useTableMutation = () => {
  const client = useQueryClient();

  const changeCapacity = useMutation({
    mutationFn: (data: { newCapacity: number; tableId: string }) =>
      axios
        .put(`/tables/${data.tableId}`, { capacity: data.newCapacity })
        .then((res) => res.data),
    onSuccess: (_data, variables) => {
      client.invalidateQueries({ queryKey: ["tables", variables.tableId] });
    },
  });

  return { changeCapacity };
};

export default useTableMutation;
