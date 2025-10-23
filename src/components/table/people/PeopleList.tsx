"use client";
import React from "react";
import { People } from "@prisma/client";
import PersonCard from "./PersonCard";
import AddMemberInput from "./AddMemberInput";

type PeopleListProps = {
  people: People[];
  tableLeaderId?: string;
  canManage: boolean;
  isYaoyao: boolean;
  canAddMember: boolean;
  isAddingMember: boolean;
  newMemberName: string;
  isPending: boolean;
  onMakeLeader: (personId: string) => void;
  onDemoteLeader: () => void;
  onDelete: (personId: string) => void;
  onNameChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onStartAdding: () => void;
  isAssigningLeader?: boolean;
  isRemovingLeader?: boolean;
  isDeleting?: boolean;
};

const PeopleList = ({
  people,
  tableLeaderId,
  canManage,
  isYaoyao,
  canAddMember,
  isAddingMember,
  newMemberName,
  isPending,
  onMakeLeader,
  onDemoteLeader,
  onDelete,
  onNameChange,
  onKeyPress,
  onBlur,
  onStartAdding,
  isAssigningLeader = false,
  isRemovingLeader = false,
  isDeleting = false,
}: PeopleListProps) => {
  const isMutating = isAssigningLeader || isRemovingLeader || isDeleting;

  return (
    <div className="space-y-2 relative">
      {isMutating && (
        <div className="absolute inset-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-[2px] z-10 rounded-lg pointer-events-none" />
      )}
      {people.map((person) => {
        const isLeader = person.id === tableLeaderId;
        return (
          <PersonCard
            key={person.id}
            person={person}
            isLeader={isLeader}
            canManage={canManage}
            isYaoyao={isYaoyao}
            onMakeLeader={onMakeLeader}
            onDemoteLeader={onDemoteLeader}
            onDelete={onDelete}
            isAssigningLeader={isAssigningLeader}
            isRemovingLeader={isRemovingLeader}
            isDeleting={isDeleting}
          />
        );
      })}
      {canAddMember && (
        <AddMemberInput
          isAddingMember={isAddingMember}
          newMemberName={newMemberName}
          isPending={isPending}
          onNameChange={onNameChange}
          onKeyPress={onKeyPress}
          onBlur={onBlur}
          onStartAdding={onStartAdding}
        />
      )}
    </div>
  );
};

export default PeopleList;
