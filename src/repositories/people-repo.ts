import { prisma } from "@/common/prisma";
import { GetPeopleResponse } from "@/types/api/people/GET";

const getPeopleByTableId = async (tableId: string) => {
  return await prisma.people.findMany({
    where: { id: tableId },
  });
};

const getPeopleById = async (id: string) => {
  return await prisma.people.findUnique({
    where: { id },
  });
};

const addNewPeople = async (name: string, tableId: string) => {
  return await prisma.people.create({
    data: { name, tableId },
  });
};

const updatePeopleName = async (id: string, name: string) => {
  return await prisma.people.update({
    where: { id },
    data: { name },
  });
};

const deletePeople = async (id: string) => {
  return await prisma.people.delete({
    where: { id },
  });
};

const getPeople = async (): Promise<GetPeopleResponse> => {
  return await prisma.people.findMany();
};

export {
  getPeopleByTableId,
  getPeopleById,
  addNewPeople,
  updatePeopleName,
  deletePeople,
  getPeople,
};
