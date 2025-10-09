import { useState } from "react";

const useTableOrder = () => {
  const [tableOrder, setTableOrder] = useState<number[]>([]);

  const addToOrder = (itemId: number) => {
    setTableOrder((prevOrder) => [...prevOrder, itemId]);
  };

  const removeFromOrder = (itemId: number) => {
    setTableOrder((prevOrder) => prevOrder.filter((id) => id !== itemId));
  };

  const clearOrder = () => {
    setTableOrder([]);
  };

  const sendOrderToServer = async () => {};

  return {
    tableOrder,
    addToOrder,
    removeFromOrder,
    clearOrder,
    sendOrderToServer,
  };
};

export default useTableOrder;
