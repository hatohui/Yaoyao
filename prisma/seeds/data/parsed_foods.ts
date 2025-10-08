export type FoodData = {
  key: string;
  items: {
    name: string;
    description?: string;
    imageUrl: string;
    translations: {
      [key: string]: { description?: string; name: string }; // key is language code, e.g. "en", "zh", "ms", etc.
    };
    variants: {
      label?: string; // “6 pcs”, “half”, “S”, etc.
      price?: number;
      currency?: string;
      isSeasonal?: boolean;
    }[];
  }[];
};
