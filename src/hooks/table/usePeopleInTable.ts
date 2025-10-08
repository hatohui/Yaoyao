import axios from "@/common/axios";
import { People } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const usePeopleInTable = (tableId: string) => {
  return useQuery<People[]>({
    queryKey: ["tables", tableId, "people"],
    queryFn: () =>
      axios.get<People[]>(`/tables/${tableId}/people`).then((res) => res.data),
    enabled: !!tableId,
  });
};

export default usePeopleInTable;
