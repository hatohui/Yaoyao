/**
 * Filters an array of items based on a search query
 * Searches through multiple string fields
 */
export const filterBySearch = <T extends Record<string, unknown>>(
  items: T[] | undefined,
  searchQuery: string,
  searchFields: (keyof T)[]
): T[] => {
  if (!items) return [];
  if (!searchQuery?.trim()) return items;

  const query = searchQuery.toLowerCase().trim();

  return items.filter((item) => {
    return searchFields.some((field) => {
      const value = item[field];
      if (typeof value === "string") {
        return value.toLowerCase().includes(query);
      }
      return false;
    });
  });
};
