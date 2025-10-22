import { People, Table, Order, Food, FoodVariant } from "@prisma/client";

export type GetTablesResponse = Omit<Table, "tableLeaderId"> & {
  orders: (Order & {
    food: (Food & { variants: FoodVariant[] }) | null;
  })[];
  peopleCount: number;
  tableLeader: People | null;
};

export type GetTablesWithPaginationResponse = {
  tables: GetTablesResponse[];
  pagination: {
    page: number;
    count: number;
    total: number;
    totalPages: number;
  };
};

export type TablesDTO = Omit<GetTableByIdResponse, "_count"> & {
  peopleCount: number;
};

export type GetTablesWithPeopleResponse = Omit<Table, "tableLeaderId"> & {
  people: People[];
  tableLeader: People | null;
};

export type GetTableByIdResponse = Omit<
  Table,
  "tableLeaderId" | "createdAt" | "updatedAt"
> & {
  tableLeader: People | null;
  createdAt: string;
  updatedAt: string;
};
