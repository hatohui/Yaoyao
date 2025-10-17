import { GetTableByIdResponse } from "@/types/api/table/GET";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const ManageOrderButton = ({
  table,
}: {
  table: GetTableByIdResponse | undefined;
}) => {
  const t = useTranslations("orders");

  return (
    <Link
      href={`/orders?table=${table?.id}&id=${table?.tableLeader?.id}`}
      className="block w-full bg-darkest dark:bg-gradient-to-r dark:from-main/20 dark:to-purple-600/20 hover:bg-darkest/90 dark:hover:from-main/30 dark:hover:to-purple-600/30 text-white font-medium py-3 px-4 rounded-lg shadow-sm hover:shadow-md dark:shadow-main/10 transition-all border border-main/20 dark:border-main/40"
    >
      <div className="flex items-center justify-center gap-2">
        <FiShoppingCart className="w-5 h-5 dark:text-main" />
        <span className="text-sm dark:text-slate-100">
          {t("manageOrders") || "Manage Orders"}
        </span>
      </div>
    </Link>
  );
};

export default ManageOrderButton;
