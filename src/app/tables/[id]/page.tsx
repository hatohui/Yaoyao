"use client";
import PeopleInTable from "@/components/table/PeopleInTable";
import PeopleMutationBox from "@/components/table/PeopleMutationBox";
import TableDetail from "@/components/table/TableDetail";
import TableMutationBox from "@/components/table/TableMutationBox";
import usePeopleInTable from "@/hooks/table/usePeopleInTable";
import useTableDetail from "@/hooks/table/useTableDetail";
import { useParams, useSearchParams } from "next/navigation";
import TableDetailHeader from "@/components/table/TableDetailHeader";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import PaymentStatusToggle from "@/components/table/PaymentStatusToggle";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { useTranslations } from "next-intl";

const TableDetailPage = () => {
  const { id } = useParams() as { id: string };
  const searchParams = useSearchParams();
  const userId = searchParams?.get("id");

  const { data: table, isLoading: isLoadingTable } = useTableDetail(id);
  const { data: people, isLoading: isLoadingPeople } = usePeopleInTable(
    table?.id ?? ""
  );
  const { isVerified } = useYaoAuth();
  const t = useTranslations("orders");

  const isLoading = isLoadingTable || isLoadingPeople;
  const isOccupied = !!table?.tableLeader;
  const isTableLeader = table?.tableLeader?.id === userId;

  const canManage = isVerified || isTableLeader;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Compact Header */}
      <TableDetailHeader
        table={table}
        isOccupied={isOccupied}
        isTableLeader={isTableLeader}
        isVerified={isVerified}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Left Column - Table Info & Management */}
          <div className="space-y-3 md:space-y-4">
            {/* Manage Orders Button - For Table Leaders and Yaoyao */}
            {table?.tableLeader && canManage && (
              <Link
                href={`/orders?table=${table.id}&id=${table.tableLeader.id}`}
                className="block w-full bg-darkest hover:bg-darkest/90 text-white font-medium py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-main/20"
              >
                <div className="flex items-center justify-center gap-2">
                  <FiShoppingCart className="w-5 h-5" />
                  <span className="text-sm">
                    {t("manageOrders") || "Manage Orders"}
                  </span>
                </div>
              </Link>
            )}

            <TableDetail table={table} isloading={isLoading} />
            {isVerified && <TableMutationBox table={table} />}
            {isVerified && table && (
              <PaymentStatusToggle
                tableId={table.id}
                isPaid={table.paid ?? false}
              />
            )}
          </div>

          {/* Right Column - People Management */}
          <div className="space-y-3 md:space-y-4">
            {canManage && <PeopleMutationBox id={id} userId={userId} />}
            <PeopleInTable
              table={table}
              people={people}
              canManage={canManage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDetailPage;
