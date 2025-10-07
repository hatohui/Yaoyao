import { People } from "@prisma/client";

export type GetPeopleResponse = People[];
export type GetPeopleByIdResponse = People | null;
