import { Layout } from "@prisma/client";

export type PutLayoutRequest = Partial<Omit<Layout, "id">>;
