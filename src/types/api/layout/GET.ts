import { Layout, Table, TableLink } from "@prisma/client";

export type GetLayouts = (Layout & {
  table: Table & {
    tableLink1: TableLink[];
    tableLink2: TableLink[];
  };
})[];
