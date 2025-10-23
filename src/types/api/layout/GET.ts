import { Layout, Table } from "@prisma/client";

export type GetLayouts = (Layout & { table: Table })[];
