import useTableMutation from "@/hooks/table/useTableMutation";
import { GetTableByIdResponse } from "@/types/api/table/GET";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

export type TableMutationBoxProps = {
  table: GetTableByIdResponse | undefined;
};

const TableMutationBox = ({ table }: TableMutationBoxProps) => {
  const { changeCapacity } = useTableMutation();
  const t = useTranslations("tables");
  const tCommon = useTranslations("common");
  const [capacity, setCapacity] = useState<number>(table?.capacity ?? 0);
  const [isEditing, setIsEditing] = useState(false);

  const handleChangeCapacity = () => {
    if (capacity === table?.capacity) {
      setIsEditing(false);
      return;
    }

    changeCapacity.mutate(
      {
        newCapacity: capacity,
        tableId: table?.id ?? "",
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleCancel = () => {
    setCapacity(table?.capacity ?? 0);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden">
      {/* Compact Header */}
      <div className="bg-slate-600 px-4 py-2">
        <h2 className="text-sm font-semibold text-white">
          {t("tableSettings")}
        </h2>
      </div>

      {/* Content */}
      <div className="p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleChangeCapacity();
          }}
        >
          <label
            htmlFor="capacity"
            className="block text-xs font-medium text-slate-700 mb-1.5"
          >
            {t("changeCapacity")}
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                id="capacity"
                type="number"
                min="1"
                max="20"
                value={capacity}
                onChange={(e) => {
                  setCapacity(Number(e.target.value));
                  setIsEditing(true);
                }}
                className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            {isEditing && (
              <>
                <button
                  type="submit"
                  disabled={changeCapacity.isPending}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-medium rounded-md transition-colors flex items-center gap-1.5"
                >
                  {changeCapacity.isPending ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {t("saving")}
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {tCommon("save")}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={changeCapacity.isPending}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 disabled:bg-slate-100 text-slate-700 text-xs font-medium rounded-md transition-colors"
                >
                  {tCommon("cancel")}
                </button>
              </>
            )}
          </div>
          <p className="mt-1.5 text-xs text-slate-500">{t("setCapacity")}</p>
        </form>
      </div>
    </div>
  );
};

export default TableMutationBox;
