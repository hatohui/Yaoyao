import { TranslatedCategory } from "@/types/models/category";

export type GetCategoriesResponse = (TranslatedCategory & { key: string })[];
export type GetCategoryByIdResponse = TranslatedCategory & { key: string };
