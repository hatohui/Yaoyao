import React from "react";
import { FiTrash2, FiLoader } from "react-icons/fi";

const DeleteButton = ({
  handleDelete,
  person,
  isPending = false,
}: {
  handleDelete: (id: string) => void;
  person: { id: string };
  isPending?: boolean;
}) => {
  return (
    <button
      onClick={() => handleDelete(person.id)}
      disabled={isPending}
      className="p-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-md transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? (
        <FiLoader className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <FiTrash2 className="w-3.5 h-3.5" />
      )}
    </button>
  );
};

export default DeleteButton;
