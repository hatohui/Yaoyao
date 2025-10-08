"use client";
import PeopleInTable from "@/components/table/PeopleInTable";
import PeopleMutationBox from "@/components/table/PeopleMutationBox";
import TableDetail from "@/components/table/TableDetail";
import TableMutationBox from "@/components/table/TableMutationBox";
import usePeopleInTable from "@/hooks/usePeopleInTable";
import useTableDetail from "@/hooks/useTableDetail";
import { useParams } from "next/navigation";
import TableDetailHeader from "@/components/table/TableDetailHeader";
import useYaoAuth from "@/hooks/auth/useYaoAuth";

const TableDetailPage = () => {
  const { id } = useParams() as { id: string };
  const { data: table, isLoading: isLoadingTable } = useTableDetail(id);
  const { data: people, isLoading: isLoadingPeople } = usePeopleInTable(
    table?.id ?? ""
  );
  const { isVerified } = useYaoAuth();

  const isLoading = isLoadingTable || isLoadingPeople;
  const isOccupied = !!table?.tableLeader;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Compact Header */}
      <TableDetailHeader table={table} isOccupied={isOccupied} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Table Info */}
          <div className="lg:col-span-1 space-y-4">
            <TableDetail table={table} isloading={isLoading} />
            {isVerified && <TableMutationBox table={table} />}
          </div>

          {/* Right Column - People Management */}
          <div className="lg:col-span-2 space-y-4">
            {isVerified && <PeopleMutationBox id={id} />}
            <PeopleInTable table={table} people={people} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDetailPage;
