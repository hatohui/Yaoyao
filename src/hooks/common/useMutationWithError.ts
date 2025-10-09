"use client";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import axios from "axios";
import useNotify from "./useNotify";

type MutationWithErrorOptions<TData, TError, TVariables, TContext> = Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  "onSuccess" | "onError"
> & {
  successMessageKey?: string;
  onSuccessCallback?: (
    data: TData,
    variables: TVariables,
    context: TContext | undefined
  ) => void;
  onErrorCallback?: (
    error: TError,
    variables: TVariables,
    context: TContext | undefined
  ) => void;
};

type MutationWithErrorResult<TData, TError, TVariables, TContext> =
  UseMutationResult<TData, TError, TVariables, TContext> & {
    formError: {
      message: string;
      code?: string;
      type: "error" | "success" | "info";
    } | null;
    formSuccess: {
      message: string;
      code?: string;
      type: "error" | "success" | "info";
    } | null;
    clearError: () => void;
  };

const useMutationWithError = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  options: MutationWithErrorOptions<TData, TError, TVariables, TContext>
): MutationWithErrorResult<TData, TError, TVariables, TContext> => {
  const { error, success, setError, setSuccess, clearMessage } = useNotify();
  const {
    successMessageKey,
    onSuccessCallback,
    onErrorCallback,
    ...mutationOptions
  } = options;

  const mutation = useMutation<TData, TError, TVariables, TContext>({
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      clearMessage();
      if (successMessageKey) {
        setSuccess(successMessageKey);
      }
      onSuccessCallback?.(data, variables, context);
    },
    onError: (err, variables, context) => {
      if (axios.isAxiosError(err) && err.response?.data) {
        const errorCode =
          typeof err.response.data.code === "string"
            ? err.response.data.code
            : undefined;
        setError(errorCode, err.response.data.message);
      } else {
        setError("GENERIC_ERROR");
      }
      onErrorCallback?.(err, variables, context);
    },
  });

  return {
    ...mutation,
    // Expose error from useNotify hook and clearError function
    formError: error,
    formSuccess: success,
    clearError: clearMessage,
  } as MutationWithErrorResult<TData, TError, TVariables, TContext>;
};

export default useMutationWithError;
