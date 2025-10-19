import { prisma } from "@/common/prisma";
import { PostLayoutRequest } from "@/types/api/layout/POST";
import { PutLayoutRequest } from "@/types/api/layout/PUT";

const getLayouts = async () => {
  return await prisma.layout.findMany();
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

export {
  getLayouts,
  createLayout,
  updateLayout,
  deleteLayout,
  getLayoutByTableId,
  getLayoutById,
  getNewLayoutId,
};
