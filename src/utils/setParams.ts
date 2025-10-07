"use client";
import { ReadonlyURLSearchParams } from "next/navigation";

export const setNewParamString = (
  params: ReadonlyURLSearchParams | null,
  param: string,
  value: string
) => {
  const next = new URLSearchParams();

  params?.forEach((value, key) => {
    next.append(key, value);
  });

  next.set(param, value);
  return `?${next.toString()}`;
};
