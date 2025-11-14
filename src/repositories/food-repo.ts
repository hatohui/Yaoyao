import { Language } from "@/common/language";
import { prisma } from "@/common/prisma";
import { PostFoodRequest } from "@/types/api/food/POST";
import { PutFoodRequest } from "@/types/api/food/PUT";
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
  search?: string,
  available?: boolean
): Promise<{ foods: TranslatedFood[] | Food[]; total: number }> => {
  const skip = page && count ? (page - 1) * count : undefined;
  const take = count;

  const whereClause = {
    ...(available !== undefined && { available }),
    ...(search && {
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
    }),
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

const getFoodsByCategory = async (
  categoryId: string,
  lang?: Language,
  page?: number,
  count?: number,
  search?: string,
  available?: boolean
): Promise<{ foods: TranslatedFood[] | Food[]; total: number }> => {
  const skip = page && count ? (page - 1) * count : undefined;
  const take = count;

  const whereClause = {
    categoryId,
    ...(available !== undefined && { available }),
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
  const { variants, ...foodData } = data;

  return await prisma.food.create({
    data: {
      ...foodData,
      variants: variants
        ? {
            create: variants.map((v) => ({
              label: v.label,
              price: v.price,
              currency: v.currency,
              available: v.available,
              isSeasonal: v.isSeasonal,
            })),
          }
        : undefined,
    },
    include: {
      variants: true,
    },
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

/**
 * Update food with partial data
 */
const updateFood = async (id: string, data: PutFoodRequest) => {
  const { variants, ...foodData } = data;

  // If variants are provided, we need to handle them separately
  if (variants !== undefined) {
    // Delete existing variants and create new ones
    await prisma.foodVariant.deleteMany({
      where: { foodId: id },
    });

    return await prisma.food.update({
      where: { id },
      data: {
        ...foodData,
        variants: {
          create: variants.map((v) => ({
            label: v.label,
            price: v.price,
            currency: v.currency,
            available: v.available,
            isSeasonal: v.isSeasonal,
          })),
        },
      },
      include: {
        variants: true,
      },
    });
  }

  return await prisma.food.update({
    where: { id },
    data: foodData,
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
  updateFood,
};
