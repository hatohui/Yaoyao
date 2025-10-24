import React from "react";
import { TableObject } from "@/types/models/table";
import EmptySlotContent from "./EmptySlotContent";
import TableSlotContent from "./TableSlotContent";

type SlotContentProps = {
  slot: TableObject;
  hasTable: boolean;
  isLinked: boolean;
};

/**
 * Wrapper component that renders either table or empty slot content
 */
const SlotContent = ({ slot, hasTable, isLinked }: SlotContentProps) => {
  return (
    <div className="p-3 h-full flex flex-col justify-between">
      {hasTable ? (
        <TableSlotContent slot={slot} isLinked={isLinked} />
      ) : (
        <EmptySlotContent slotId={slot.id} />
      )}
    </div>
  );
};

export default SlotContent;
