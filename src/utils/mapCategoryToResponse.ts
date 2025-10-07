import { TranslatedCategory } from "@/types/models/category";

const mapCategoryToResponse = (
  category: TranslatedCategory
): TranslatedCategory => {
  return {
    id: category.id,
    name: category.translation?.[0].name
      ? category.translation[0].name
      : category.name,
    description: category.translation?.[0].description
      ? category.translation[0].description
      : category.description,
  };
};

export default mapCategoryToResponse;
