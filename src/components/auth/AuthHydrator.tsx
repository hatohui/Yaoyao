"use client";
import React from "react";
import useAuthStore, { AuthState } from "@/stores/useAuthStore";

const AuthHydrator = () => {
  void useAuthStore((s: AuthState) => s.isVerified);
  return <></>;
};

export default AuthHydrator;
