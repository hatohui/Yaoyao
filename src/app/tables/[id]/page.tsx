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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
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
          /* Layout for normal members */
          <div
            className={`grid grid-cols-1 ${
              hasOrders ? "lg:grid-cols-2" : "lg:grid-cols-3"
            } gap-4 md:gap-6 items-stretch`}
          >
            {hasOrders ? (
              <>
                {/* Left Column - Table Details and Members stacked */}
                <div className="space-y-3 md:space-y-4 flex flex-col">
                  <TableDetail table={table} isloading={isLoading} />
                  <div className="flex-1 flex flex-col min-h-0">
                    <PeopleInTable
                      table={table}
                      people={people}
                      canManage={canManage}
                      tableId={id}
                      userId={userId}
                    />
                  </div>
                </div>

                {/* Right Column - Orders */}
                <div className="space-y-3 md:space-y-4 self-stretch">
                  <TableOrdersList tableId={id} />
                </div>
              </>
            ) : (
              <>
                {/* No orders: Table Details - Takes 1 column */}
                <div className="lg:col-span-1">
                  <TableDetail table={table} isloading={isLoading} />
                </div>

                {/* No orders: Members - Takes 2 columns */}
                <div className="lg:col-span-2">
                  <PeopleInTable
                    table={table}
                    people={people}
                    canManage={canManage}
                    tableId={id}
                    userId={userId}
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          /* Layout for verified users and table leaders */
          <div
            className={`grid grid-cols-1 ${
              hasOrders ? "lg:grid-cols-2" : "lg:grid-cols-3"
            } gap-4 md:gap-6 items-stretch`}
          >
            {hasOrders ? (
              <>
                {/* Left Column - Table Details and Members stacked */}
                <div className="space-y-3 md:space-y-4 flex flex-col">
                  <TableDetail table={table} isloading={isLoading} />
                  <div className="flex-1 flex flex-col min-h-0">
                    <PeopleInTable
                      table={table}
                      people={people}
                      canManage={canManage}
                      tableId={id}
                      userId={userId}
                    />
                  </div>
                </div>

                {/* Right Column - Orders */}
                <div className="space-y-3 md:space-y-4 self-stretch">
                  <TableOrdersList tableId={id} />
                </div>
              </>
            ) : (
              <>
                {/* No orders: Table Details (1/3 width) */}
                <div className="lg:col-span-1">
                  <TableDetail table={table} isloading={isLoading} />
                </div>

                {/* No orders: Members (2/3 width) */}
                <div className="lg:col-span-2">
                  <PeopleInTable
                    table={table}
                    people={people}
                    canManage={canManage}
                    tableId={id}
                    userId={userId}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TableDetailPage;
