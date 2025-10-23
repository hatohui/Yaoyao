import React, { useCallback } from "react";
import { FaLock, FaLockOpen, FaUserPlus, FaTrash } from "react-icons/fa";

type TableControlProps = {
  isLocked?: boolean;
  onLock?: () => void;
  onAssignTable?: () => void;
  onDeleteTable?: () => void;
};

const TableControl = React.memo(
  ({
    isLocked = false,
    onLock,
    onAssignTable,
    onDeleteTable,
  }: TableControlProps) => {
    const handleLockClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onLock?.();
      },
      [onLock]
    );

    const handleAssignClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onAssignTable?.();
      },
      [onAssignTable]
    );

    const handleDeleteClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onDeleteTable?.();
      },
      [onDeleteTable]
    );

    return (
      <div className="absolute h-full w-full flex flex-col bg-black/20 space-y-2 justify-center items-center">
        <button
          className="size-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg cursor-pointer z-50"
          onClick={handleLockClick}
          title={isLocked ? "Unlock" : "Lock"}
        >
          {isLocked ? <FaLock size={18} /> : <FaLockOpen size={18} />}
        </button>
        <button
          className="size-10 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg cursor-pointer z-50"
          onClick={handleAssignClick}
          title="Assign Table"
        >
          <FaUserPlus size={18} />
        </button>
        <button
          className="size-10 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg cursor-pointer z-50"
          onClick={handleDeleteClick}
          title="Delete Table"
        >
          <FaTrash size={18} />
        </button>
      </div>
    );
  }
);

TableControl.displayName = "TableControl";

export default TableControl;
