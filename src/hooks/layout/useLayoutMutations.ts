import axios from "@/common/axios";
import { PutLayoutRequest } from "@/types/api/layout/PUT";
import { useMutation } from "@tanstack/react-query";

const useLayoutMutations = () => {
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
  });

  return { updateLayout };
};

export default useLayoutMutations;
