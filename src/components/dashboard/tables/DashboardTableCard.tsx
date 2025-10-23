"use client";
import React, { useState } from "react";
import { GetTablesWithPeopleResponse } from "@/types/api/table/GET";
import { useTranslations } from "next-intl";
import usePeopleInTableMutation from "@/hooks/table/usePeopleInTableMutation";
import useTableMutation from "@/hooks/table/useTableMutation";
import TableCardAddMember from "../table-card/TableCardAddMember";
import TableCardEmpty from "../table-card/TableCardEmpty";
import TableCardHeader from "../table-card/TableCardHeader";
import TableCardPeopleList from "../table-card/TableCardPeopleList";

type DashboardTableCardProps = {
  table: GetTablesWithPeopleResponse;
  isStaging?: boolean;
  isFetching?: boolean;
};

const DashboardTableCard = ({
  table,
  isStaging = false,
  isFetching = false,
}: DashboardTableCardProps) => {
  const t = useTranslations("tables");
  const { addPeople, removePeople, assignLeader, removeLeader } =
    usePeopleInTableMutation();
  const { changeName, changeCapacity, deleteTable } = useTableMutation();
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");

  const people = table.people || [];
  const peopleCount = people.length;
  const capacity = table.capacity;
  const isFull = peopleCount >= capacity;
  const occupancyPercentage = capacity > 0 ? (peopleCount / capacity) * 100 : 0;
  const canAddMember = !isFull;

  const isMutating =
    addPeople.isPending ||
    removePeople.isPending ||
    assignLeader.isPending ||
    removeLeader.isPending ||
    changeName.isPending ||
    changeCapacity.isPending ||
    deleteTable.isPending;

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
    removePeople.mutate({ tableId: table.id, personId });
  };

  const handleMakeLeader = (personId: string) => {
    assignLeader.mutate({ tableId: table.id, personId });
  };

  const handleDemoteLeader = () => {
    removeLeader.mutate({ tableId: table.id });
  };

  const handleChangeName = (newName: string) => {
    if (!newName.trim() || newName === table.name) return;
    changeName.mutate({ tableId: table.id, newName: newName.trim() });
  };

  const handleChangeCapacity = (newCapacity: number) => {
    if (newCapacity === capacity || newCapacity < 1) return;
    changeCapacity.mutate({ tableId: table.id, newCapacity });
  };

  const handleDeleteTable = () => {
    deleteTable.mutate({ tableId: table.id });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-main/30 dark:border-main/40 overflow-hidden transition-all hover:shadow-lg hover:border-main/50 dark:hover:border-main/60">
      <TableCardHeader
        tableName={table.name}
        peopleCount={peopleCount}
        capacity={capacity}
        isFull={isFull}
        occupancyPercentage={occupancyPercentage}
        isStaging={isStaging}
        referenceId={table.referenceId}
        onChangeName={handleChangeName}
        onChangeCapacity={handleChangeCapacity}
        onDelete={handleDeleteTable}
        isChangingName={changeName.isPending}
        isChangingCapacity={changeCapacity.isPending}
        isDeleting={deleteTable.isPending}
        isFetching={isFetching}
        isMutating={isMutating}
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
                onMakeLeader={handleMakeLeader}
                onDemoteLeader={handleDemoteLeader}
                isAssigningLeader={assignLeader.isPending}
                isRemovingLeader={removeLeader.isPending}
                isDeleting={removePeople.isPending}
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
