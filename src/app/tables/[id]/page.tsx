"use client";
import PeopleInTable from "@/components/table/people/PeopleInTable";
import usePeopleInTable from "@/hooks/table/usePeopleInTable";
import useTableDetail from "@/hooks/table/useTableDetail";
import { useParams } from "next/navigation";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import TableOrdersList from "@/components/order/TableOrdersList";
import TableDetail from "@/components/table/details/TableDetail";
import TableDetailHeader from "@/components/table/details/TableDetailHeader";
import ManageOrderButton from "@/components/table/buttons/ManageOrderButton";
import useTableOrders from "@/hooks/order/useTableOrders";

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
  const { data: tableOrdersData } = useTableOrders(table?.id ?? "");
  const { isYaoyao, canManage, isTableLeader, userId } = useYaoAuth();

  const isLoading = isLoadingTable || isLoadingPeople;
  const isNormalMember = !canManage;

  return (
    <div className="nav-spacer lg:h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      {/* Compact Header */}
      <TableDetailHeader
        table={table}
        isTableLeader={isTableLeader}
        isYaoyao={isYaoyao}
      />

      {/* Main Content - 1fr 2fr 1fr Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 flex-1 min-h-0 w-full">
        <div className="lg:grid flex flex-col lg:grid-cols-[1fr_2fr_1fr] gap-4 md:gap-6 h-full">
          {/* Left Column - Table Details */}
          <div className="space-y-3 md:space-y-4 flex flex-col">
            <TableDetail
              table={table}
              isloading={isLoading}
              isFetching={isFetchingTable}
            />
            {!isNormalMember && <ManageOrderButton table={table} />}
          </div>

          {/* Middle Column - Orders (2fr) */}
          <div className="flex flex-col min-h-0">
            <TableOrdersList tableId={id} />
          </div>

          {/* Right Column - People */}
          <div className="flex flex-col min-h-0">
            <PeopleInTable
              table={table}
              people={people}
              canManage={canManage}
              tableId={id}
              userId={userId}
              isLoading={isLoadingPeople}
              isFetching={isFetchingPeople}
              orders={tableOrdersData?.orders}
              presetMenus={tableOrdersData?.presetMenus}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDetailPage;
