"use client";
import React, { useState } from "react";
import { GetTablesWithPeopleResponse } from "@/types/api/table/GET";
import { useTranslations } from "next-intl";
import usePeopleInTableMutation from "@/hooks/table/usePeopleInTableMutation";
import TableCardHeader from "./table-card/TableCardHeader";
import TableCardEmpty from "./table-card/TableCardEmpty";
import TableCardPeopleList from "./table-card/TableCardPeopleList";
import TableCardAddMember from "./table-card/TableCardAddMember";

type DashboardTableCardProps = {
  table: GetTablesWithPeopleResponse;
  isStaging?: boolean;
};

const DashboardTableCard = ({
  table,
  isStaging = false,
}: DashboardTableCardProps) => {
  const t = useTranslations("tables");
  const { addPeople, removePeople } = usePeopleInTableMutation();
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");

  const people = table.people || [];
  const peopleCount = people.length;
  const capacity = table.capacity;
  const isFull = peopleCount >= capacity;
  const occupancyPercentage = capacity > 0 ? (peopleCount / capacity) * 100 : 0;
  const canAddMember = !isFull;

  const handleAddMember = () => {
    if (!newMemberName.trim()) return;

    addPeople.mutate(
      { tableId: table.id, name: newMemberName.trim() },
      {
        onSuccess: () => {
          setNewMemberName("");
          setIsAddingMember(false);
        },
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddMember();
    } else if (e.key === "Escape") {
      setIsAddingMember(false);
      setNewMemberName("");
    }
  };

  const handleDelete = (personId: string) => {
    if (window.confirm(t("confirmRemove"))) {
      removePeople.mutate({ tableId: table.id, personId });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-lg hover:border-main/30 dark:hover:border-main/40">
      <TableCardHeader
        tableName={table.name}
        peopleCount={peopleCount}
        capacity={capacity}
        isFull={isFull}
        occupancyPercentage={occupancyPercentage}
        isStaging={isStaging}
        referenceId={table.referenceId}
      />

      <div className="p-4">
        <div className="space-y-2 min-h-[160px]">
          {people.length === 0 && !isAddingMember ? (
            <TableCardEmpty
              canAddMember={canAddMember}
              onAddClick={() => setIsAddingMember(true)}
            />
          ) : (
            <>
              <TableCardPeopleList
                people={people}
                tableLeaderId={table.tableLeader?.id}
                onDelete={handleDelete}
              />

              <TableCardAddMember
                isAddingMember={isAddingMember}
                newMemberName={newMemberName}
                onNameChange={setNewMemberName}
                onKeyPress={handleKeyPress}
                onBlur={() => {
                  if (!newMemberName.trim()) {
                    setIsAddingMember(false);
                  }
                }}
                onAddClick={() => setIsAddingMember(true)}
                isPending={addPeople.isPending}
                canAddMember={canAddMember}
              />
            </>
          )}
        </div>

        {/* Full Capacity Warning */}
        {isFull && (
          <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-xs text-red-700 dark:text-red-400 text-center">
              {t("full")} - {peopleCount}/{capacity}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTableCard;
