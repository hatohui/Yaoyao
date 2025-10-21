import { prisma } from "@/common/prisma";
import { Table } from "@prisma/client";
import { deletePeople } from "./people-repo";
import { PostTableRequest } from "@/types/api/table/POST";

const getTables = async () => {
  return await prisma.table.findMany({
    include: {
      tableLeader: true,
      orders: {
        include: {
          food: {
            include: {
              variants: true,
            },
          },
        },
      },
      _count: {
        select: {
          people: true,
        },
      },
    },
  });
};

const getTablesWithPeople = async () => {
  return await prisma.table.findMany({
    include: {
      tableLeader: true,
      people: true,
    },
  });
};

const getTableById = async (id: string): Promise<Table | null> => {
  return await prisma.table.findUnique({
    where: { id },
    include: { tableLeader: true },
  });
};

const addPeopleToTable = async (tableId: string, name: string) => {
  return await prisma.people.create({
    data: { name, tableId },
  });
};

const removePeopleFromTable = async (peopleId: string) => {
  return await deletePeople(peopleId);
};

const getPeopleInTable = async (tableId: string) => {
  const table = await prisma.table.findUnique({
    where: { id: tableId },
    include: { people: true },
  });
  return table?.people || [];
};

const getNumberOfPeopleInTable = async (tableId: string) => {
  const count = await prisma.table
    .findUnique({
      where: { id: tableId },
      include: {
        people: true,
      },
    })
    .then((table) => ({
      count: table?.people.length || 0,
      capacity: table?.capacity || 0,
    }));

  return count;
};

const assignTableLeader = async (tableId: string, peopleId: string) => {
  return await prisma.table.update({
    where: { id: tableId },
    data: {
      tableLeaderId: peopleId,
    },
  });
};

const getPeopleInTableById = async (tableId: string, peopleId: string) => {
  const table = await prisma.table.findUnique({
    where: { id: tableId },
    include: {
      people: {
        where: { id: peopleId },
      },
    },
  });
  return table?.people[0] || null;
};

const getTableLeaderByTableId = async (tableId: string) => {
  const table = await prisma.table.findUnique({
    where: { id: tableId },
    include: {
      tableLeader: true,
    },
  });
  return table?.tableLeader || null;
};

const putTableById = async (
  tableId: string,
  data: Partial<Omit<Table, "id" | "createdAt" | "updatedAt">>
): Promise<Table | null> => {
  return await prisma.table.update({
    where: { id: tableId },
    data,
  });
};

const removeTable = async (tableId: string) => {
  return await prisma.table.delete({
    where: { id: tableId },
  });
};

const createNewTable = async (data: PostTableRequest): Promise<Table> => {
  return await prisma.table.create({
    data,
  });
};

export {
  getTables,
  getTablesWithPeople,
  getTableById,
  addPeopleToTable,
  removePeopleFromTable,
  getPeopleInTable,
  assignTableLeader,
  getPeopleInTableById,
  getTableLeaderByTableId,
  getNumberOfPeopleInTable,
  putTableById,
  createNewTable,
  removeTable,
};
