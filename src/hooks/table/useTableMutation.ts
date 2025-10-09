import axios from "@/common/axios";
import { useQueryClient } from "@tanstack/react-query";
import useMutationWithError from "../common/useMutationWithError";

const useTableMutation = () => {
  const client = useQueryClient();

  const changeCapacity = useMutationWithError({
    mutationFn: (data: { newCapacity: number; tableId: string }) =>
      axios
        .put(`/tables/${data.tableId}`, { capacity: data.newCapacity })
        .then((res) => res.data),
    successMessageKey: "success",
    onSuccessCallback: () => {
      client.invalidateQueries({ queryKey: ["tables"] });
    },
  });

  return { changeCapacity };
};

export default useTableMutation;
