import axios from "@/common/axios";
import { Language } from "@/common/language";
import { GetPresetMenuResponse } from "@/types/api/preset-menu/GET";
import { useQuery } from "@tanstack/react-query";

const usePresetMenus = (lang: Language = "en") => {
  return useQuery({
    queryKey: ["preset-menus", lang],
    queryFn: () =>
      axios
        .get<GetPresetMenuResponse>("/preset-menu", {
          params: { lang },
        })
        .then((res) => res.data),
    retry: false,
  });
};

export default usePresetMenus;
