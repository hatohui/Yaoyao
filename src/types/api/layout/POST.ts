import { Layout } from "@prisma/client";

export type PostLayoutRequest = Omit<Layout, "id">;
