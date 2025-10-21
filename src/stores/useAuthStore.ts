import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthState = {
  isYaoyao: boolean;
  setVerified: (v: boolean) => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (
      set: (
        partial: Partial<AuthState> | ((state: AuthState) => Partial<AuthState>)
      ) => void
    ) => ({
      isYaoyao: false,
      setVerified: (v: boolean) => set({ isYaoyao: v }),
    }),
    {
      name: "yaoyao-auth",
      partialize: (state: AuthState) => ({ isYaoyao: state.isYaoyao }),
    }
  )
);

export default useAuthStore;
