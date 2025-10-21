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
            id: true,
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
            id: true,
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
  lang?: Language,
  page?: number,
  count?: number,
  search?: string
): Promise<{ foods: TranslatedFood[] | Food[]; total: number }> => {
  const skip = page && count ? (page - 1) * count : undefined;
  const take = count;

  const whereClause = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          {
            description: { contains: search, mode: "insensitive" as const },
          },
          {
            translations: {
              some: {
                OR: [
                  { name: { contains: search, mode: "insensitive" as const } },
                  {
                    description: {
                      contains: search,
                      mode: "insensitive" as const,
                    },
                  },
                ],
              },
            },
          },
        ],
      }
    : {};

  const [foods, total] = await Promise.all([
    lang && lang !== "en"
      ? prisma.food.findMany({
          where: whereClause,
          skip,
          take,
          include: {
            translations: {
              where: { language: lang },
              select: { name: true, description: true },
            },
            variants: {
              select: {
                id: true,
                label: true,
                price: true,
                currency: true,
                isSeasonal: true,
                available: true,
              },
            },
          },
        })
      : prisma.food.findMany({
          where: whereClause,
          skip,
          take,
          include: {
            variants: {
              select: {
                id: true,
                label: true,
                price: true,
                currency: true,
                isSeasonal: true,
                available: true,
              },
            },
          },
        }),
    prisma.food.count({ where: whereClause }),
  ]);

  return { foods, total };
};

const getFoodsByCategory = async (
  categoryId: string,
  lang?: Language,
  page?: number,
  count?: number,
  search?: string
): Promise<{ foods: TranslatedFood[] | Food[]; total: number }> => {
  const skip = page && count ? (page - 1) * count : undefined;
  const take = count;

  const whereClause = {
    categoryId,
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            {
              description: { contains: search, mode: "insensitive" as const },
            },
            {
              translations: {
                some: {
                  OR: [
                    {
                      name: { contains: search, mode: "insensitive" as const },
                    },
                    {
                      description: {
                        contains: search,
                        mode: "insensitive" as const,
                      },
                    },
                  ],
                },
              },
            },
          ],
        }
      : {}),
  };

  const [foods, total] = await Promise.all([
    lang && lang !== "en"
      ? prisma.food.findMany({
          where: whereClause,
          skip,
          take,
          include: {
            translations: {
              where: { language: lang },
              select: { name: true, description: true },
            },
            variants: {
              select: {
                id: true,
                label: true,
                price: true,
                currency: true,
                isSeasonal: true,
                available: true,
              },
            },
          },
        })
      : prisma.food.findMany({
          where: whereClause,
          skip,
          take,
          include: {
            variants: {
              select: {
                id: true,
                label: true,
                price: true,
                currency: true,
                isSeasonal: true,
                available: true,
              },
            },
          },
        }),
    prisma.food.count({ where: whereClause }),
  ]);

  return { foods, total };
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

/**
 * Get food by ID with full variant details including id for order validation
 */
const getFoodWithVariantsForOrder = async (id: string) => {
  return await prisma.food.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      available: true,
      variants: {
        select: {
          id: true,
          label: true,
          price: true,
          currency: true,
          available: true,
        },
      },
    },
  });
};

/**
 * Update food availability status
 */
const updateFoodAvailability = async (id: string, available: boolean) => {
  return await prisma.food.update({
    where: { id },
    data: { available },
  });
};

export {
  getFoodById,
  getFoods,
  createFood,
  createFoodTranslation,
  getFoodsByCategory,
  getFoodWithVariantsForOrder,
  updateFoodAvailability,
};
