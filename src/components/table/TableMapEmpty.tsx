import React from "react";
import { IconType } from "react-icons";

type TableMapEmptyProps = {
  icon: IconType;
  title: string;
  message: string;
};

const TableMapEmpty = ({ icon: Icon, title, message }: TableMapEmptyProps) => {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 mb-4">
        <Icon className="w-8 h-8 text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400">{message}</p>
    </div>
  );
};

export default TableMapEmpty;
