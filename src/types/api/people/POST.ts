import { People } from "@prisma/client";

export type PostPeopleRequest = Pick<People, "name">;
