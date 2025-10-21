import { GetCategoryByIdResponse } from "@/types/api/category/GET";
import { TranslatedCategory } from "@/types/models/category";

const mapCategoryToResponse = (
  category: TranslatedCategory
): GetCategoryByIdResponse => {
  return {
    id: category.id,
    name: category.translation?.[0].name
      ? category.translation[0].name
      : category.name,
    description: category.translation?.[0].description
      ? category.translation[0].description
      : category.description,
    key: category.name,
  };
};

export default mapCategoryToResponse;
