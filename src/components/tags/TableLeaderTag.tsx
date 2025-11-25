import React from "react";
import { FiStar } from "react-icons/fi";

const TableLeaderTag = () => {
  return (
    <span
      className="inline-flex items-center justify-center w-5 h-5 bg-yellow-500 text-white rounded flex-shrink-0"
      title="Table Leader"
    >
      <FiStar className="w-3 h-3" />
    </span>
  );
};

export default TableLeaderTag;
