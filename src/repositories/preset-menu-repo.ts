import { Language } from "@/common/language";
import { prisma } from "@/common/prisma";
import { PostPresetMenuRequest } from "@/types/api/preset-menu/POST";

const getAllPresetMenus = async (lang?: Language) => {
  if (lang && lang !== "en") {
    return await prisma.presetMenu.findMany({
      include: {
        food: {
          include: {
            translations: {
              where: { language: lang },
              select: { name: true, description: true },
            },
          },
        },
        variant: true,
      },
    });
  }

  return await prisma.presetMenu.findMany({
    include: {
      food: true,
      variant: true,
    },
  });
};

const getPresetMenuById = async (id: string, lang?: Language) => {
  if (lang && lang !== "en") {
    return await prisma.presetMenu.findUnique({
      where: { id },
      include: {
        food: {
          include: {
            translations: {
              where: { language: lang },
              select: { name: true, description: true },
            },
          },
        },
        variant: true,
      },
    });
  }

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
