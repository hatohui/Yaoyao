import { Table } from "@prisma/client";

export type PutTableRequest = Partial<
  Omit<Table, "id" | "createdAt" | "updatedAt">
>;
