"use client";

import usePeopleInTableMutation from "@/hooks/table/usePeopleInTableMutation";
import { GetTableByIdResponse } from "@/types/api/table/GET";
import { People } from "@prisma/client";
import { useTranslations } from "next-intl";
import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useYaoAuth from "@/hooks/auth/useYaoAuth";
import PeopleInTableHeader from "./PeopleInTableHeader";
import PeopleInTableLoading from "./PeopleInTableLoading";
import PeopleInTableEmpty from "./PeopleInTableEmpty";
import PeopleList from "./PeopleList";

type PeopleInTableProps = {
  table: GetTableByIdResponse | undefined;
  people: People[] | undefined;
  canManage?: boolean;
  tableId?: string;
  userId?: string | null;
  isLoading?: boolean;
  isFetching?: boolean;
};

const PeopleInTable = ({
  people,
  table,
  canManage = false,
  tableId,
  userId,
  isLoading = false,
  isFetching = false,
}: PeopleInTableProps) => {
  const { removePeople, assignLeader, removeLeader, addPeople } =
    usePeopleInTableMutation();
  const t = useTranslations("tables");
  const { isYaoyao } = useYaoAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [isAddingMember, setIsAddingMember] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const isRefetching = isFetching && !isLoading;

  useGSAP(() => {
    if (contentRef.current) {
      if (isCollapsed) {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      } else {
        // Get the natural height
        const element = contentRef.current;
        gsap.set(element, { height: "auto" });
        const height = element.offsetHeight;
        gsap.fromTo(
          element,
          { height: 0, opacity: 0 },
          { height: height, opacity: 1, duration: 0.3, ease: "power2.inOut" }
        );
        gsap.set(element, { height: "auto", delay: 0.3 });
      }
    }
  }, [isCollapsed]);

  const handleDelete = (personId: string) => {
    if (window.confirm(t("confirmRemove"))) {
      removePeople.mutate({ tableId: table?.id ?? "", personId });
    }
  };

  const handleMakeLeader = (personId: string) => {
    if (window.confirm(t("confirmMakeLeader"))) {
      assignLeader.mutate({ tableId: table?.id ?? "", personId });
    }
  };

  const handleDemoteLeader = () => {
    if (window.confirm(t("confirmDemoteLeader"))) {
      removeLeader.mutate({ tableId: table?.id ?? "" });
    }
  };

  const handleAddMember = () => {
    if (!newMemberName.trim() || !tableId) return;

    addPeople.mutate(
      { tableId, name: newMemberName.trim(), userId: userId || undefined },
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

  const currentCount = people?.length ?? 0;
  const capacity = table?.capacity ?? 0;
  const isFull = currentCount >= capacity && capacity > 0;
  const canAddMember = canManage && !isFull;

  return (
    <div
      className={`bg-white ${
        isCollapsed ? "h-auto" : "grow"
      } dark:bg-slate-800 rounded-lg shadow-md overflow-hidden border border-main/10 dark:border-slate-700`}
    >
      <PeopleInTableHeader
        currentCount={currentCount}
        capacity={capacity}
        isFull={isFull}
        isRefetching={isRefetching}
        isLoading={isLoading}
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />
      <div ref={contentRef} className="overflow-hidden">
        <div className="p-4 max-h-[400px] min-h-[300px] overflow-y-auto">
          {isLoading || people === undefined ? (
            <PeopleInTableLoading />
          ) : people.length > 0 ? (
            <PeopleList
              people={people}
              tableLeaderId={table?.tableLeader?.id}
              canManage={canManage}
              isYaoyao={isYaoyao}
              canAddMember={canAddMember}
              isAddingMember={isAddingMember}
              newMemberName={newMemberName}
              isPending={addPeople.isPending}
              onMakeLeader={handleMakeLeader}
              onDemoteLeader={handleDemoteLeader}
              onDelete={handleDelete}
              onNameChange={setNewMemberName}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                if (!newMemberName.trim()) {
                  setIsAddingMember(false);
                }
              }}
              onStartAdding={() => setIsAddingMember(true)}
              isAssigningLeader={assignLeader.isPending}
              isRemovingLeader={removeLeader.isPending}
              isDeleting={removePeople.isPending}
            />
          ) : (
            <PeopleInTableEmpty />
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleInTable;
