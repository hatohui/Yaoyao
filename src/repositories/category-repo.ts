import { Language } from "@/common/language";
import { prisma } from "@/common/prisma";
import { TranslatedCategory } from "@/types/models/category";
import { Category } from "@prisma/client";

const getCategories = async (
  lang?: Language | unknown
): Promise<TranslatedCategory[] | Category[] | null> => {
  if (lang) {
    return await prisma.category.findMany({
      include: {
        translation: {
          where: { language: lang },
          select: { name: true, description: true },
        },
      },
    });
  } else {
    return await prisma.category.findMany();
  }
};

const getCategoryById = async (
  id: string,
  lang?: Language | unknown
): Promise<TranslatedCategory | Category | null> => {
  if (lang) {
    return await prisma.category.findUnique({
      where: { id },
      include: {
        translation: {
          where: { language: lang },
          select: { name: true, description: true },
        },
      },
    });
  } else {
    return await prisma.category.findUnique({
      where: { id },
    });
  }
};

const getCategoryByName = async (
  name: string,
  lang?: Language | unknown
): Promise<TranslatedCategory | Category | null> => {
  if (lang) {
    return await prisma.category.findFirst({
      where: {
        name: {
          startsWith: name,
          mode: "insensitive",
        },
      },
      include: {
        translation: {
          where: { language: lang },
          select: { name: true, description: true },
        },
      },
    });
  } else {
    return await prisma.category.findFirst({
      where: {
        name: {
          startsWith: name,
          mode: "insensitive",
        },
      },
    });
  }
};

export { getCategories, getCategoryById, getCategoryByName };
