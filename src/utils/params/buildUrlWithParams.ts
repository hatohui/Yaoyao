/**
 * Build URL with only specific query parameters preserved
 * @param basePath - The base path for the URL
 * @param searchParams - Current URL search params
 * @param preserveParams - Array of param keys to preserve (default: ['lang'])
 * @returns URL string with preserved params
 */
export const buildUrlWithParams = (
  basePath: string,
  searchParams: URLSearchParams | null,
  preserveParams: string[] = ["lang"]
): string => {
  if (!searchParams) return basePath;

  const params = new URLSearchParams();

  preserveParams.forEach((key) => {
    const value = searchParams.get(key);
    if (value) {
      params.set(key, value);
    }
  });

  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
};
