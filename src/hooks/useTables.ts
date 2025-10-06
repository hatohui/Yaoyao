"use client";
import { Table } from "@/generated/prisma";
import { useQuery } from "@tanstack/react-query";

const useTables = () =>
  useQuery<Table[], Error>({
    queryKey: ["tables"],
    queryFn: async () => {
      const response = await fetch("/api/(tables)/table");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

export default useTables;
