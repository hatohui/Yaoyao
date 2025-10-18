import { GetTableByIdResponse } from "@/types/api/table/GET";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { mergeQueryParams } from "@/utils/mergeQueryParams";

const ManageOrderButton = ({
  table,
}: {
  table: GetTableByIdResponse | undefined;
}) => {
  const t = useTranslations("orders");
  const searchParams = useSearchParams();

  const queryString = mergeQueryParams(searchParams, {
    table: table?.id,
    id: table?.tableLeader?.id,
  });

  return (
    <Link href={`/orders?${queryString}`} className="block w-full button">
      <div className="flex items-center justify-center gap-2">
        <FiShoppingCart className="w-5 h-5" />
        <span className="text-sm dark:text-slate-100">
          {t("manageOrders") || "Manage Orders"}
        </span>
      </div>
    </Link>
  );
};

export default ManageOrderButton;
