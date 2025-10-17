import usePeopleInTableMutation from "@/hooks/table/usePeopleInTableMutation";
import { useTranslations } from "next-intl";
import React from "react";
import AddPersonForm from "../forms/AddPersonForm";
import { GetTableByIdResponse } from "@/types/api/table/GET";
import { People } from "@prisma/client";

type PeopleMutationBoxProps = {
  id: string;
  userId?: string | null;
  table: GetTableByIdResponse | undefined;
  people: People[] | undefined;
};

const PeopleMutationBox = ({
  id,
  userId,
  table,
  people,
}: PeopleMutationBoxProps) => {
  const t = useTranslations("tables");
  const { addPeople } = usePeopleInTableMutation();

  const handleSubmit = (name: string) => {
    addPeople.mutate({ tableId: id, name, userId: userId || undefined });
  };

  // Check if table is full
  const currentCount = people?.length ?? 0;
  const capacity = table?.capacity ?? 0;
  const isFull = currentCount >= capacity;

  // Don't render if table is full
  if (isFull) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-main/10">
      {/* Compact Header */}
      <div className="bg-darkest px-4 py-2.5">
        <h2 className="text-sm font-semibold text-white">{t("addPerson")}</h2>
      </div>

      {/* Content */}
      <div className="p-4">
        <AddPersonForm
          onSubmit={handleSubmit}
          isPending={addPeople.isPending}
          formError={addPeople.formError}
          formSuccess={addPeople.formSuccess}
          clearError={addPeople.clearError}
        />
      </div>
    </div>
  );
};

export default PeopleMutationBox;
