import axios from "@/common/axios";
import { useQueryClient } from "@tanstack/react-query";
import useMutationWithError from "../common/useMutationWithError";
import useYaoAuth from "../auth/useYaoAuth";

const useTableMutation = () => {
  const client = useQueryClient();
  const { isVerified } = useYaoAuth();

  const changeCapacity = useMutationWithError({
    mutationFn: (data: { newCapacity: number; tableId: string }) =>
      axios
        .put(`/tables/${data.tableId}`, {
          capacity: data.newCapacity,
          id: isVerified ? "yaoyao" : undefined,
        })
        .then((res) => res.data),
    successMessageKey: "success",
    onSuccessCallback: () => {
      client.invalidateQueries({ queryKey: ["tables"] });
    },
  });

  return { changeCapacity };
};

export default useTableMutation;
