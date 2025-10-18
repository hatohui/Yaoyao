/**
 * Merges existing URL search parameters with new parameters
 * @param currentParams - Current URLSearchParams or search string (e.g., from useSearchParams())
 * @param newParams - Object containing new parameters to add/update
 * @returns URL-encoded query string with merged parameters
 *
 * @example
 * // Current URL: /page?lang=en&theme=dark
 * mergeQueryParams(searchParams, { table: '123', id: '456' })
 * // Returns: "lang=en&theme=dark&table=123&id=456"
 *
 * @example
 * // Override existing params
 * mergeQueryParams(searchParams, { lang: 'zh' })
 * // Returns: "lang=zh&theme=dark"
 */
export function mergeQueryParams(
  currentParams: URLSearchParams | string | null,
  newParams: Record<string, string | number | boolean | null | undefined>
): string {
  // Create a new URLSearchParams from current params
  const params = new URLSearchParams(
    currentParams instanceof URLSearchParams
      ? currentParams.toString()
      : currentParams || ""
  );

  // Add/update new parameters
  Object.entries(newParams).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      // Remove parameter if value is null/undefined
      params.delete(key);
    } else {
      // Set/update parameter
      params.set(key, String(value));
    }
  });

  return params.toString();
}
