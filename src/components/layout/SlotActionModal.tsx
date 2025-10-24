"use client";
import React from "react";
import { FiX, FiTrash2, FiUserX } from "react-icons/fi";

type SlotActionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  hasTable: boolean;
  onUnassignTable: () => void;
  onDeleteSlot: () => void;
  slotId: number;
  tableName?: string;
};

const SlotActionModal = ({
  isOpen,
  onClose,
  hasTable,
  onUnassignTable,
  onDeleteSlot,
  slotId,
  tableName,
}: SlotActionModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Slot #{slotId} Actions
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
          >
            <FiX className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {hasTable && (
            <button
              onClick={() => {
                onUnassignTable();
                onClose();
              }}
              className="w-full flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
            >
              <FiUserX className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              <div className="text-left flex-1">
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  Unassign Table
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Remove {tableName || "table"} from this slot
                </p>
              </div>
            </button>
          )}

          <button
            onClick={() => {
              onDeleteSlot();
              onClose();
            }}
            className="w-full flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-400 dark:border-red-600 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <FiTrash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
            <div className="text-left flex-1">
              <p className="font-semibold text-slate-900 dark:text-slate-100">
                Delete Slot
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {hasTable
                  ? "Remove this slot and unassign the table"
                  : "Permanently remove this empty slot"}
              </p>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-medium rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlotActionModal;
