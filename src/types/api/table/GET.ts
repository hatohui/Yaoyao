import { People, Table, Order, Food, FoodVariant } from "@prisma/client";

export type GetTablesResponse = {
  id: string;
  name: string;
  capacity: number;
  location: string | null;
  paid: boolean;
  tableLeader: People | null;
  people: People[];
  orders: (Order & {
    food: (Food & { variants: FoodVariant[] }) | null;
  })[];
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
