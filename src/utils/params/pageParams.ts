"use client";

/**
 * Preserves query parameters except page (resets to 1)
 * Used when changing filters like category or search
 */
export const resetPageInParams = (
  currentParams: URLSearchParams | null
): URLSearchParams => {
  const params = new URLSearchParams();

  currentParams?.forEach((value, key) => {
    if (key !== "page") {
      params.set(key, value);
    }
  });

  return params;
};

/**
 * Sets a parameter and resets page to 1
 */
export const setParamAndResetPage = (
  currentParams: URLSearchParams | null,
  paramKey: string,
  paramValue: string
): URLSearchParams => {
  const params = resetPageInParams(currentParams);
  params.set(paramKey, paramValue);
  return params;
};

/**
 * Removes a parameter and resets page to 1
 */
export const removeParamAndResetPage = (
  currentParams: URLSearchParams | null,
  paramKey: string
): URLSearchParams => {
  const params = resetPageInParams(currentParams);
  params.delete(paramKey);
  return params;
};
