"use client";
import PeopleInTable from "@/components/table/people/PeopleInTable";
import usePeopleInTable from "@/hooks/table/usePeopleInTable";
import useTableDetail from "@/hooks/table/useTableDetail";
import useTableOrders from "@/hooks/order/useTableOrders";
import { useParams } from "next/navigation";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import TableOrdersList from "@/components/order/TableOrdersList";
import TableDetail from "@/components/table/details/TableDetail";
import TableDetailHeader from "@/components/table/details/TableDetailHeader";

const TableDetailPage = () => {
  const { id } = useParams() as { id: string };

  const {
    data: table,
    isLoading: isLoadingTable,
    isFetching: isFetchingTable,
  } = useTableDetail(id);
  const {
    data: people,
    isLoading: isLoadingPeople,
    isFetching: isFetchingPeople,
  } = usePeopleInTable(table?.id ?? "");
  const { isYaoyao, canManage, isTableLeader, userId } = useYaoAuth();

  const { data: orders } = useTableOrders(id);
  const isLoading = isLoadingTable || isLoadingPeople;
  const hasOrders = orders && orders.length > 0;
  const isNormalMember = !canManage;

  return (
    <div className="nav-spacer h-screen bg-slate-50 dark:bg-slate-900">
      {/* Compact Header */}
      <TableDetailHeader
        table={table}
        isTableLeader={isTableLeader}
        isYaoyao={isYaoyao}
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
                  <TableDetail
                    table={table}
                    isloading={isLoading}
                    isFetching={isFetchingTable}
                  />
                  <div className="flex-1 flex flex-col min-h-0">
                    <PeopleInTable
                      table={table}
                      people={people}
                      canManage={canManage}
                      tableId={id}
                      userId={userId}
                      isLoading={isLoadingPeople}
                      isFetching={isFetchingPeople}
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
                  <TableDetail
                    table={table}
                    isloading={isLoading}
                    isFetching={isFetchingTable}
                  />
                </div>

                {/* No orders: Members - Takes 2 columns */}
                <div className="lg:col-span-2">
                  <PeopleInTable
                    table={table}
                    people={people}
                    canManage={canManage}
                    tableId={id}
                    userId={userId}
                    isLoading={isLoadingPeople}
                    isFetching={isFetchingPeople}
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
                  <TableDetail
                    table={table}
                    isloading={isLoading}
                    isFetching={isFetchingTable}
                  />
                  <div className="flex-1 flex flex-col min-h-0">
                    <PeopleInTable
                      table={table}
                      people={people}
                      canManage={canManage}
                      tableId={id}
                      userId={userId}
                      isLoading={isLoadingPeople}
                      isFetching={isFetchingPeople}
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
                  <TableDetail
                    table={table}
                    isloading={isLoading}
                    isFetching={isFetchingTable}
                  />
                </div>

                {/* No orders: Members (2/3 width) */}
                <div className="lg:col-span-2">
                  <PeopleInTable
                    table={table}
                    people={people}
                    canManage={canManage}
                    tableId={id}
                    userId={userId}
                    isLoading={isLoadingPeople}
                    isFetching={isFetchingPeople}
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
