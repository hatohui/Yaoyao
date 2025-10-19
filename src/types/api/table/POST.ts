import { Table } from "@prisma/client";

export type PostTableRequest = Omit<Table, "id" | "createdAt" | "updatedAt">;
