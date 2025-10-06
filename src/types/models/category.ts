import { Category, CategoryTranslation } from "@prisma/client";

export type TranslatedCategory = Category & {
  translation?: [Pick<CategoryTranslation, "name" | "description">];
};
