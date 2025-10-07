import { Language } from "@/common/language";
import { prisma } from "@/common/prisma";
import { PostFoodRequest } from "@/types/api/food/POST";
import { TranslatedFood } from "@/types/models/food";
import { Food } from "@prisma/client";

const getFoodById = async (
  id: string,
  lang?: Language
): Promise<TranslatedFood | Food | null> => {
  if (lang && lang !== "en") {
    return await prisma.food.findUnique({
      where: { id },

      include: {
        translations: {
          where: { language: lang },
          select: { name: true, description: true },
        },
        variants: {
          select: {
            label: true,
            price: true,
            currency: true,
            isSeasonal: true,
            available: true,
          },
        },
      },
    });
  } else
    return await prisma.food.findUnique({
      where: { id },
      include: {
        variants: {
          select: {
            label: true,
            price: true,
            currency: true,
            isSeasonal: true,
            available: true,
          },
        },
      },
    });
};

const getFoods = async (
  lang?: Language
): Promise<TranslatedFood[] | Food[] | null> => {
  if (lang && lang !== "en") {
    return await prisma.food.findMany({
      include: {
        translations: {
          where: { language: lang },
          select: { name: true, description: true },
        },
        variants: {
          select: {
            label: true,
            price: true,
            currency: true,
            isSeasonal: true,
            available: true,
          },
        },
      },
    });
  } else
    return await prisma.food.findMany({
      include: {
        variants: {
          select: {
            label: true,
            price: true,
            currency: true,
            isSeasonal: true,
            available: true,
          },
        },
      },
    });
};

const getFoodsByCategory = async (
  categoryId: string,
  lang?: Language
): Promise<TranslatedFood[] | Food[] | null> => {
  if (lang && lang !== "en") {
    return await prisma.food.findMany({
      where: { categoryId },
      include: {
        translations: {
          where: { language: lang },
          select: { name: true, description: true },
        },
        variants: {
          select: {
            label: true,
            price: true,
            currency: true,
            isSeasonal: true,
            available: true,
          },
        },
      },
    });
  } else
    return await prisma.food.findMany({
      where: { categoryId },
      include: {
        variants: {
          select: {
            label: true,
            price: true,
            currency: true,
            isSeasonal: true,
            available: true,
          },
        },
      },
    });
};

const createFood = async (data: PostFoodRequest) => {
  return await prisma.food.create({
    data,
  });
};

const createFoodTranslation = async (
  foodId: string,
  lang: Language,
  name: string,
  description?: string
) => {
  return await prisma.foodTranslation.create({
    data: {
      foodId,
      language: lang,
      name,
      description,
    },
  });
};

export {
  getFoodById,
  getFoods,
  createFood,
  createFoodTranslation,
  getFoodsByCategory,
};
