"use client";

import usePeopleInTableMutation from "@/hooks/table/usePeopleInTableMutation";
import { GetTableByIdResponse } from "@/types/api/table/GET";
import { People } from "@prisma/client";
import { useTranslations } from "next-intl";
import React, { useState, useRef, useEffect } from "react";
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

  // Collapse by default on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    setIsCollapsed(isMobile);
  }, []);

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

  const currentCount = people?.length;
  const capacity = table?.capacity;
  const isFull = !!(
    currentCount &&
    capacity &&
    currentCount >= capacity &&
    capacity > 0
  );
  const canAddMember = canManage && !isFull;

  const isMutating =
    addPeople.isPending ||
    removePeople.isPending ||
    assignLeader.isPending ||
    removeLeader.isPending;

  return (
    <div
      className={`bg-white ${
        isCollapsed ? "h-auto" : "flex flex-col min-h-0"
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
        isMutating={isMutating}
      />
      <div
        ref={contentRef}
        className={`${isCollapsed ? "" : "flex-1 min-h-0"} overflow-hidden`}
      >
        <div className={`p-4 ${isCollapsed ? "" : "h-full"} overflow-y-auto`}>
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
