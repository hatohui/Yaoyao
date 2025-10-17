import { useTranslations } from "next-intl";
import React from "react";
import { FiStar } from "react-icons/fi";

const TableLeaderTag = () => {
  const t = useTranslations("tables");

  return (
    <span className="inline-flex items-center px-1.5 py-0.5 text-xs font-semibold bg-yellow-500 text-white rounded">
      <FiStar className="w-2.5 h-2.5 mr-0.5" />
      {t("leader")}
    </span>
  );
};

export default TableLeaderTag;
