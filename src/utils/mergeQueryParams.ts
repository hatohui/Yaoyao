export function mergeQueryParams(
  currentParams: URLSearchParams | string | null,
  newParams: Record<string, string | number | boolean | null | undefined>
): string {
  const params = new URLSearchParams(
    currentParams instanceof URLSearchParams
      ? currentParams.toString()
      : currentParams || ""
  );

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
