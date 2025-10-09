import useTableMutation from "@/hooks/table/useTableMutation";
import { GetTableByIdResponse } from "@/types/api/table/GET";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import CapacityForm from "./forms/CapacityForm";

export type TableMutationBoxProps = {
  table: GetTableByIdResponse | undefined;
};

const TableMutationBox = ({ table }: TableMutationBoxProps) => {
  const { changeCapacity } = useTableMutation();
  const t = useTranslations("tables");
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (capacity: number) => {
    changeCapacity.mutate(
      {
        newCapacity: capacity,
        tableId: table?.id ?? "",
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-main/10">
      {/* Compact Header */}
      <div className="bg-darkest px-4 py-2.5">
        <h2 className="text-sm font-semibold text-white">
          {t("tableSettings")}
        </h2>
      </div>

      {/* Content */}
      <div className="p-4">
        <CapacityForm
          key={table?.capacity ?? 0}
          currentCapacity={table?.capacity ?? 0}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onEdit={handleEdit}
          isPending={changeCapacity.isPending}
          isEditing={isEditing}
          formError={changeCapacity.formError}
          formSuccess={changeCapacity.formSuccess}
          clearError={changeCapacity.clearError}
        />
      </div>
    </div>
  );
};

export default TableMutationBox;
