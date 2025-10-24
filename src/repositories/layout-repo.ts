import { prisma } from "@/common/prisma";
import { PostLayoutRequest } from "@/types/api/layout/POST";
import { PutLayoutRequest } from "@/types/api/layout/PUT";

const getLayouts = async () => {
  return await prisma.layout.findMany({
    include: {
      table: {
        include: {
          tableLink1: true,
          tableLink2: true,
        },
      },
    },
  });
};

const createLayout = async (data: PostLayoutRequest) => {
  return await prisma.layout.create({
    data,
  });
};

const updateLayout = async (id: number, data: PutLayoutRequest) => {
  return await prisma.layout.update({
    where: { id },
    data,
  });
};

const getLayoutByTableId = async (tableId: string) => {
  return await prisma.layout.findFirst({
    where: { tableId },
  });
};

const getLayoutById = async (id: number) => {
  return await prisma.layout.findFirst({
    where: { id },
  });
};

const deleteLayout = async (id: number) => {
  return await prisma.layout.delete({
    where: { id },
  });
};

const getNewLayoutId = async () => {
  const layouts = await getLayouts();

  const ids = layouts.map((layout) => layout.id).sort((a, b) => a - b);

  let min = 1;

  for (const id of ids) {
    if (id === min) {
      min++;
    } else {
      break;
    }
  }

  return min;
};

const swapTablesBetweenSlots = async (slot1Id: number, slot2Id: number) => {
  const slot1 = await getLayoutById(slot1Id);
  const slot2 = await getLayoutById(slot2Id);

  if (!slot1 || !slot2) {
    throw new Error("One or both slots not found");
  }

  // Swap the tableIds
  const temp = slot1.tableId;

  await prisma.layout.update({
    where: { id: slot1Id },
    data: { tableId: slot2.tableId },
  });

  await prisma.layout.update({
    where: { id: slot2Id },
    data: { tableId: temp },
  });

  return { success: true };
};

export {
  getLayouts,
  createLayout,
  updateLayout,
  deleteLayout,
  getLayoutByTableId,
  getLayoutById,
  getNewLayoutId,
  swapTablesBetweenSlots,
};
