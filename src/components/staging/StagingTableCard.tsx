"use client";
import React, { useRef } from "react";
import { People } from "@prisma/client";
import { useAnimations } from "@/hooks/common/useAnimations";
import StagingTableCardHeader from "./StagingTableCardHeader";
import StagingTableCardPeople from "./StagingTableCardPeople";

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
  const animations = useAnimations();

  const peopleCount = people.length;
  const isFull = peopleCount >= capacity;
  const occupancyPercentage = capacity > 0 ? (peopleCount / capacity) * 100 : 0;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => animations.hoverScale(cardRef.current, 1.02)}
      onMouseLeave={() => animations.hoverScaleReset(cardRef.current)}
      className="bg-white dark:bg-slate-800 rounded-lg shadow-md border-2 border-main/30 dark:border-main/40 overflow-hidden transition-all hover:shadow-lg"
    >
      <StagingTableCardHeader
        tableName={tableName}
        peopleCount={peopleCount}
        capacity={capacity}
        occupancyPercentage={occupancyPercentage}
        isFull={isFull}
        referenceId={referenceId}
      />

      <div className="p-3">
        <StagingTableCardPeople
          people={people}
          isFull={isFull}
          tableId={tableId}
          capacity={capacity}
        />
      </div>
    </div>
  );
};

export default StagingTableCard;
