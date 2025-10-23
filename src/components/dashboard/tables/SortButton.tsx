import { useTranslations } from "next-intl";
import React from "react";
import { FaSortAlphaUp, FaSortAlphaDown } from "react-icons/fa";

const SortButton = ({
  isSorted,
  direction,
  handleSort,
}: {
  isSorted: boolean;
  direction: "asc" | "desc";
  handleSort?: () => void;
}) => {
  const t = useTranslations("common");

  return (
    <button
      className="flex items-center text-sm text-gray-400 px-2 hover:text-gray-600 rounded border cursor-pointer duration-200 transition"
      onClick={handleSort}
    >
      {isSorted ? (
        direction === "asc" ? (
          <>
            <span className="mr-1">A-Z</span>
            <FaSortAlphaDown />
          </>
        ) : (
          <>
            <span className="mr-1">Z-A</span>
            <FaSortAlphaUp />
          </>
        )
      ) : (
        <span className="cursor-pointer">{t("noSort")}</span>
      )}
    </button>
  );
};

export default SortButton;
