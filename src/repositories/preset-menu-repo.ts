import { prisma } from "@/common/prisma";
import { PostPresetMenuRequest } from "@/types/api/preset-menu/POST";

const getAllPresetMenus = async () => {
  return await prisma.presetMenu.findMany({
    include: {
      food: true,
      variant: true,
    },
  });
};

const getPresetMenuById = async (id: string) => {
  return await prisma.presetMenu.findUnique({
    where: { id },
    include: {
      food: true,
      variant: true,
    },
  });
};

const createPresetMenu = async (data: PostPresetMenuRequest) => {
  return await prisma.presetMenu.create({
    data: {
      foodId: data.foodId,
      variantId: data.variantId,
      quantity: data.quantity ?? 1,
    },
  });
};

const deletePresetMenu = async (id: string) => {
  return await prisma.presetMenu.delete({
    where: { id },
  });
};

export const PresetMenuRepository = {
  getAllPresetMenus,
  getPresetMenuById,
  createPresetMenu,
  deletePresetMenu,
};
