"use client";
import React, { useRef } from "react";
import { People } from "@prisma/client";
import StagingTableCardHeader from "./StagingTableCardHeader";
import StagingTableCardPeople from "./StagingTableCardPeople";
import usePeopleInTableMutation from "@/hooks/table/usePeopleInTableMutation";
import useTableMutation from "@/hooks/table/useTableMutation";

type StagingTableCardProps = {
  tableName: string;
  tableId: string;
  people: Array<People & { isLeader: boolean; isDuplicate: boolean }>;
  capacity: number;
  referenceId?: string | null;
};

const StagingTableCard = ({
  tableName,
  tableId,
  people,
  capacity,
  referenceId,
}: StagingTableCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { assignLeader, removeLeader } = usePeopleInTableMutation();
  const { changeName } = useTableMutation();

  const peopleCount = people.length;
  const isFull = peopleCount >= capacity;
  const occupancyPercentage = capacity > 0 ? (peopleCount / capacity) * 100 : 0;

  const handleMakeLeader = (personId: string) => {
    // No confirmation in admin mode
    assignLeader.mutate({ tableId, personId });
  };

  const handleDemoteLeader = () => {
    // No confirmation in admin mode
    removeLeader.mutate({ tableId });
  };

  const handleChangeName = (newName: string) => {
    if (!newName.trim() || newName === tableName) return;
    changeName.mutate({ tableId, newName: newName.trim() });
  };

  return (
    <div
      ref={cardRef}
      className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-main/30 dark:border-main/40 overflow-hidden transition-all hover:shadow-lg hover:border-main/50 dark:hover:border-main/60"
    >
      <StagingTableCardHeader
        tableName={tableName}
        peopleCount={peopleCount}
        capacity={capacity}
        occupancyPercentage={occupancyPercentage}
        isFull={isFull}
        referenceId={referenceId}
        onChangeName={handleChangeName}
      />

      <div className="p-3">
        <StagingTableCardPeople
          people={people}
          isFull={isFull}
          tableId={tableId}
          capacity={capacity}
          onMakeLeader={handleMakeLeader}
          onDemoteLeader={handleDemoteLeader}
        />
      </div>
    </div>
  );
};

export default StagingTableCard;
