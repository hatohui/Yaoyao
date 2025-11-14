import axios from "@/common/axios";
import { GetPresetMenuResponse } from "@/types/api/preset-menu/GET";
import { useQuery } from "@tanstack/react-query";

const usePresetMenus = () => {
  return useQuery({
    queryKey: ["preset-menus"],
    queryFn: () =>
      axios.get<GetPresetMenuResponse>("/preset-menu").then((res) => res.data),
  });
};

export default usePresetMenus;
