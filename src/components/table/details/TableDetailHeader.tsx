import { GetTableByIdResponse } from "@/types/api/table/GET";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";
// import Link from "next/link";
// import { mergeQueryParams } from "@/utils/params/mergeQueryParams";

export type TableHeaderProps = {
  table: GetTableByIdResponse | undefined;
  isTableLeader: boolean;
  isYaoyao: boolean;
};

const TableDetailHeader = ({ table }: TableHeaderProps) => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const t = useTranslations("tables");
  // const tOrders = useTranslations("orders");

  const handleback = () => {
    router.push("/tables");
  };

  // Generate orders link with preserved query params
  // const ordersLinkQuery = mergeQueryParams(searchParams, {
  //   table: table?.id,
  //   id: table?.tableLeader?.id,
  // });

  return (
    <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-main/20 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleback}
              className="p-1.5 cursor-pointer hover:bg-main/10 dark:hover:bg-slate-700 rounded-md transition-colors"
              aria-label="Go back"
            >
              <FiArrowLeft className="w-5 h-5 text-darkest dark:text-slate-300" />
            </button>

            <div>
              <h1 className="text-lg font-semibold text-darkest dark:text-slate-100">
                {table?.name || t("tableDetails")}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate text-nowrap">
                {t("manageParty")}
              </p>
            </div>
          </div>

          {/* Right Side - Status badge and Manage Orders button */}
          <div className="flex items-center gap-3">
            {/* Manage Orders Button - Only for table leaders (not verified or normal users) */}
            {/* <Link
              href={`/orders?${ordersLinkQuery}`}
              className="px-3 py-1.5 bg-main/10 dark:bg-main/20 hover:bg-main/20 dark:hover:bg-main/30 rounded-lg transition-colors text-main font-medium text-sm flex items-center gap-2"
            >
              <FiShoppingCart className="w-4 h-4" />
              <span>{tOrders("manageOrders") || "Manage Orders"}</span>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDetailHeader;
