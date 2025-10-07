import { People, Table } from "@prisma/client";

export type GetTablesResponse = {
  id: string;
  name: string;
  capacity: number;
  location: string | null;
  tableLeader: People | null;
  _count: {
    people: number;
  };
};

export type GetTableByIdResponse = Omit<
  Table,
  "tableLeaderId" | "createdAt" | "updatedAt"
> & {
  tableLeader: People | null;
  createdAt: string;
  updatedAt: string;
};
