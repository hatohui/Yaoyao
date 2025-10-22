import { prisma } from "@/common/prisma";
import { Table } from "@prisma/client";
import { deletePeople } from "./people-repo";
import { PostTableRequest } from "@/types/api/table/POST";

const getTables = async (
  page: number = 1,
  count: number = 12,
  search?: string
) => {
  const skip = (page - 1) * count;

  const where = search
    ? {
        isStaging: false, // Only production tables
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          {
            tableLeader: {
              name: { contains: search, mode: "insensitive" as const },
            },
          },
        ],
      }
    : { isStaging: false }; // Only production tables

  const [tables, total] = await Promise.all([
    prisma.table.findMany({
      where,
      skip,
      take: count,
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
    }),
    prisma.table.count({ where }),
  ]);

  return { tables, total };
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

// ===== Staging Functions =====

/**
 * Get all staging tables (tables with isStaging = true)
 */
const getStagingTables = async (
  page: number = 1,
  count: number = 12,
  search?: string
) => {
  const skip = (page - 1) * count;

  const where = search
    ? {
        isStaging: true, // Only staging tables
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          {
            tableLeader: {
              name: { contains: search, mode: "insensitive" as const },
            },
          },
        ],
      }
    : { isStaging: true }; // Only staging tables

  const [tables, total] = await Promise.all([
    prisma.table.findMany({
      where,
      skip,
      take: count,
      include: {
        tableLeader: true,
        people: true, // Include people
        reference: true, // Include the production table reference
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
    }),
    prisma.table.count({ where }),
  ]);

  return { tables, total };
};

/**
 * Copy all production tables to staging
 * Creates staging copies with referenceId pointing to original production tables
 */
const copyProductionToStaging = async () => {
  // Get all production tables (isStaging is false)
  const productionTables = await prisma.table.findMany({
    where: { isStaging: false },
    include: {
      people: true,
      orders: true,
    },
  });

  // Delete existing staging tables first
  await prisma.table.deleteMany({
    where: { isStaging: true },
  });

  // Create staging copies
  const stagingTables = await Promise.all(
    productionTables.map(async (prodTable) => {
      // Create staging table with reference to production
      const stagingTable = await prisma.table.create({
        data: {
          name: prodTable.name,
          capacity: prodTable.capacity,
          referenceId: prodTable.id, // Link to production table
          isStaging: true, // Mark as staging
        },
      });

      // Copy people
      if (prodTable.people && prodTable.people.length > 0) {
        await prisma.people.createMany({
          data: prodTable.people.map((person) => ({
            name: person.name,
            tableId: stagingTable.id,
          })),
        });

        // If there was a table leader, assign the first person as leader
        if (prodTable.tableLeaderId) {
          const stagingPeople = await prisma.people.findMany({
            where: { tableId: stagingTable.id },
          });
          if (stagingPeople.length > 0) {
            await prisma.table.update({
              where: { id: stagingTable.id },
              data: { tableLeaderId: stagingPeople[0].id },
            });
          }
        }
      }

      // Copy orders
      if (prodTable.orders && prodTable.orders.length > 0) {
        await prisma.order.createMany({
          data: prodTable.orders.map((order) => ({
            tableId: stagingTable.id,
            foodId: order.foodId,
            variantId: order.variantId,
            quantity: order.quantity,
          })),
        });
      }

      return stagingTable;
    })
  );

  return stagingTables;
};

/**
 * Clear all staging tables (delete tables with isStaging = true)
 */
const clearStaging = async () => {
  const result = await prisma.table.deleteMany({
    where: { isStaging: true },
  });
  return result;
};

/**
 * Commit staging to production
 * 1. Delete all production tables
 * 2. Convert staging tables to production (set isStaging to false)
 */
const commitStagingToProduction = async () => {
  return await prisma.$transaction(async (tx) => {
    // 1. Delete all production tables (isStaging is false)
    await tx.table.deleteMany({
      where: { isStaging: false },
    });

    // 2. Get all staging tables
    const stagingTables = await tx.table.findMany({
      where: { isStaging: true },
    });

    // 3. Update staging tables to production (set isStaging to false, clear referenceId)
    const updatedTables = await Promise.all(
      stagingTables.map(async (table) => {
        return await tx.table.update({
          where: { id: table.id },
          data: {
            isStaging: false,
            referenceId: null, // Clear reference since it's now production
          },
        });
      })
    );

    return updatedTables;
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
  // Staging functions
  getStagingTables,
  copyProductionToStaging,
  clearStaging,
  commitStagingToProduction,
};
