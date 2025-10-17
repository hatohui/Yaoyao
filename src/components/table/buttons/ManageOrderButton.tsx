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
      className="block w-full bg-darkest hover:bg-darkest/90 text-white font-medium py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-main/20"
    >
      <div className="flex items-center justify-center gap-2">
        <FiShoppingCart className="w-5 h-5" />
        <span className="text-sm">{t("manageOrders") || "Manage Orders"}</span>
      </div>
    </Link>
  );
};

export default ManageOrderButton;
