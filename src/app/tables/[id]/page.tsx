"use client";
import PeopleInTable from "@/components/table/people/PeopleInTable";
import TableDetail from "@/components/table/TableDetail";
import usePeopleInTable from "@/hooks/table/usePeopleInTable";
import useTableDetail from "@/hooks/table/useTableDetail";
import useTableOrders from "@/hooks/order/useTableOrders";
import { useParams, useSearchParams } from "next/navigation";
import TableDetailHeader from "@/components/table/TableDetailHeader";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import TableOrdersList from "@/components/order/TableOrdersList";
import ManageOrderButton from "@/components/table/buttons/ManageOrderButton";

const TableDetailPage = () => {
  const { id } = useParams() as { id: string };
  const searchParams = useSearchParams();
  const userId = searchParams?.get("id");

  const { data: table, isLoading: isLoadingTable } = useTableDetail(id);
  const { data: people, isLoading: isLoadingPeople } = usePeopleInTable(
    table?.id ?? ""
  );
  const { data: orders } = useTableOrders(id);
  const { isVerified } = useYaoAuth();

  const isLoading = isLoadingTable || isLoadingPeople;
  const isOccupied = !!table?.tableLeader;
  const isTableLeader = table?.tableLeader?.id === userId;
  const canManage = isVerified || isTableLeader;

  // Check if there are any orders
  const hasOrders = orders && orders.length > 0;

  // Check if user is a normal member (not verified and not table leader)
  const isNormalMember = !isVerified && !isTableLeader;

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
        {isNormalMember ? (
          /* Layout for normal members: Table Details and Members side by side */
          <div className="grid grid-cols-1 lg:grid-cols-2 md:space-x-5 max-w-7xl mx-auto space-y-3 md:space-y-4">
            <div
              className={`gap-4 md:gap-6 space-y-3 md:space-y-4 items-start ${
                hasOrders ? "" : ""
              }`}
            >
              <TableDetail table={table} isloading={isLoading} />
              <PeopleInTable
                table={table}
                people={people}
                canManage={canManage}
                tableId={id}
                userId={userId}
              />
            </div>
            {/* Orders section below for normal members */}
            {hasOrders && (
              <div className="space-y-3 md:space-y-4 min-h-[500px]">
                <TableOrdersList tableId={id} />
              </div>
            )}
          </div>
        ) : (
          /* Original layout for verified users and table leaders */
          <div
            className={`grid grid-cols-1 ${
              hasOrders ? "lg:grid-cols-2" : "lg:grid-cols-1 max-w-2xl mx-auto"
            } gap-4 md:gap-6 items-start`}
          >
            {/* Left Column - Table Info & Management & People */}
            <div className="space-y-3 md:space-y-4">
              <TableDetail table={table} isloading={isLoading} />

              {/* People Management - Always in left column */}
              <PeopleInTable
                table={table}
                people={people}
                canManage={canManage}
                tableId={id}
                userId={userId}
              />
            </div>

            {/* Right Column - Table Orders (only shown when there are orders) */}
            <div className="space-y-3 md:space-y-4 min-h-[500px]">
              {/* Manage Orders Button - For Table Leaders and Yaoyao */}
              {table?.tableLeader && canManage && (
                <ManageOrderButton table={table} />
              )}
              {hasOrders && <TableOrdersList tableId={id} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableDetailPage;
