import React from "react";
import { FiTrash2 } from "react-icons/fi";

const DeleteButton = ({
  handleDelete,
  person,
}: {
  handleDelete: (id: string) => void;
  person: { id: string };
}) => {
  return (
    <button
      onClick={() => handleDelete(person.id)}
      className="p-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-md transition-all flex items-center"
    >
      <FiTrash2 className="w-3.5 h-3.5" />
    </button>
  );
};

export default DeleteButton;
