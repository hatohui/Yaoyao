import { Category, CategoryTranslation } from "@/generated/prisma";

export type TranslatedCategory = Category & {
  translation?: [Pick<CategoryTranslation, "name" | "description">];
};
