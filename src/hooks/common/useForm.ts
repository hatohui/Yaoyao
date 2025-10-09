"use client";
import { useState, useCallback, ChangeEvent } from "react";

interface UseFormOptions<T> {
  initialValue: T;
  validate?: (value: T) => string | null;
}

const useForm = <T extends string | number>({
  initialValue,
  validate,
}: UseFormOptions<T>) => {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string | null>(null);

  const setValueStable = useCallback((newValue: T) => {
    setValue(newValue);
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = (
        typeof initialValue === "number"
          ? Number(e.target.value)
          : e.target.value
      ) as T;

      setValue(newValue);

      // Clear error on change
      if (error) {
        setError(null);
      }
    },
    [initialValue, error]
  );

  const reset = useCallback(() => {
    setValue(initialValue);
    setError(null);
  }, [initialValue]);

  const validateField = useCallback(() => {
    if (validate) {
      const validationError = validate(value);
      setError(validationError);
      return validationError === null;
    }
    return true;
  }, [validate, value]);

  return {
    value,
    setValue: setValueStable,
    error,
    setError,
    handleChange,
    reset,
    validate: validateField,
  };
};

export default useForm;
