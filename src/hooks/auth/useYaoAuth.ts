"use client";

import useAuthStore, { AuthState } from "@/stores/useAuthStore";
import { GetTableByIdResponse } from "@/types/api/table/GET";
import { useSearchParams } from "next/navigation";

const useYaoAuth = (table?: GetTableByIdResponse | undefined) => {
  const isYaoyao = useAuthStore((s: AuthState) => s.isYaoyao);
  const setisYaoyao = useAuthStore((s: AuthState) => s.setVerified);
  const searchParams = useSearchParams();
  const userId = searchParams?.get("id");

  const isTableLeader = !!table && table?.tableLeader?.id === userId;
  const canManage = isYaoyao || isTableLeader;

  return { isYaoyao, isTableLeader, canManage, setisYaoyao, userId };
};

export default useYaoAuth;
