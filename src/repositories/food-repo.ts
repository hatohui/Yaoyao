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

const getFoodByIdWithAllTranslations = async (
  id: string
): Promise<
  | (Food & {
      translations: {
        language: string;
        name: string;
        description?: string | null;
      }[];
      variants: {
        id: string;
        label: string;
        price: number | null;
        currency: string | null;
        isSeasonal: boolean;
        available: boolean;
      }[];
    })
  | null
> => {
  return await prisma.food.findUnique({
    where: { id },
    include: {
      translations: {
        select: { language: true, name: true, description: true },
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
};

const getFoods = async (
  lang?: Language,
  page?: number,
  count?: number,
  search?: string,
  available?: boolean,
  includeHidden?: boolean
): Promise<{ foods: TranslatedFood[] | Food[]; total: number }> => {
  const skip = page && count ? (page - 1) * count : undefined;
  const take = count;

  const whereClause = {
    ...(available !== undefined && { available }),
    ...(includeHidden === true ? {} : { isHidden: false }),
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
  available?: boolean,
  includeHidden?: boolean
): Promise<{ foods: TranslatedFood[] | Food[]; total: number }> => {
  const skip = page && count ? (page - 1) * count : undefined;
  const take = count;

  const whereClause = {
    categoryId,
    ...(available !== undefined && { available }),
    ...(includeHidden === true ? {} : { isHidden: false }),
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
  const { variants, translations, ...foodData } = data;

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
      translations: translations
        ? {
            create: translations.map((t) => ({
              language: t.language,
              name: t.name,
              description: t.description,
            })),
          }
        : undefined,
    },
    include: {
      variants: true,
      translations: true,
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
  const { variants, translations, ...foodData } = data;

  // If translations are provided, handle them
  if (translations !== undefined) {
    // Delete existing translations
    await prisma.foodTranslation.deleteMany({
      where: { foodId: id },
    });

    // Create new translations
    if (translations.length > 0) {
      await prisma.foodTranslation.createMany({
        data: translations.map((t) => ({
          foodId: id,
          language: t.language,
          name: t.name,
          description: t.description,
        })),
      });
    }
  }

  if (variants !== undefined) {
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
        translations: true,
      },
    });
  }

  return await prisma.food.update({
    where: { id },
    data: foodData,
    include: {
      translations: true,
    },
  });
};

/**
 * Delete food by ID
 */
const deleteFood = async (id: string) => {
  return await prisma.food.delete({
    where: { id },
  });
};

export {
  getFoodById,
  getFoodByIdWithAllTranslations,
  getFoods,
  createFood,
  createFoodTranslation,
  getFoodsByCategory,
  getFoodWithVariantsForOrder,
  updateFoodAvailability,
  updateFood,
  deleteFood,
};
