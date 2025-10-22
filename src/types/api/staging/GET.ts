import { People, Table, Order, Food, FoodVariant } from "@prisma/client";

export type GetStagingTablesResponse = Omit<Table, "tableLeaderId"> & {
  orders: (Order & {
    food: (Food & { variants: FoodVariant[] }) | null;
  })[];
  peopleCount: number;
  people?: People[]; // Include people array
  tableLeader: People | null;
  reference: Table | null; // The production table this staging table references
};

export type GetStagingTablesWithPaginationResponse = {
  tables: GetStagingTablesResponse[];
  pagination: {
    page: number;
    count: number;
    total: number;
    totalPages: number;
  };
};
