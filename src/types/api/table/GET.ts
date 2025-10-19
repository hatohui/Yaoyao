import { People, Table, Order, Food, FoodVariant } from "@prisma/client";

export type GetTablesResponse = Table & {
  orders: (Order & {
    food: (Food & { variants: FoodVariant[] }) | null;
  })[];
  _count: {
    people: number;
  };
};

export type TablesDTO = Omit<GetTableByIdResponse, "_count"> & {
  numberOfPeople: number;
};

export type GetTableByIdResponse = Omit<
  Table,
  "tableLeaderId" | "createdAt" | "updatedAt"
> & {
  tableLeader: People | null;
  createdAt: string;
  updatedAt: string;
};
